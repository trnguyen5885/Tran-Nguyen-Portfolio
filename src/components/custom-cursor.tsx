"use client";

import * as m from "motion/react-m";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const interactiveSelector = "a, button, video, input, textarea, select, [data-cursor-interactive]";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 520, damping: 38, mass: 0.32 });
  const ringY = useSpring(y, { stiffness: 520, damping: 38, mass: 0.32 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const handleOver = (event: PointerEvent) => {
      const target = event.target;
      setInteractive(target instanceof Element && Boolean(target.closest(interactiveSelector)));
    };
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("pointerover", handleOver, { passive: true });

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointerover", handleOver);
    };
  }, [x, y]);

  return (
    <div className="custom-cursor" aria-hidden="true" data-custom-cursor>
      <m.span
        className="cursor-ring"
        data-cursor-ring
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.78 : interactive ? 1.65 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />
      <m.span
        className="cursor-dot"
        data-cursor-dot
        style={{ x, y }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 1.35 : interactive ? 0.55 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
