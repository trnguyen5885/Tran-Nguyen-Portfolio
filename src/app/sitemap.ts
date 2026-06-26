import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const pages = ["", "/showcase"];
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "monthly" as const : "yearly" as const,
      priority: page === "" ? 1 : 0.8,
    })),
  );
}
