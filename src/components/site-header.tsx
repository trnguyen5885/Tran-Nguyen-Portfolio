"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { siteText } from "@/content/site-text";

type HeaderLink = {
  href: string;
  label: string;
  sectionId?: string;
};

const links = [
  { href: "/", label: siteText.navigation.home },
  { href: "/#about", label: siteText.navigation.about, sectionId: "about" },
  { href: "/#skills", label: siteText.navigation.skills, sectionId: "skills" },
  { href: "/#experience", label: siteText.navigation.experience, sectionId: "experience" },
  { href: "/#education", label: siteText.navigation.education, sectionId: "education" },
  { href: "/#contact", label: siteText.navigation.contact, sectionId: "contact" },
  { href: "/showcase", label: siteText.navigation.showcase },
] satisfies HeaderLink[];

function shouldUseNativeClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const anchorScrollTimer = useRef<number | null>(null);
  const pathname = usePathname();
  const { navigation } = siteText;

  useEffect(() => {
    return () => {
      if (anchorScrollTimer.current !== null) {
        window.clearTimeout(anchorScrollTimer.current);
      }
    };
  }, []);

  const handleLinkClick = (link: HeaderLink) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (shouldUseNativeClick(event)) return;

    setOpen(false);

    if (!link.sectionId || pathname !== "/") return;

    const target = document.getElementById(link.sectionId);
    if (!target) return;

    event.preventDefault();

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollDistance = Math.abs(target.getBoundingClientRect().top);
    const cleanupDelay = prefersReducedMotion ? 0 : Math.min(Math.max(scrollDistance * 0.45, 520), 1100);

    root.classList.add("anchor-scrolling");
    window.history.pushState(null, "", `#${link.sectionId}`);
    target.scrollIntoView({ block: "start", behavior: prefersReducedMotion ? "auto" : "smooth" });

    if (anchorScrollTimer.current !== null) {
      window.clearTimeout(anchorScrollTimer.current);
    }

    anchorScrollTimer.current = window.setTimeout(() => {
      root.classList.remove("anchor-scrolling");
      anchorScrollTimer.current = null;
    }, cleanupDelay);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="wordmark" aria-label={navigation.home}>
          NTTN<span aria-hidden="true">.</span>
        </Link>

        <nav className="desktop-nav" aria-label={navigation.menu}>
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : link.href === "/showcase" && pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                prefetch={link.sectionId ? false : undefined}
                onClick={handleLinkClick(link)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? navigation.closeMenu : navigation.menu}
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
            aria-label={navigation.menu}
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
                  <Link href={link.href} prefetch={link.sectionId ? false : undefined} onClick={handleLinkClick(link)}>
                    {link.label}
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
