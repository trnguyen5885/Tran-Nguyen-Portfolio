import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal, ScrollParallax, StaggerGroup, StaggerItem } from "./editorial-motion";
import type { Project } from "@/content/projects";
import { localize } from "@/content/schema";
import type { Locale } from "@/i18n/routing";

type ShowcaseProjectProps = {
  index: number;
  locale: Locale;
  project: Project;
};

export async function ShowcaseProject({ index, locale, project }: ShowcaseProjectProps) {
  const t = await getTranslations("Showcase");
  const Content = project.content[locale];

  return (
    <article id={project.slug} className="showcase-project">
      <StaggerGroup as="header" className="showcase-project-header">
        <StaggerItem>
          <p className="eyebrow">
            {String(index + 1).padStart(2, "0")} / {localize(project.period, locale)}
          </p>
        </StaggerItem>
        <StaggerItem><h2>{localize(project.title, locale)}</h2></StaggerItem>
        <StaggerItem><p className="showcase-summary">{localize(project.summary, locale)}</p></StaggerItem>
      </StaggerGroup>

      <ScrollParallax distance={28}>
        <Reveal className="showcase-cover" scale={0.985}>
          <Image
            src={project.cover}
            alt=""
            width={1600}
            height={900}
            sizes="(max-width: 1180px) 100vw, 1180px"
          />
        </Reveal>
      </ScrollParallax>

      <div className="showcase-detail-grid">
        <ScrollParallax distance={18}>
          <Reveal>
            <dl className="showcase-meta">
              <div><dt>{t("role")}</dt><dd>{localize(project.role, locale)}</dd></div>
              <div><dt>{t("period")}</dt><dd>{localize(project.period, locale)}</dd></div>
              <div><dt>{t("stack")}</dt><dd>{project.stack.join(", ")}</dd></div>
            </dl>
            <div className="button-row">
              {project.repositoryUrl && (
                <a className="button button-secondary" href={project.repositoryUrl} target="_blank" rel="noreferrer">
                  {t("repository")} <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.liveUrl && (
                <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                  {t("live")} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </Reveal>
        </ScrollParallax>

        <ScrollParallax distance={14}>
          <Reveal className="showcase-prose">
            <Content />
          </Reveal>
        </ScrollParallax>
      </div>

      {project.demoVideo && (
        <ScrollParallax distance={22}>
          <Reveal as="section" className="demo-section" scale={0.99}>
            <div className="demo-heading">
              <p className="eyebrow">{t("demoEyebrow")}</p>
              <h3>{t("demoTitle", { project: localize(project.title, locale) })}</h3>
            </div>
            <video
              className="demo-video"
              controls
              playsInline
              preload="metadata"
              poster={project.demoVideo.poster}
              aria-label={t("demoLabel", { project: localize(project.title, locale) })}
            >
              <source src={project.demoVideo.src} type={project.demoVideo.src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
              {project.demoVideo.captions && (
                <>
                  <track kind="captions" src={project.demoVideo.captions.en} srcLang="en" label={t("captionsEn")} default={locale === "en"} />
                  <track kind="captions" src={project.demoVideo.captions.vi} srcLang="vi" label={t("captionsVi")} default={locale === "vi"} />
                </>
              )}
              {t("videoFallback")}
            </video>
          </Reveal>
        </ScrollParallax>
      )}
    </article>
  );
}
