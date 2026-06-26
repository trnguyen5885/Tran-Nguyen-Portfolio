import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { profile } from "@/content/profile";
import { localize, type Experience } from "@/content/schema";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  HeroItem,
  HeroSequence,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/editorial-motion";

type HomePageProps = { params: Promise<{ locale: string }> };

function Timeline({
  items,
  locale,
  now,
  placeholder,
  credential,
}: {
  items: Experience[];
  locale: Locale;
  now: string;
  placeholder: string;
  credential: string;
}) {
  if (!items.length) return <div className="empty-state">{placeholder}</div>;

  return (
    <StaggerGroup as="ol" className="timeline">
      {items.map((item) => (
        <StaggerItem as="li" key={`${item.start}-${localize(item.company, locale)}`}>
          <p className="timeline-date">
            {item.period ? localize(item.period, locale) : `${item.start} — ${item.end ?? now}`}
          </p>
          <h3>{localize(item.role, locale)}</h3>
          <p>{localize(item.company, locale)}</p>
          <p className="text-muted">{localize(item.summary, locale)}</p>
          {item.url && (
            <a className="timeline-link" href={item.url} target="_blank" rel="noreferrer">
              {credential} <span aria-hidden="true">↗</span>
            </a>
          )}
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const [t, aboutT, contactT] = await Promise.all([
    getTranslations("Home"),
    getTranslations("About"),
    getTranslations("Contact"),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: localize(profile.role, locale),
    email: `mailto:${profile.email}`,
    sameAs: [profile.githubUrl, profile.linkedinUrl].filter(Boolean),
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="hero container">
        <HeroSequence className="hero-sequence">
          <HeroItem><p className="eyebrow"><span className="status-dot" aria-hidden="true" />{t("eyebrow")}</p></HeroItem>
          <HeroItem><h1>{t("headline")}</h1></HeroItem>
          <HeroItem><p className="hero-intro">{t("intro")}</p></HeroItem>
          <HeroItem className="button-row">
            <Link className="button button-primary" href="/showcase">{t("viewWork")} <span aria-hidden="true">↗</span></Link>
            <a className="button button-secondary" href="#contact">{t("contact")}</a>
          </HeroItem>
          <HeroItem className="hero-meta">
            <span>{profile.name}</span>
            <span>{localize(profile.role, locale)}</span>
            <span>{localize(profile.location, locale)}</span>
          </HeroItem>
        </HeroSequence>
      </section>

      <section id="about" className="section container anchor-section">
        <StaggerGroup className="section-topline">
          <StaggerItem>
            <p className="eyebrow">01 / {aboutT("eyebrow")}</p>
            <h2>{aboutT("title")}</h2>
          </StaggerItem>
          <StaggerItem><p className="section-copy">{aboutT("intro")}</p></StaggerItem>
        </StaggerGroup>
        <StaggerGroup className="about-intro-grid home-about-grid">
          <StaggerItem><p className="display-quote">“{localize(profile.bio, locale)}”</p></StaggerItem>
          <StaggerItem>
            <dl className="profile-facts">
              <div><dt>{aboutT("name")}</dt><dd>{profile.name}</dd></div>
              <div><dt>{aboutT("role")}</dt><dd>{localize(profile.role, locale)}</dd></div>
              <div><dt>{aboutT("location")}</dt><dd>{localize(profile.location, locale)}</dd></div>
            </dl>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className="section container split-section">
        <Reveal>
          <p className="eyebrow">02 / {t("skills")}</p>
          <h2>{t("skills")}</h2>
        </Reveal>
        <StaggerGroup className="skill-groups">
          {profile.skills.map((group) => (
            <StaggerItem className="skill-group" key={localize(group.label, locale)}>
              <h3>{localize(group.label, locale)}</h3>
              <p>{group.items.join(" · ")}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <Reveal as="section" className="about-section container home-profile-section">
        <div>
          <p className="eyebrow">03 / {aboutT("experience")}</p>
          <h2>{aboutT("experience")}</h2>
        </div>
        <Timeline
          items={profile.experience}
          locale={locale}
          placeholder={aboutT("placeholder")}
          now={aboutT("now")}
          credential={aboutT("credential")}
        />
      </Reveal>

      <Reveal as="section" className="about-section container home-profile-section">
        <div>
          <p className="eyebrow">04 / {aboutT("education")}</p>
          <h2>{aboutT("education")}</h2>
        </div>
        <Timeline
          items={profile.education}
          locale={locale}
          placeholder={aboutT("educationPlaceholder")}
          now={aboutT("now")}
          credential={aboutT("credential")}
        />
      </Reveal>

      <section id="contact" className="section container contact-page anchor-section">
        <StaggerGroup className="section-topline">
          <StaggerItem>
            <p className="eyebrow">05 / {contactT("eyebrow")}</p>
            <h2>{contactT("title")}</h2>
          </StaggerItem>
          <StaggerItem><p className="section-copy">{contactT("intro")}</p></StaggerItem>
        </StaggerGroup>
        <StaggerGroup className="contact-list">
          <StaggerItem className="contact-motion-item">
            <a href={`mailto:${profile.email}`}><span>{contactT("email")}</span><strong>{profile.email}</strong><span aria-hidden="true">↗</span></a>
          </StaggerItem>
          {profile.githubUrl && (
            <StaggerItem className="contact-motion-item">
              <a href={profile.githubUrl} target="_blank" rel="noreferrer"><span>{contactT("github")}</span><strong>GitHub</strong><span aria-hidden="true">↗</span></a>
            </StaggerItem>
          )}
          {profile.linkedinUrl && (
            <StaggerItem className="contact-motion-item">
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><span>{contactT("linkedin")}</span><strong>LinkedIn</strong><span aria-hidden="true">↗</span></a>
            </StaggerItem>
          )}
          {profile.resumeUrl ? (
            <StaggerItem className="contact-motion-item">
              <a href={profile.resumeUrl} download="CV_Nguyen Tran Trung Nguyen_Mobile Engineer.pdf"><span>CV / Résumé</span><strong>PDF</strong><span aria-hidden="true">↓</span></a>
            </StaggerItem>
          ) : (
            <StaggerItem className="contact-motion-item">
              <div className="contact-disabled" title={contactT("resumeHint")}><span>CV / Résumé</span><strong>{contactT("resume")}</strong><span aria-hidden="true">—</span></div>
            </StaggerItem>
          )}
        </StaggerGroup>
      </section>
    </main>
  );
}
