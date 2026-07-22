import { Prisma } from "@prisma/client";

export interface GetPerfumesParams {
  search?: string;
  accord?: string;
  designer?: string;
  tag?: string;
  gender?: string;
  type?: string;
  priceMin?: number;
  priceMax?: number;
  limit?: number;
  offset?: number;
}

export async function getPerfumes(
  params: GetPerfumesParams = {},
): Promise<Prisma.PerfumeGetPayload<{ include: { designer: true; accords: true } }>[]> {
  const searchParams = new URLSearchParams();

  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.offset) searchParams.set("offset", String(params.offset));
  if (params.search) searchParams.set("search", params.search);
  if (params.accord) searchParams.set("accord", params.accord);
  if (params.designer) searchParams.set("designer", params.designer);
  if (params.tag) searchParams.set("tag", params.tag);
  if (params.gender) searchParams.set("gender", params.gender);
  if (params.type) searchParams.set("type", params.type);
  if (params.priceMin) searchParams.set("priceMin", String(params.priceMin));
  if (params.priceMax) searchParams.set("priceMax", String(params.priceMax));

  const response = await fetch(`/api/perfumes?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Error al obtener los perfumes.");
  }

  const json = await response.json();
  return json.data;
}
