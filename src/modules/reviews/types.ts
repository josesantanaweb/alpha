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

export type ReviewWithVote = ReviewWithUser & {
  userVote: boolean | null;
};

export interface VoteReviewResult {
  helpfulCount: number;
  notHelpfulCount: number;
  userVote: boolean | null;
}

export interface GetReviewsData extends PaginatedResult<ReviewWithVote> {
  distribution: Record<number, number>;
}

export interface GetReviewsResponse extends GetReviewsData {
  userReview: ReviewWithUser | null;
}

export interface GetReviewsParams extends PaginationParams {
  perfumeId: string;
  sort?: ReviewSort;
}
