import { afterEach, describe, expect, it, vi } from "vitest";
import { formatDate, formatRelativeDate } from "./format-date";

describe("formatDate", () => {
  it("formats valid dates using the requested locale", () => {
    expect(formatDate("2026-09-13T12:00:00Z", "en-US")).toBe("13 Sep 2026");
  });

  it("returns an empty string for absent or invalid dates", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate("not-a-date")).toBe("");
  });
});

describe("formatRelativeDate", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats dates within each relative-time range", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-13T12:00:00Z"));

    expect(formatRelativeDate("2026-09-13T11:59:30Z")).toBe("hace un momento");
    expect(formatRelativeDate("2026-09-13T11:55:00Z")).toBe("hace 5 min");
    expect(formatRelativeDate("2026-09-13T09:00:00Z")).toBe("hace 3 h");
    expect(formatRelativeDate("2026-09-08T12:00:00Z")).toBe("hace 5 días");
  });

  it("uses the date format for dates at least seven days old", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-13T12:00:00Z"));

    expect(formatRelativeDate("2026-09-06T12:00:00Z")).toBe("6 Sep 2026");
  });

  it("returns an empty string for absent or invalid dates", () => {
    expect(formatRelativeDate(undefined)).toBe("");
    expect(formatRelativeDate("not-a-date")).toBe("");
  });
});
