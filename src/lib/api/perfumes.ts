import { Prisma } from "@prisma/client";

export interface GetPerfumesParams {
  search?: string;
  categoryId?: string;
  designerId?: string;
  tagId?: string;
  tag?: string;
  gender?: string;
  limit?: number;
  offset?: number;
}

export async function getPerfumes(
  params: GetPerfumesParams = {},
): Promise<Prisma.PerfumeGetPayload<{ include: { designer: true; category: true } }>[]> {
  const searchParams = new URLSearchParams();

  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.offset) searchParams.set("offset", String(params.offset));
  if (params.search) searchParams.set("search", params.search);
  if (params.categoryId) searchParams.set("categoryId", params.categoryId);
  if (params.designerId) searchParams.set("designerId", params.designerId);
  if (params.tagId) searchParams.set("tagId", params.tagId);
  if (params.tag) searchParams.set("tag", params.tag);
  if (params.gender) searchParams.set("gender", params.gender);

  const response = await fetch(`/api/perfumes?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Error al obtener los perfumes.");
  }

  const json = await response.json();
  return json.data;
}
