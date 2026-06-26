"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const localeSwitchKey = "portfolio-locale-switch";

export function LocaleSwitch() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Navigation");
  const nextLocale: Locale = locale === "en" ? "vi" : "en";

  useEffect(() => {
    let targetLocale: string | null = null;
    try {
      targetLocale = sessionStorage.getItem(localeSwitchKey);
    } catch {
      // The CSS fallback is still cleared by the click timeout below.
    }

    if (targetLocale !== locale) return;

    const timeout = window.setTimeout(() => {
      document.documentElement.classList.remove("locale-switching");
      try {
        sessionStorage.removeItem(localeSwitchKey);
      } catch {
        // Storage can be unavailable in restricted browsing modes.
      }
    }, 420);

    return () => window.clearTimeout(timeout);
  }, [locale]);

  const switchLocale = () => {
    const root = document.documentElement;
    root.classList.add("locale-switching");
    try {
      sessionStorage.setItem(localeSwitchKey, nextLocale);
    } catch {
      // Navigation still works without session storage.
    }

    const hash = window.location.hash;
    router.replace(`${pathname}${hash}`, { locale: nextLocale, scroll: false });

    window.setTimeout(() => {
      root.classList.remove("locale-switching");
    }, 4000);
  };

  return (
    <button
      type="button"
      className="locale-button"
      aria-label={t("language")}
      onClick={switchLocale}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
