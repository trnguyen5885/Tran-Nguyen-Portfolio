"use client";

import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { MotionObserver } from "./motion-observer";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionObserver />
      {children}
    </ThemeProvider>
  );
}
