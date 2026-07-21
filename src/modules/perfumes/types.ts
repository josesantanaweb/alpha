import { Prisma } from "@prisma/client";
import { PaginationParams } from "@/modules/shared/types";

export type PerfumeWithRelations = Prisma.PerfumeGetPayload<{
  include: { accords: { include: { accord: true } }; designer: true };
}>;

export interface GetPerfumesParams extends PaginationParams {
  search?: string;
  accord?: string;
  designer?: string;
  tagId?: string;
  tag?: string;
  gender?: string;
  type?: string;
  priceMin?: string;
  priceMax?: string;
}