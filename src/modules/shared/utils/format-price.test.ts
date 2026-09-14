import { describe, expect, it } from "vitest";
import { formatPrice } from "./format-price";

describe("formatPrice", () => {
  it("formats prices with the requested locale and currency", () => {
    expect(formatPrice(1234.5, { locale: "en-US", currency: "USD" })).toBe(
      "$1,234.50"
    );
  });

  it("uses Mexican pesos by default", () => {
    expect(formatPrice(20)).toBe("$20.00");
  });

  it("returns an empty string for absent or invalid values", () => {
    expect(formatPrice(null)).toBe("");
    expect(formatPrice(Number.NaN)).toBe("");
  });
});
