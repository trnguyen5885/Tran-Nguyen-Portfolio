import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders the two content pages without serious accessibility violations", async ({ page }) => {
  for (const route of ["/", "/showcase"] as const) {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    await page.waitForTimeout(700);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""))).toEqual([]);
  }
});

test("renders the CV-based case studies without fabricated public media", async ({ page }) => {
  await page.goto("/showcase");
  const projectTitle = "VietABank ezSHOP";
  const projectLink = page.getByRole("link", {
    name: new RegExp(projectTitle),
  });
  await projectLink.click();
  await expect(page).toHaveURL(/\/showcase#vietabank-ezshop$/);
  await expect(page.locator("#vietabank-ezshop .showcase-project-header").getByRole("heading", { name: projectTitle })).toBeVisible();
  await expect(
    page.locator("#vietabank-ezshop").getByRole("heading", {
      name: "Context",
    }),
  ).toBeVisible();
  await expect(page.locator(".showcase-project")).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "MyVNG" })).toBeVisible();
  await expect(page.locator(".showcase-project video")).toHaveCount(0);
});

test("returns the not-found page for removed legacy routes", async ({ page }) => {
  for (const route of ["/about", "/contact", "/projects", "/projects/vietabank-ezshop"] as const) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
  }
});

test("supports theme transitions and the section mobile navigation", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");
  const themeButton = page.getByRole("button", { name: "Switch color theme" });
  await expect(themeButton.locator(".theme-icon")).toHaveText("☾");
  expect(consoleErrors.filter((error) => error.includes("Hydration failed"))).toEqual([]);

  await themeButton.click();
  await expect(html).toHaveClass(/dark/);
  await expect(html).not.toHaveClass(/theme-view-transition/);
  await themeButton.click();
  await expect(html).not.toHaveClass(/dark/);
  await expect(html).not.toHaveClass(/theme-view-transition/);

  await page.getByRole("button", { name: "Open navigation" }).click();
  const mobileNavigation = page.locator("#mobile-navigation");
  await expect(mobileNavigation.getByRole("link")).toHaveCount(7);
  await expect(mobileNavigation.getByRole("link", { name: "About" })).toBeVisible();
  await expect(mobileNavigation.getByRole("link", { name: "Contact" })).toBeVisible();
  await mobileNavigation.getByRole("link", { name: "Showcase" }).click();
  await expect(page).toHaveURL(/\/showcase$/);
});

test("uses the enhanced cursor only with a fine pointer", async ({ page }, testInfo) => {
  await page.goto("/");
  const html = page.locator("html");

  if (testInfo.project.name === "mobile") {
    await expect(html).not.toHaveClass(/has-custom-cursor/);
    await expect(page.locator("[data-custom-cursor]")).toBeHidden();
    return;
  }

  await page.mouse.move(160, 160);
  await expect(html).toHaveClass(/has-custom-cursor/);
  await page.getByRole("link", { name: "Showcase" }).first().hover();
  await expect(html).toHaveClass(/has-custom-cursor/);
});

test("respects reduced motion and keeps navigation immediate", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveClass(/has-custom-cursor/);
  await expect(page.locator('[data-motion="page-entrance"]')).toHaveCSS("transform", "none");
  await page.getByRole("button", { name: "Switch color theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.locator("html")).not.toHaveClass(/theme-view-transition|theme-fade/);

  const menuButton = page.getByRole("button", { name: "Open navigation" });
  if (await menuButton.isVisible()) {
    await menuButton.click();
    await page.locator("#mobile-navigation").getByRole("link", { name: "Showcase" }).click();
  } else {
    await page.locator(".desktop-nav").getByRole("link", { name: "Showcase" }).click();
  }
  await expect(page).toHaveURL(/\/showcase$/);
  await expect(page.locator("main h1")).toBeVisible();
});

test("shows the not-found page", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
});
