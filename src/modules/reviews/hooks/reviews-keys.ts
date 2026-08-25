import type { GetReviewsParams } from "../types";

export const reviewsKeys = {
  all: (perfumeId: string) => ["reviews", perfumeId] as const,
  list: (params: GetReviewsParams) =>
    [...reviewsKeys.all(params.perfumeId), params] as const,
};