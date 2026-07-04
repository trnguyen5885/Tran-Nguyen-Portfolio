import type { PropsWithChildren } from "react";

export function PageEntrance({ children }: PropsWithChildren) {
  return (
    <div
      className="page-entrance"
      data-motion="page-entrance"
    >
      {children}
    </div>
  );
}
