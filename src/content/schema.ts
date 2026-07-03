import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  start: z.string().min(4),
  end: z.string().nullable(),
  period: z.string().min(1).optional(),
  summary: z.string().min(1),
  url: z.url().nullable().optional(),
});

export const skillGroupSchema = z.object({
  label: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  bio: z.string().min(1),
  email: z.email(),
  githubUrl: z.url().nullable(),
  linkedinUrl: z.url().nullable(),
  resumeUrl: z.string().startsWith("/").nullable(),
  experience: z.array(experienceSchema),
  education: z.array(experienceSchema),
  skills: z.array(skillGroupSchema).min(1),
});

export const projectMetadataSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  kind: z.enum(["product", "technical-demo"]),
  title: z.string().min(1),
  summary: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  cover: z.string().startsWith("/").nullable(),
  featured: z.boolean(),
  repositoryUrl: z.url().nullable(),
  liveUrl: z.url().nullable(),
  demoVideo: z.object({
    title: z.string().min(1),
    viewport: z.enum(["mobile", "desktop"]).default("mobile"),
    src: z.string().startsWith("/").regex(/\.(mp4|webm)$/i),
    poster: z.string().startsWith("/"),
    captions: z.string().startsWith("/").endsWith(".vtt").nullable(),
  }).nullable(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;
export type DemoVideo = NonNullable<ProjectMetadata["demoVideo"]>;
export type ProjectKind = ProjectMetadata["kind"];
