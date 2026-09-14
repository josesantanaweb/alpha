import { describe, expect, it } from "vitest";
import { parsePaginationParams } from "./pagination";

describe("parsePaginationParams", () => {
  it("uses the requested positive limit and non-negative offset", () => {
    const params = new URLSearchParams({ limit: "24", offset: "8" });

    expect(parsePaginationParams(params)).toEqual({ limit: 24, offset: 8 });
  });

  it("uses defaults when values are missing, invalid, or outside their range", () => {
    expect(parsePaginationParams(new URLSearchParams())).toEqual({
      limit: 10,
      offset: 0,
    });
    expect(
      parsePaginationParams(new URLSearchParams({ limit: "0", offset: "-3" }))
    ).toEqual({ limit: 10, offset: 0 });
    expect(
      parsePaginationParams(new URLSearchParams({ limit: "invalid", offset: "invalid" }))
    ).toEqual({ limit: 10, offset: 0 });
  });
});
