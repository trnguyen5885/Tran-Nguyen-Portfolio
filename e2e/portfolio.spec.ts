import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["en", "vi"] as const) {
  test.describe(`${locale} portfolio`, () => {
    test("renders the two content pages without serious accessibility violations", async ({ page }) => {
      for (const route of ["", "/showcase"]) {
        await page.goto(`/${locale}${route}`);
        await expect(page.locator("main h1")).toBeVisible();
        await page.waitForTimeout(700);
        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""))).toEqual([]);
      }
    });

    test("renders the CV-based case studies without fabricated public media", async ({ page }) => {
      await page.goto(`/${locale}/showcase`);
      const projectTitle = "VietABank ezSHOP";
      const projectLink = page.getByRole("link", {
        name: new RegExp(projectTitle),
      });
      await projectLink.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/showcase#vietabank-ezshop$`));
      await expect(page.locator("#vietabank-ezshop .showcase-project-header").getByRole("heading", { name: projectTitle })).toBeVisible();
      await expect(
        page.locator("#vietabank-ezshop").getByRole("heading", {
          name: locale === "en" ? "Context" : "Bối cảnh",
        }),
      ).toBeVisible();
      await expect(page.locator(".showcase-project")).toHaveCount(2);
      await expect(page.getByRole("heading", { name: "MyVNG" })).toBeVisible();
      await expect(page.locator(".showcase-project video")).toHaveCount(0);
    });
  });
}

test("returns the localized not-found page for removed legacy routes", async ({ page }) => {
  for (const route of [
    "/en/about",
    "/en/contact",
    "/en/projects",
    "/en/projects/vietabank-ezshop",
  ] as const) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
  }
});

test("switches locale on Showcase without reload, scroll reset, or lost anchor", async ({ page }) => {
  await page.goto("/en/showcase#vietabank-ezshop");
  await page.evaluate(() => {
    const probeWindow = window as Window & { __localeBeforeUnload?: number };
    probeWindow.__localeBeforeUnload = 0;
    window.addEventListener("beforeunload", () => {
      probeWindow.__localeBeforeUnload = (probeWindow.__localeBeforeUnload ?? 0) + 1;
    });
    window.scrollTo(0, 300);
  });

  await page.getByRole("button", { name: "Switch language" }).click();
  await expect(page).toHaveURL(/\/vi\/showcase#vietabank-ezshop$/);
  await expect(page.locator('[data-motion="page-entrance"]')).toHaveCSS("opacity", "1");
  await expect(page.locator('[data-motion="page-entrance"]')).toHaveCSS("transform", "none");

  const lifecycle = await page.evaluate(() => {
    const probeWindow = window as Window & { __localeBeforeUnload?: number };
    return {
      beforeUnload: probeWindow.__localeBeforeUnload ?? 0,
      navigationEntries: performance.getEntriesByType("navigation").length,
      scrollY: window.scrollY,
      lang: document.documentElement.lang,
    };
  });
  expect(lifecycle.beforeUnload).toBe(0);
  expect(lifecycle.navigationEntries).toBe(1);
  expect(lifecycle.scrollY).toBe(300);
  expect(lifecycle.lang).toBe("vi");
});

test("supports theme transitions and the two-link mobile navigation", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en");
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
  await expect(mobileNavigation.getByRole("link")).toHaveCount(2);
  await mobileNavigation.getByRole("link", { name: "Showcase" }).click();
  await expect(page).toHaveURL(/\/en\/showcase$/);
});

test("uses the enhanced cursor only with a fine pointer", async ({ page }, testInfo) => {
  await page.goto("/en");
  const html = page.locator("html");

  if (testInfo.project.name === "mobile") {
    await expect(html).not.toHaveClass(/has-custom-cursor/);
    await expect(page.locator("[data-custom-cursor]")).toBeHidden();
    return;
  }

  await page.mouse.move(160, 160);
  await expect(html).toHaveClass(/has-custom-cursor/);
  await expect(page.locator("[data-cursor-dot]")).toHaveCSS("opacity", "1");
  await page.getByRole("link", { name: "Showcase" }).first().hover();
  await expect(page.locator("[data-cursor-ring]")).toHaveCSS("opacity", "1");
});

test("respects reduced motion and keeps navigation immediate", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
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
  await expect(page).toHaveURL(/\/en\/showcase$/);
  await expect(page.locator("main h1")).toBeVisible();
});

test("shows the localized not-found page", async ({ page }) => {
  await page.goto("/en/does-not-exist");
  await expect(page.getByRole("heading", { name: "This page wandered off." })).toBeVisible();
});
