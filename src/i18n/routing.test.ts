import { describe, expect, it } from "vitest";
import { isLocale, locales, routing } from "./routing";

describe("locale routing", () => {
  it("supports exactly English and Vietnamese", () => {
    expect(locales).toEqual(["en", "vi"]);
    expect(routing.defaultLocale).toBe("en");
  });

  it("guards locale values", () => {
    expect(isLocale("vi")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});
