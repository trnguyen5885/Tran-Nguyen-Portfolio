"use client";

import * as m from "motion/react-m";
import type { PropsWithChildren } from "react";

export function PageEntrance({ children }: PropsWithChildren) {
  return (
    <m.div
      className="page-entrance"
      data-motion="page-entrance"
      initial={{ opacity: 0, y: 6, scale: 0.998 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
