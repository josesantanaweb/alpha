import { Prisma } from "@prisma/client";
import { PaginationParams } from "@/modules/shared/types";

export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: { select: { id: true; name: true; avatar: true } } };
}>;

export interface GetReviewsParams extends PaginationParams {
  perfumeId: string;
}
