"use client";

import { ThemeProvider } from "next-themes";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig
          reducedMotion="user"
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
