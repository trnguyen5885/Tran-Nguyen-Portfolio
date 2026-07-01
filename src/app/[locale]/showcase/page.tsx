import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ScrollParallax, StaggerGroup, StaggerItem } from "@/components/editorial-motion";
import { SectionHeading } from "@/components/section-heading";
import { ShowcaseProject } from "@/components/showcase-project";
import { projects } from "@/content/projects";
import { localize } from "@/content/schema";
import type { Locale } from "@/i18n/routing";

type ShowcasePageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export async function generateMetadata({ params }: ShowcasePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Showcase" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/showcase`,
      languages: { en: "/en/showcase", vi: "/vi/showcase" },
    },
    openGraph: {
      title: t("title"),
      description: t("intro"),
      url: `/${locale}/showcase`,
    },
  };
}

export default async function ShowcasePage({ params }: ShowcasePageProps) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("Showcase");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("title"),
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/${locale}/showcase#${project.slug}`,
      item: {
        "@type": "CreativeWork",
        name: localize(project.title, locale),
        description: localize(project.summary, locale),
        keywords: project.stack.join(", "),
        ...(project.demoVideo && {
          video: {
            "@type": "VideoObject",
            name: localize(project.demoVideo.title, locale),
            description: localize(project.summary, locale),
            contentUrl: `${siteUrl}${project.demoVideo.src}`,
            thumbnailUrl: `${siteUrl}${project.demoVideo.poster}`,
          },
        }),
      },
    })),
  };

  return (
    <main id="main-content" className="page-main container showcase-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <ScrollParallax distance={18}>
        <nav className="showcase-index" aria-label={t("indexLabel")}>
          <p>{t("indexTitle")}</p>
          <StaggerGroup as="ol">
            {projects.map((project, index) => (
              <StaggerItem as="li" key={project.slug}>
                <a href={`#${project.slug}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{localize(project.title, locale)}</strong>
                  <span aria-hidden="true">↓</span>
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </nav>
      </ScrollParallax>

      <div className="showcase-list">
        {projects.map((project, index) => (
          <ShowcaseProject key={project.slug} index={index} locale={locale} project={project} />
        ))}
      </div>
    </main>
  );
}
