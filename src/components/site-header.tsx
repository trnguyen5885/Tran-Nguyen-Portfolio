"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
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
            <span
              className="menu-button-icon"
              aria-hidden="true"
              data-open={open ? "true" : "false"}
            >
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label={navigation.menu}
          data-open="true"
        >
          <div className="container">
            {links.map((link, index) => (
              <div
                className="mobile-nav-item"
                key={link.href}
                style={{ "--mobile-nav-index": index } as CSSProperties}
              >
                <Link href={link.href} prefetch={link.sectionId ? false : undefined} onClick={handleLinkClick(link)}>
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
