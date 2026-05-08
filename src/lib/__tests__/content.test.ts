import { describe, expect, it } from "vitest";
import { isLocale, pickText, withLocalePath } from "@/lib/content";

describe("content locale helpers", () => {
  it("recognizes supported locales", () => {
    expect(isLocale("ja")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("zh")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("builds locale-prefixed paths", () => {
    expect(withLocalePath("ja", "/")).toBe("/ja");
    expect(withLocalePath("en", "/business")).toBe("/en/business");
    expect(withLocalePath("zh", "/contact/")).toBe("/zh/contact");
  });

  it("picks localized text by locale", () => {
    const value = { ja: "会社概要", en: "About", zh: "公司简介" };
    expect(pickText(value, "ja")).toBe("会社概要");
    expect(pickText(value, "en")).toBe("About");
    expect(pickText(value, "zh")).toBe("公司简介");
  });
});
