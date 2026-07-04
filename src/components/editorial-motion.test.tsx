import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Reveal, ScrollParallax, StaggerGroup, StaggerItem } from "./editorial-motion";

describe("editorial motion primitives", () => {
  it("keeps reveal content and its semantic element in the document", () => {
    const { container } = render(
      <Reveal as="section" className="sample-section"><h2>Visible story</h2></Reveal>,
    );

    expect(screen.getByRole("heading", { name: "Visible story" })).toBeInTheDocument();
    expect(container.querySelector("section.sample-section")).toHaveAttribute("data-motion", "reveal");
  });

  it("preserves valid list semantics for staggered content", () => {
    render(
      <StaggerGroup as="ol">
        <StaggerItem as="li">First item</StaggerItem>
        <StaggerItem as="li">Second item</StaggerItem>
      </StaggerGroup>,
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("wraps scroll-linked content without dropping children", () => {
    const { container } = render(
      <ScrollParallax distance={20}>
        <div>Scroll story</div>
      </ScrollParallax>,
    );

    expect(screen.getByText("Scroll story")).toBeInTheDocument();
    expect(container.querySelector('[data-motion="scroll-parallax"]')).toBeInTheDocument();
  });
});
