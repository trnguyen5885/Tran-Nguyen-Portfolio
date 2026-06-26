import type { ComponentType } from "react";
import EnMyVng from "./projects/myvng/en.mdx";
import ViMyVng from "./projects/myvng/vi.mdx";
import EnVietabankEzshop from "./projects/vietabank-ezshop/en.mdx";
import ViVietabankEzshop from "./projects/vietabank-ezshop/vi.mdx";
import type { Locale } from "@/i18n/routing";
import { projectMetadataSchema, type ProjectMetadata } from "./schema";

export type Project = ProjectMetadata & {
  content: Record<Locale, ComponentType>;
};

const vietabankEzshop = projectMetadataSchema.parse({
  slug: "vietabank-ezshop",
  title: {
    en: "VietABank ezSHOP",
    vi: "VietABank ezSHOP",
  },
  summary: {
    en: "A mobile banking application developed with reusable native NFC capabilities and cross-framework mobile integration.",
    vi: "Ứng dụng mobile banking được phát triển với năng lực NFC native có thể tái sử dụng và tích hợp đa framework mobile.",
  },
  role: {
    en: "Mobile Developer · 10-person team",
    vi: "Mobile Developer · Nhóm 10 thành viên",
  },
  period: {
    en: "Oct 2025 — Present",
    vi: "10/2025 — Hiện tại",
  },
  stack: ["React Native", "Flutter", "NFC", "Android", "iOS"],
  cover: "/images/vietabank-ezshop.svg",
  featured: true,
  repositoryUrl: null,
  liveUrl: null,
  demoVideo: null,
});

const myVng = projectMetadataSchema.parse({
  slug: "myvng",
  title: {
    en: "MyVNG",
    vi: "MyVNG",
  },
  summary: {
    en: "A mobile product contribution spanning interface refinement, RESTful API integration, issue resolution, and delivery automation.",
    vi: "Dự án mobile với các đóng góp từ hoàn thiện giao diện, tích hợp RESTful API, xử lý lỗi đến hỗ trợ tự động hóa phát hành.",
  },
  role: {
    en: "Mobile Developer Intern · 10-person team",
    vi: "Thực tập sinh Mobile Developer · Nhóm 10 thành viên",
  },
  period: {
    en: "Jan 2025 — Sep 2025",
    vi: "01/2025 — 09/2025",
  },
  stack: ["Mobile UI", "REST APIs", "Fastlane", "GitLab CI/CD"],
  cover: "/images/myvng.svg",
  featured: true,
  repositoryUrl: null,
  liveUrl: null,
  demoVideo: null,
});

export const projects: Project[] = [
  {
    ...vietabankEzshop,
    content: {
      en: EnVietabankEzshop,
      vi: ViVietabankEzshop,
    },
  },
  {
    ...myVng,
    content: {
      en: EnMyVng,
      vi: ViMyVng,
    },
  },
];
