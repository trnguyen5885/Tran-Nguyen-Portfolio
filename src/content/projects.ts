import type { ComponentType } from "react";
import MyVngContent from "./projects/myvng/content.mdx";
import VietabankEzshopContent from "./projects/vietabank-ezshop/content.mdx";
import { projectMetadataSchema, type ProjectMetadata } from "./schema";

export type Project = ProjectMetadata & {
  content: ComponentType;
};

const vietabankEzshop = projectMetadataSchema.parse({
  slug: "vietabank-ezshop",
  kind: "product",
  title: "VietABank ezSHOP",
  summary:
    "A mobile banking application developed with reusable native NFC capabilities and cross-framework mobile integration.",
  role: "Mobile Developer · 10-person team",
  period: "Oct 2025 - Present",
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
  title: "MyVNG",
  summary:
    "A mobile product contribution spanning interface refinement, RESTful API integration, issue resolution, and delivery automation.",
  role: "Mobile Developer Intern · 10-person team",
  period: "Jan 2025 - Sep 2025",
  stack: ["React Native", "Fastlane", "GitLab CI/CD"],
  cover: null,
  featured: true,
  repositoryUrl: null,
  liveUrl: null,
  demoVideo: null,
});

export const projects: Project[] = [
  {
    ...vietabankEzshop,
    content: VietabankEzshopContent,
  },
  {
    ...myVng,
    content: MyVngContent,
  },
];
