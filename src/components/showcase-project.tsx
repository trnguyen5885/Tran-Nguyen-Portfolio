import Image from "next/image";
import { Reveal, ScrollParallax, StaggerGroup, StaggerItem } from "./editorial-motion";
import type { Project } from "@/content/projects";
import { siteText } from "@/content/site-text";

type ShowcaseProjectProps = {
  index: number;
  project: Project;
};

export function ShowcaseProject({ index, project }: ShowcaseProjectProps) {
  const t = siteText.showcase;
  const Content = project.content;
  const hasMedia = Boolean(project.cover || project.demoVideo);
  const demoTitle = project.demoVideo?.title ?? "";
  const demoViewport = project.demoVideo?.viewport ?? "mobile";
  const hasProjectLinks = Boolean(project.repositoryUrl || project.liveUrl);
  const kindLabel = project.kind === "technical-demo" ? t.technicalDemoType : t.productType;

  return (
    <article
      id={project.slug}
      className={`showcase-project showcase-project-${project.kind} ${hasMedia ? "showcase-project-has-media" : "showcase-project-text-only"}`}
    >
      <StaggerGroup as="header" className="showcase-project-header">
        <StaggerItem>
          <div className="showcase-kicker">
            <p className="eyebrow">
              {String(index + 1).padStart(2, "0")} / {project.period}
            </p>
            <span className={`showcase-kind-badge showcase-kind-${project.kind}`}>{kindLabel}</span>
          </div>
        </StaggerItem>
        <StaggerItem><h2>{project.title}</h2></StaggerItem>
        <StaggerItem><p className="showcase-summary">{project.summary}</p></StaggerItem>
      </StaggerGroup>

      {hasMedia && (
        <div className={`showcase-media-stage ${project.cover && project.demoVideo ? "showcase-media-split" : "showcase-media-single"}`}>
          {project.cover && (
            <ScrollParallax distance={28}>
              <Reveal className="showcase-cover showcase-media-card" scale={0.985}>
                <Image
                  src={project.cover}
                  alt=""
                  width={1600}
                  height={900}
                  sizes="(max-width: 1180px) 100vw, 1180px"
                />
              </Reveal>
            </ScrollParallax>
          )}

          {project.demoVideo && (
            <ScrollParallax distance={20}>
              <Reveal
                as="section"
                className={`showcase-demo-panel showcase-demo-panel-${demoViewport} showcase-media-card`}
                scale={0.992}
              >
                <div className="showcase-demo-copy">
                  <div className="showcase-demo-header">
                    <h3>{demoTitle}</h3>
                  </div>
                  <p className="showcase-demo-note">
                    {demoViewport === "mobile" ? t.technicalDemoMobileHint : t.technicalDemoDesktopHint}
                  </p>
                </div>
                <div className={`showcase-demo-device showcase-demo-device-${demoViewport}`}>
                  <video
                    className="showcase-demo-video"
                    controls
                    playsInline
                    preload="metadata"
                    poster={project.demoVideo.poster}
                    aria-label={`Video demonstration for ${demoTitle}`}
                  >
                    <source src={project.demoVideo.src} type={project.demoVideo.src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
                    {project.demoVideo.captions && (
                      <track kind="captions" src={project.demoVideo.captions} srcLang="en" label={t.captions} default />
                    )}
                    {t.videoFallback}
                  </video>
                </div>
              </Reveal>
            </ScrollParallax>
          )}
        </div>
      )}

      <div className="showcase-detail-grid">
        <ScrollParallax distance={18}>
          <Reveal className="showcase-sidebar" scale={0.994}>
            <div className="showcase-meta-panel">
              <dl className="showcase-meta">
                <div><dt>{t.role}</dt><dd>{project.role}</dd></div>
                <div><dt>{t.period}</dt><dd>{project.period}</dd></div>
                <div><dt>{t.stack}</dt><dd>{project.stack.join(", ")}</dd></div>
              </dl>

              {hasProjectLinks && (
                <div className="button-row showcase-button-row">
                  {project.repositoryUrl && (
                    <a className="button button-secondary" href={project.repositoryUrl} target="_blank" rel="noreferrer">
                      {t.repository} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                      {t.live} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </ScrollParallax>

        <div className="showcase-main-stack">
          <ScrollParallax distance={14}>
            <Reveal className="showcase-prose">
              <Content />
            </Reveal>
          </ScrollParallax>
        </div>
      </div>
    </article>
  );
}
