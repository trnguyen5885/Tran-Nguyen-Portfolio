import { z } from "zod";
import { locales, type Locale } from "@/i18n/routing";

const localizedText = z.object(
  Object.fromEntries(locales.map((locale) => [locale, z.string().min(1)])) as Record<
    Locale,
    z.ZodString
  >,
);

export const experienceSchema = z.object({
  company: localizedText,
  role: localizedText,
  start: z.string().min(4),
  end: z.string().nullable(),
  period: localizedText.optional(),
  summary: localizedText,
  url: z.url().nullable().optional(),
});

export const skillGroupSchema = z.object({
  label: localizedText,
  items: z.array(z.string().min(1)).min(1),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  role: localizedText,
  location: localizedText,
  bio: localizedText,
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
  title: localizedText,
  summary: localizedText,
  role: localizedText,
  period: localizedText,
  stack: z.array(z.string().min(1)).min(1),
  cover: z.string().startsWith("/"),
  featured: z.boolean(),
  repositoryUrl: z.url().nullable(),
  liveUrl: z.url().nullable(),
  demoVideo: z.object({
    src: z.string().startsWith("/").regex(/\.(mp4|webm)$/i),
    poster: z.string().startsWith("/"),
    captions: z.object({
      en: z.string().startsWith("/").endsWith(".vtt"),
      vi: z.string().startsWith("/").endsWith(".vtt"),
    }).nullable(),
  }).nullable(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;
export type DemoVideo = NonNullable<ProjectMetadata["demoVideo"]>;

export function localize<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}
