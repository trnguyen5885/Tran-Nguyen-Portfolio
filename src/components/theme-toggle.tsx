"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import * as m from "motion/react-m";
import { flushSync } from "react-dom";
import { useRef, useSyncExternalStore } from "react";

const subscribeToHydration = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("Navigation");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitioningRef = useRef(false);
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
  const visibleTheme = mounted ? resolvedTheme : undefined;

  const toggleTheme = () => {
    if (transitioningRef.current) return;

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const reverseReveal = nextTheme === "light";
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const applyTheme = () => flushSync(() => setTheme(nextTheme));

    if (reduceMotion) {
      applyTheme();
      return;
    }

    if (!document.startViewTransition) {
      root.classList.add("theme-fade");
      requestAnimationFrame(() => {
        applyTheme();
        window.setTimeout(() => root.classList.remove("theme-fade"), 380);
      });
      return;
    }

    const bounds = buttonRef.current?.getBoundingClientRect();
    const x = bounds ? bounds.left + bounds.width / 2 : window.innerWidth / 2;
    const y = bounds ? bounds.top + bounds.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    transitioningRef.current = true;
    const directionClass = reverseReveal ? "theme-reveal-reverse" : "theme-reveal-forward";
    root.classList.add("theme-view-transition", directionClass);
    const transition = document.startViewTransition(applyTheme);

    const animationFinished = transition.ready
      .then(() => {
        const radialAnimation = root.animate(
          {
            clipPath: [
              reverseReveal
                ? `circle(${radius}px at ${x}px ${y}px)`
                : `circle(0px at ${x}px ${y}px)`,
              reverseReveal
                ? `circle(0px at ${x}px ${y}px)`
                : `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: reverseReveal ? 600 : 520,
            easing: reverseReveal
              ? "cubic-bezier(0.45, 0, 0.55, 1)"
              : "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
            pseudoElement: reverseReveal
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          },
        );

        const extendedTransition = transition as ViewTransition & {
          waitUntil?: (promise: Promise<unknown>) => void;
        };
        extendedTransition.waitUntil?.(radialAnimation.finished);
        return radialAnimation.finished;
      })
      .catch(() => undefined);

    Promise.allSettled([transition.finished, animationFinished]).then(() => {
      root.classList.remove("theme-view-transition", directionClass);
      transitioningRef.current = false;
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className="icon-button"
      aria-label={t("theme")}
      onClick={toggleTheme}
    >
      <m.span
        aria-hidden="true"
        className="theme-icon"
        animate={{ rotate: visibleTheme === "dark" ? 180 : 0, scale: [0.88, 1] }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        {visibleTheme === "dark" ? "☀" : visibleTheme === "light" ? "☾" : "◐"}
      </m.span>
    </button>
  );
}
