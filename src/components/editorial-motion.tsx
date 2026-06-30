"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef, type PropsWithChildren } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.975, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease },
  },
};

type RevealProps = PropsWithChildren<{
  as?: "article" | "div" | "header" | "section";
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
  scale?: number;
}>;

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  distance = 34,
  once = true,
  scale = 0.975,
}: RevealProps) {
  const animationProps = {
    className,
    "data-motion": "reveal",
    initial: { opacity: 0, y: distance, scale, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once, amount: 0.28, margin: "0px 0px -12% 0px" },
    transition: { duration: 0.62, delay, ease },
  } as const;

  if (as === "article") return <m.article {...animationProps}>{children}</m.article>;
  if (as === "header") return <m.header {...animationProps}>{children}</m.header>;
  if (as === "section") return <m.section {...animationProps}>{children}</m.section>;
  return <m.div {...animationProps}>{children}</m.div>;
}

type GroupProps = PropsWithChildren<{
  as?: "div" | "dl" | "header" | "ol" | "ul";
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "viewport";
}>;

export function StaggerGroup({
  as = "div",
  children,
  className,
  delay = 0.03,
  stagger = 0.075,
  trigger = "viewport",
}: GroupProps) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };
  const animationProps = {
    className,
    "data-motion": "stagger-group",
    variants,
    initial: "hidden",
    ...(trigger === "mount"
      ? { animate: "visible" }
      : {
          whileInView: "visible",
          viewport: { once: true, amount: 0.24, margin: "0px 0px -12% 0px" },
        }),
  } as const;

  if (as === "dl") return <m.dl {...animationProps}>{children}</m.dl>;
  if (as === "header") return <m.header {...animationProps}>{children}</m.header>;
  if (as === "ol") return <m.ol {...animationProps}>{children}</m.ol>;
  if (as === "ul") return <m.ul {...animationProps}>{children}</m.ul>;
  return <m.div {...animationProps}>{children}</m.div>;
}

type ItemProps = PropsWithChildren<{
  as?: "article" | "div" | "li";
  className?: string;
}>;

export function StaggerItem({ as = "div", children, className }: ItemProps) {
  const animationProps = {
    className,
    "data-motion": "stagger-item",
    variants: itemVariants,
  } as const;

  if (as === "article") return <m.article {...animationProps}>{children}</m.article>;
  if (as === "li") return <m.li {...animationProps}>{children}</m.li>;
  return <m.div {...animationProps}>{children}</m.div>;
}

type ScrollParallaxProps = PropsWithChildren<{
  className?: string;
  distance?: number;
}>;

export function ScrollParallax({
  children,
  className,
  distance = 24,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [distance * 1.4, 0, -distance]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.965, 1, 1.025]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.64, 1, 1, 0.78]);

  return (
    <m.div
      ref={ref}
      className={className}
      data-motion="scroll-parallax"
      style={reducedMotion ? undefined : { y, scale, opacity, willChange: "transform, opacity" }}
    >
      {children}
    </m.div>
  );
}

export function HeroSequence({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <StaggerGroup className={className} trigger="mount" delay={0.04} stagger={0.06}>
      {children}
    </StaggerGroup>
  );
}

export function HeroItem({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <StaggerItem className={className}>{children}</StaggerItem>;
}
