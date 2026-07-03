import type { Metadata } from "next";
import { ScrollParallax, StaggerGroup, StaggerItem } from "@/components/editorial-motion";
import { SectionHeading } from "@/components/section-heading";
import { ShowcaseProject } from "@/components/showcase-project";
import { projects } from "@/content/projects";
import { siteText } from "@/content/site-text";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: siteText.showcase.title,
  description: siteText.showcase.intro,
  alternates: { canonical: "/showcase" },
  openGraph: {
    title: siteText.showcase.title,
    description: siteText.showcase.intro,
    url: "/showcase",
  },
};

export default function ShowcasePage() {
  const t = siteText.showcase;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.title,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/showcase#${project.slug}`,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        keywords: project.stack.join(", "),
        ...(project.demoVideo && {
          video: {
            "@type": "VideoObject",
            name: project.demoVideo.title,
            description: project.summary,
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
      <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <ScrollParallax distance={18}>
        <nav className="showcase-index" aria-label={t.indexLabel}>
          <p>{t.indexTitle}</p>
          <StaggerGroup as="ol">
            {projects.map((project, index) => (
              <StaggerItem as="li" key={project.slug}>
                <a href={`#${project.slug}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{project.title}</strong>
                  <span aria-hidden="true">↓</span>
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </nav>
      </ScrollParallax>

      <div className="showcase-list">
        {projects.map((project, index) => (
          <ShowcaseProject key={project.slug} index={index} project={project} />
        ))}
      </div>
    </main>
  );
}
