import { ScrollParallax, StaggerGroup, StaggerItem } from "./editorial-motion";

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <ScrollParallax distance={22}>
      <StaggerGroup className="section-heading">
        <StaggerItem><p className="eyebrow">{eyebrow}</p></StaggerItem>
        <StaggerItem><h1>{title}</h1></StaggerItem>
        {intro && <StaggerItem><p className="section-intro">{intro}</p></StaggerItem>}
      </StaggerGroup>
    </ScrollParallax>
  );
}
