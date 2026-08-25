import { Prisma } from "@prisma/client";
import type { PaginatedResult, PaginationParams } from "@/modules/shared/types";

export const ReviewSort = {
  RECENT: "RECENT",
  RATING: "RATING",
  HELPFUL: "HELPFUL",
} as const;

export type ReviewSort = (typeof ReviewSort)[keyof typeof ReviewSort];

export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: { select: { id: true; name: true; avatar: true } } };
}>;

export interface GetReviewsResponse extends PaginatedResult<ReviewWithUser> {
  userReview: ReviewWithUser | null;
  distribution: Record<number, number>;
}

export interface GetReviewsParams extends PaginationParams {
  perfumeId: string;
}
