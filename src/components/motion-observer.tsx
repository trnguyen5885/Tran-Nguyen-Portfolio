"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const observedSelector = [
  '[data-motion="page-entrance"]',
  '[data-motion="reveal"]',
  '[data-motion="scroll-parallax"]',
  '[data-motion="stagger-group"]',
].join(",");

function setVisible(element: HTMLElement) {
  element.dataset.motionState = "visible";
}

function prepareStaggerChildren(group: HTMLElement) {
  const baseDelay = Number.parseFloat(group.style.getPropertyValue("--motion-delay")) || 0;
  const stagger = Number.parseFloat(group.style.getPropertyValue("--motion-stagger")) || 0;
  const children = group.querySelectorAll<HTMLElement>(":scope > [data-motion='stagger-item']");

  children.forEach((child, index) => {
    child.style.setProperty("--motion-delay", `${baseDelay + stagger * index}s`);
  });
}

export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(observedSelector));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        if (element.dataset.motion === "stagger-group") prepareStaggerChildren(element);
        setVisible(element);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const once = element.dataset.motionOnce !== "false";

          if (entry.isIntersecting) {
            setVisible(element);
            if (once) observer.unobserve(element);
            return;
          }

          if (!once) {
            element.dataset.motionState = "idle";
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
    );

    elements.forEach((element) => {
      if (element.dataset.motion === "stagger-group") {
        prepareStaggerChildren(element);
      }

      element.dataset.motionState = "idle";

      if (element.dataset.motion === "page-entrance" || element.dataset.motionTrigger === "mount") {
        window.requestAnimationFrame(() => setVisible(element));
        return;
      }

      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
