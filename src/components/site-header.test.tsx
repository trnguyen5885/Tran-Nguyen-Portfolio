import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

vi.mock("./theme-toggle", () => ({ ThemeToggle: () => <button type="button">Theme</button> }));

describe("SiteHeader mobile menu", () => {
  it("mounts the menu when opened and removes it after its exit animation", async () => {
    render(
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="never"><SiteHeader /></MotionConfig>
      </LazyMotion>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(document.querySelector("#mobile-navigation")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close navigation" }));
    await waitFor(() => {
      expect(document.querySelector("#mobile-navigation")).not.toBeInTheDocument();
    });
  });
});
