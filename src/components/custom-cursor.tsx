"use client";

import { useEffect, useRef } from "react";

const interactiveSelector = "a, button, video, input, textarea, select, [data-cursor-interactive]";

export function CustomCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarsePointer || reduceMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    let frame = 0;
    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let visible = false;
    let interactive = false;
    let pressed = false;

    root.classList.add("has-custom-cursor");

    const render = () => {
      ringX += (targetX - ringX) * 0.28;
      ringY += (targetY - ringY) * 0.28;

      const dotScale = pressed ? 1.35 : interactive ? 0.55 : 1;
      const ringScale = pressed ? 0.78 : interactive ? 1.65 : 1;
      const opacity = visible ? "1" : "0";

      dot.style.opacity = opacity;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${dotScale})`;
      ring.style.opacity = opacity;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${ringScale})`;
      frame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      visible = true;
    };
    const handleOver = (event: PointerEvent) => {
      const target = event.target;
      interactive = target instanceof Element && Boolean(target.closest(interactiveSelector));
    };
    const handleDown = () => {
      pressed = true;
    };
    const handleUp = () => {
      pressed = false;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("pointerover", handleOver, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointerover", handleOver);
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true" data-custom-cursor>
      <span
        ref={ringRef}
        className="cursor-ring"
        data-cursor-ring
      />
      <span
        ref={dotRef}
        className="cursor-dot"
        data-cursor-dot
      />
    </div>
  );
}
