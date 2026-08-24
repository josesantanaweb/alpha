import { Prisma } from "@prisma/client";
import type { PaginatedResult, PaginationParams } from "@/modules/shared/types";

export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: { select: { id: true; name: true; avatar: true } } };
}>;

export interface GetReviewsResponse extends PaginatedResult<ReviewWithUser> {
  distribution: Record<number, number>;
}

export interface GetReviewsParams extends PaginationParams {
  perfumeId: string;
}
