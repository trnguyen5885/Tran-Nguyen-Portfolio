import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("exposes one accessible page heading", () => {
    render(<SectionHeading eyebrow="Portfolio" title="Selected work" intro="Useful context" />);
    expect(screen.getByRole("heading", { level: 1, name: "Selected work" })).toBeInTheDocument();
    expect(screen.getByText("Useful context")).toBeInTheDocument();
  });
});
