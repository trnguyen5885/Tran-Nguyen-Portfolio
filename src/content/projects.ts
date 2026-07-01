import type { ComponentType } from "react";
import EnMyVng from "./projects/myvng/en.mdx";
import ViMyVng from "./projects/myvng/vi.mdx";
import EnTechnicalDemoSample from "./projects/technical-demo-sample/en.mdx";
import ViTechnicalDemoSample from "./projects/technical-demo-sample/vi.mdx";
import EnVietabankEzshop from "./projects/vietabank-ezshop/en.mdx";
import ViVietabankEzshop from "./projects/vietabank-ezshop/vi.mdx";
import type { Locale } from "@/i18n/routing";
import { projectMetadataSchema, type ProjectMetadata } from "./schema";

export type Project = ProjectMetadata & {
  content: Record<Locale, ComponentType>;
};

const vietabankEzshop = projectMetadataSchema.parse({
  slug: "vietabank-ezshop",
  kind: "product",
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
  stack: ["React Native", "Flutter", "Android", "iOS"],
  cover: null,
  featured: true,
  repositoryUrl: null,
  liveUrl: null,
  // Add a shareable NFC SDK-only recording here when the local assets are ready.
  demoVideo: null,
});

const myVng = projectMetadataSchema.parse({
  slug: "myvng",
  kind: "product",
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
  stack: ["React Native", "Fastlane", "GitLab CI/CD"],
  cover: null,
  featured: true,
  repositoryUrl: null,
  liveUrl: null,
  demoVideo: null,
});

const technicalDemoSample = projectMetadataSchema.parse({
  slug: "technical-demo-sample",
  kind: "technical-demo",
  title: {
    en: "Technical Demo Sample",
    vi: "Mẫu Demo Kỹ Thuật",
  },
  summary: {
    en: "A sample showcase entry for reusable SDKs, isolated prototypes, and focused technical walkthroughs.",
    vi: "Mục showcase mẫu dành cho SDK tái sử dụng, prototype tách biệt và các video walkthrough kỹ thuật có phạm vi rõ ràng.",
  },
  role: {
    en: "Mobile Engineer · Sample entry",
    vi: "Mobile Engineer · Dữ liệu mẫu",
  },
  period: {
    en: "Sample data",
    vi: "Dữ liệu mẫu",
  },
  stack: ["React Native", "Native Module", "NFC", "Prototype"],
  cover: null,
  featured: false,
  repositoryUrl: null,
  liveUrl: null,
  demoVideo: {
    title: {
      en: "Technical walkthrough sample",
      vi: "Video walkthrough kỹ thuật mẫu",
    },
    viewport: "mobile",
    src: "/videos/portfolio-starter.mp4",
    poster: "/images/portfolio-starter-poster.jpg",
    captions: null,
  },
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
  {
    ...technicalDemoSample,
    content: {
      en: EnTechnicalDemoSample,
      vi: ViTechnicalDemoSample,
    },
  },
];
