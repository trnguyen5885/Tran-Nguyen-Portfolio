import type { PropsWithChildren } from "react";
import { PageEntrance } from "@/components/page-entrance";

export default function Template({ children }: PropsWithChildren) {
  return <PageEntrance>{children}</PageEntrance>;
}
