import { defineRouting } from "next-intl/routing";

export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
