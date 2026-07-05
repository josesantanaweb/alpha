import { PaginationParams } from "@/types";

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = parseInt(value ?? "", 10);
  return Number.isNaN(parsed) || parsed < 1 ? fallback : parsed;
}

function parseNonNegativeInt(value: string | null, fallback: number): number {
  const parsed = parseInt(value ?? "", 10);
  return Number.isNaN(parsed) || parsed < 0 ? fallback : parsed;
}

export function parsePaginationParams(searchParams: URLSearchParams): Required<PaginationParams> {
  return {
    limit: parsePositiveInt(searchParams.get("limit"), 10),
    offset: parseNonNegativeInt(searchParams.get("offset"), 0),
  };
}
