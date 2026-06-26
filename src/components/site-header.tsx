"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "home" },
  { href: "/showcase", label: "showcase" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="wordmark" aria-label={t("home")}>
          NTTN<span aria-hidden="true">.</span>
        </Link>

        <nav className="desktop-nav" aria-label={t("menu")}>
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined}>
                {t(link.label)}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <LocaleSwitch />
          <ThemeToggle />
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t("closeMenu") : t("menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <m.span
              aria-hidden="true"
              animate={{ rotate: open ? 90 : 0, scale: open ? 0.92 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {open ? "×" : "≡"}
            </m.span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label={t("menu")}
            initial={{ opacity: 0, y: -6, scaleY: 0.98 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.98 }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <m.div
              className="container"
              initial="closed"
              animate="open"
              variants={{
                closed: {},
                open: { transition: { staggerChildren: 0.045, delayChildren: 0.02 } },
              }}
            >
              {links.map((link) => (
                <m.div
                  key={link.href}
                  variants={{ closed: { opacity: 0, y: -4 }, open: { opacity: 1, y: 0 } }}
                >
                  <Link href={link.href} onClick={() => setOpen(false)}>
                    {t(link.label)}
                  </Link>
                </m.div>
              ))}
            </m.div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
