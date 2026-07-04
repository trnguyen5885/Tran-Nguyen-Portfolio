import { type CSSProperties, type PropsWithChildren } from "react";

type MotionStyle = CSSProperties & {
  "--motion-delay"?: string;
  "--motion-distance"?: string;
  "--motion-scale"?: number;
  "--motion-stagger"?: string;
};

function toSeconds(value: number) {
  return `${value}s`;
}

type RevealProps = PropsWithChildren<{
  as?: "article" | "div" | "header" | "section";
  className?: string;
  delay?: number;
  distance?: number;
  id?: string;
  once?: boolean;
  scale?: number;
}>;

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  distance = 34,
  id,
  once = true,
  scale = 0.975,
}: RevealProps) {
  const Component = as;
  const style: MotionStyle = {
    "--motion-delay": toSeconds(delay),
    "--motion-distance": `${distance}px`,
    "--motion-scale": scale,
  };

  return (
    <Component
      className={className}
      id={id}
      data-motion="reveal"
      data-motion-once={once ? "true" : "false"}
      style={style}
    >
      {children}
    </Component>
  );
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
  const Component = as;
  const style: MotionStyle = {
    "--motion-delay": toSeconds(delay),
    "--motion-stagger": toSeconds(stagger),
  };

  return (
    <Component
      className={className}
      data-motion="stagger-group"
      data-motion-trigger={trigger}
      style={style}
    >
      {children}
    </Component>
  );
}

type ItemProps = PropsWithChildren<{
  as?: "article" | "div" | "li";
  className?: string;
}>;

export function StaggerItem({ as = "div", children, className }: ItemProps) {
  const Component = as;

  return (
    <Component className={className} data-motion="stagger-item">
      {children}
    </Component>
  );
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
  const style: MotionStyle = {
    "--motion-distance": `${distance}px`,
    "--motion-scale": 0.985,
  };

  return (
    <div className={className} data-motion="scroll-parallax" style={style}>
      {children}
    </div>
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
