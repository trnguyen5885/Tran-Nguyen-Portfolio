import { render, screen } from "@testing-library/react";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { describe, expect, it } from "vitest";
import { Reveal, ScrollParallax, StaggerGroup, StaggerItem } from "./editorial-motion";

function MotionTestProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="never">{children}</MotionConfig>
    </LazyMotion>
  );
}

describe("editorial motion primitives", () => {
  it("keeps reveal content and its semantic element in the document", () => {
    const { container } = render(
      <MotionTestProvider>
        <Reveal as="section" className="sample-section"><h2>Visible story</h2></Reveal>
      </MotionTestProvider>,
    );

    expect(screen.getByRole("heading", { name: "Visible story" })).toBeInTheDocument();
    expect(container.querySelector("section.sample-section")).toHaveAttribute("data-motion", "reveal");
  });

  it("preserves valid list semantics for staggered content", () => {
    render(
      <MotionTestProvider>
        <StaggerGroup as="ol">
          <StaggerItem as="li">First item</StaggerItem>
          <StaggerItem as="li">Second item</StaggerItem>
        </StaggerGroup>
      </MotionTestProvider>,
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("wraps scroll-linked content without dropping children", () => {
    const { container } = render(
      <MotionTestProvider>
        <ScrollParallax distance={20}>
          <div>Scroll story</div>
        </ScrollParallax>
      </MotionTestProvider>,
    );

    expect(screen.getByText("Scroll story")).toBeInTheDocument();
    expect(container.querySelector('[data-motion="scroll-parallax"]')).toBeInTheDocument();
  });
});
