import { describe, expect, it } from "vitest";
import { profile } from "./profile";
import { profileSchema, projectMetadataSchema } from "./schema";

describe("content validation", () => {
  it("accepts the bundled bilingual profile", () => {
    expect(profileSchema.parse(profile)).toEqual(profile);
    expect(profile.role.en).toBeTruthy();
    expect(profile.role.vi).toBeTruthy();
  });

  it("rejects an unsafe project slug", () => {
    const result = projectMetadataSchema.safeParse({
      slug: "Unsafe Slug",
      kind: "product",
      title: { en: "Title", vi: "Tiêu đề" },
      summary: { en: "Summary", vi: "Mô tả" },
      role: { en: "Developer", vi: "Lập trình viên" },
      period: { en: "2026", vi: "2026" },
      stack: ["Next.js"],
      cover: null,
      featured: false,
      repositoryUrl: null,
      liveUrl: null,
      demoVideo: null,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a local project demo with bilingual captions", () => {
    const result = projectMetadataSchema.safeParse({
      slug: "local-demo",
      kind: "technical-demo",
      title: { en: "Local demo", vi: "Demo local" },
      summary: { en: "A local video", vi: "Một video local" },
      role: { en: "Developer", vi: "Lập trình viên" },
      period: { en: "2026", vi: "2026" },
      stack: ["Next.js"],
      cover: "/images/local-demo.webp",
      featured: true,
      repositoryUrl: null,
      liveUrl: null,
      demoVideo: {
        title: { en: "Reusable SDK demo", vi: "Demo SDK tai su dung" },
        viewport: "mobile",
        src: "/videos/local-demo.mp4",
        poster: "/images/local-demo-poster.webp",
        captions: {
          en: "/videos/local-demo-en.vtt",
          vi: "/videos/local-demo-vi.vtt",
        },
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects an unknown project kind", () => {
    const result = projectMetadataSchema.safeParse({
      slug: "invalid-kind",
      kind: "demo",
      title: { en: "Invalid kind", vi: "Loai khong hop le" },
      summary: { en: "Summary", vi: "Mô tả" },
      role: { en: "Developer", vi: "Lập trình viên" },
      period: { en: "2026", vi: "2026" },
      stack: ["Next.js"],
      cover: null,
      featured: false,
      repositoryUrl: null,
      liveUrl: null,
      demoVideo: null,
    });

    expect(result.success).toBe(false);
  });
});
