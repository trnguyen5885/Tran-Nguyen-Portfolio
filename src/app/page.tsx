import type { CSSProperties } from "react";
import Link from "next/link";
import type { SimpleIcon } from "simple-icons";
import {
  siAndroid,
  siFastlane,
  siFlutter,
  siGit,
  siGithub,
  siGitlab,
  siIos,
  siJavascript,
  siMobx,
  siReact,
  siRedux,
  siTypescript,
} from "simple-icons";
import { profile } from "@/content/profile";
import type { Experience } from "@/content/schema";
import { siteText } from "@/content/site-text";
import {
  HeroItem,
  HeroSequence,
  Reveal,
  ScrollParallax,
  StaggerGroup,
  StaggerItem,
} from "@/components/editorial-motion";

const skillIcons: Partial<Record<string, SimpleIcon>> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  "React Native": siReact,
  Flutter: siFlutter,
  Android: siAndroid,
  iOS: siIos,
  Redux: siRedux,
  "MobX-State-Tree": siMobx,
  "GitLab CI/CD": siGitlab,
  Fastlane: siFastlane,
  Git: siGit,
  GitHub: siGithub,
  GitLab: siGitlab,
};

const themeAdaptiveSkillIcons = new Set(["iOS", "GitHub"]);

function getSkillInitials(name: string) {
  const initials = name
    .split(/[\s/-]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return initials || name.slice(0, 1).toUpperCase();
}

function SkillIconMark({ name }: { name: string }) {
  const icon = skillIcons[name];

  if (!icon) {
    return (
      <span className="skill-icon skill-icon-fallback" aria-hidden="true">
        {getSkillInitials(name)}
      </span>
    );
  }

  return (
    <span
      className="skill-icon"
      style={{ "--skill-icon-base-color": `#${icon.hex}` } as CSSProperties}
      data-theme-adaptive={themeAdaptiveSkillIcons.has(name) ? "true" : undefined}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" focusable="false">
        <path d={icon.path} />
      </svg>
    </span>
  );
}

function Timeline({
  items,
  now,
  placeholder,
  credential,
}: {
  items: Experience[];
  now: string;
  placeholder: string;
  credential: string;
}) {
  if (!items.length) return <div className="empty-state">{placeholder}</div>;

  return (
    <ScrollParallax distance={18}>
      <StaggerGroup as="ol" className="timeline">
        {items.map((item) => (
          <StaggerItem as="li" key={`${item.start}-${item.company}`}>
            <p className="timeline-date">
              {item.period ? item.period : `${item.start} — ${item.end ?? now}`}
            </p>
            <h3>{item.role}</h3>
            <p>{item.company}</p>
            <p className="text-muted">{item.summary}</p>
            {item.url && (
              <a className="timeline-link" href={item.url} target="_blank" rel="noreferrer">
                {credential} <span aria-hidden="true">↗</span>
              </a>
            )}
          </StaggerItem>
        ))}
      </StaggerGroup>
    </ScrollParallax>
  );
}

export default function HomePage() {
  const { home, about, contact } = siteText;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    sameAs: [profile.githubUrl, profile.linkedinUrl].filter(Boolean),
  };

  return (
    <main id="main-content" className="home-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="hero container">
        <HeroSequence className="hero-sequence">
          <HeroItem><p className="eyebrow"><span className="status-dot" aria-hidden="true" />{home.eyebrow}</p></HeroItem>
          <HeroItem><h1>{home.headline}</h1></HeroItem>
          
          <HeroItem className="button-row">
            <Link className="button button-primary" href="/showcase">{home.viewWork} <span aria-hidden="true">↗</span></Link>
            <a className="button button-secondary" href="#contact">{home.contact}</a>
          </HeroItem>
         
        </HeroSequence>
        <div className="hero-mobile-visual" aria-hidden="true">
          <div className="hero-phone">
            <span className="hero-phone-speaker" />
            <div className="hero-phone-screen">
              <span className="hero-phone-status" />
              <span className="hero-phone-card hero-phone-card-primary" />
              <span className="hero-phone-card" />
              <span className="hero-phone-card hero-phone-card-short" />
              <div className="hero-phone-controls">
                <span />
                <span />
                <span />
              </div>
            </div>
            <span className="hero-phone-signal hero-phone-signal-one" />
            <span className="hero-phone-signal hero-phone-signal-two" />
            <span className="hero-phone-signal hero-phone-signal-three" />
          </div>
        </div>
      </section>

      <section id="about" className="section container about-layout anchor-section">
        <ScrollParallax distance={20}>
          <StaggerGroup className="about-heading">
            <StaggerItem><p className="eyebrow">01 / {about.eyebrow}</p></StaggerItem>
            <StaggerItem><h2>{about.title}</h2></StaggerItem>
          </StaggerGroup>
        </ScrollParallax>
        <ScrollParallax distance={26}>
          <StaggerGroup className="about-copy-grid">
            <StaggerItem><p>{about.intro}</p></StaggerItem>
            <StaggerItem><p>{about.introSecondary}</p></StaggerItem>
          </StaggerGroup>
        </ScrollParallax>
        <ScrollParallax distance={18}>
          <StaggerGroup className="about-card-grid">
            {about.cards.map((card) => (
              <StaggerItem as="article" className="about-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <strong>{card.emphasis}</strong>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </ScrollParallax>
      </section>

      <section id="skills" className="section container split-section technology-section anchor-section">
        <ScrollParallax distance={18}>
          <Reveal>
            <p className="eyebrow">02 / {home.skills}</p>
            <h2>{home.skills}</h2>
          </Reveal>
        </ScrollParallax>
        <ScrollParallax distance={16}>
          <StaggerGroup className="skill-groups">
            {profile.skills.map((group) => (
              <StaggerItem className="skill-group" key={group.label}>
                <h3>{group.label}</h3>
                <ul className="skill-list" aria-label={`${group.label} skills`}>
                  {group.items.map((item) => (
                    <li className="skill-chip" key={item}>
                      <SkillIconMark name={item} />
                      <span className="skill-label">{item}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </ScrollParallax>
      </section>

      <Reveal id="experience" as="section" className="about-section container home-profile-section anchor-section">
        <div>
          <p className="eyebrow">03 / {about.experience}</p>
          <h2>{about.experience}</h2>
        </div>
        <Timeline
          items={profile.experience}
          placeholder={about.placeholder}
          now={about.now}
          credential={about.credential}
        />
      </Reveal>

      <Reveal id="education" as="section" className="about-section container home-profile-section anchor-section">
        <div>
          <p className="eyebrow">04 / {about.education}</p>
          <h2>{about.education}</h2>
        </div>
        <Timeline
          items={profile.education}
          placeholder={about.educationPlaceholder}
          now={about.now}
          credential={about.credential}
        />
      </Reveal>

      <section id="contact" className="section container contact-page anchor-section">
        <ScrollParallax distance={20}>
          <StaggerGroup className="section-topline">
            <StaggerItem>
              <p className="eyebrow">05 / {contact.eyebrow}</p>
              <h2>{contact.title}</h2>
            </StaggerItem>
            <StaggerItem><p className="section-copy">{contact.intro}</p></StaggerItem>
          </StaggerGroup>
        </ScrollParallax>
        <ScrollParallax distance={18}>
          <StaggerGroup className="contact-list">
            <StaggerItem className="contact-motion-item">
              <a href={`mailto:${profile.email}`}><span>{contact.email}</span><strong>{profile.email}</strong><span aria-hidden="true">↗</span></a>
            </StaggerItem>
            {profile.githubUrl && (
              <StaggerItem className="contact-motion-item">
                <a href={profile.githubUrl} target="_blank" rel="noreferrer"><span>{contact.github}</span><strong>GitHub</strong><span aria-hidden="true">↗</span></a>
              </StaggerItem>
            )}
            {profile.linkedinUrl && (
              <StaggerItem className="contact-motion-item">
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><span>{contact.linkedin}</span><strong>LinkedIn</strong><span aria-hidden="true">↗</span></a>
              </StaggerItem>
            )}
            {profile.resumeUrl ? (
              <StaggerItem className="contact-motion-item">
                <a href={profile.resumeUrl} download="CV_Nguyen Tran Trung Nguyen_Mobile Engineer.pdf"><span>CV / Résumé</span><strong>PDF</strong><span aria-hidden="true">↓</span></a>
              </StaggerItem>
            ) : (
              <StaggerItem className="contact-motion-item">
                <div className="contact-disabled" title={contact.resumeHint}><span>CV / Résumé</span><strong>{contact.resume}</strong><span aria-hidden="true">—</span></div>
              </StaggerItem>
            )}
          </StaggerGroup>
        </ScrollParallax>
      </section>
    </main>
  );
}
