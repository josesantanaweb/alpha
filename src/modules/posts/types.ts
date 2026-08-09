import { Post } from "@prisma/client";
import { PaginationParams } from "@/modules/shared/types";

export type { Post };

export interface GetPostsParams extends PaginationParams {
  search?: string;
}
