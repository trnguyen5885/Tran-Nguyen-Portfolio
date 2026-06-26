"use client";

import * as m from "motion/react-m";
import type { PropsWithChildren } from "react";
import type { Variants } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.44, ease },
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
  distance = 12,
  once = true,
  scale = 1,
}: RevealProps) {
  const animationProps = {
    className,
    "data-motion": "reveal",
    initial: { opacity: 0, y: distance, scale },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once, amount: 0.22, margin: "0px 0px -8% 0px" },
    transition: { duration: 0.44, delay, ease },
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
  stagger = 0.055,
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
          viewport: { once: true, amount: 0.18, margin: "0px 0px -8% 0px" },
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
