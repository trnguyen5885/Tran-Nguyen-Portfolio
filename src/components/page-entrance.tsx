"use client";

import * as m from "motion/react-m";
import type { PropsWithChildren } from "react";

export function PageEntrance({ children }: PropsWithChildren) {
  return (
    <m.div
      className="page-entrance"
      data-motion="page-entrance"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
