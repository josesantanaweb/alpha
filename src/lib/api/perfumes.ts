export interface GetPerfumesParams {
  search?: string;
  categoryId?: string;
  designerId?: string;
  tagId?: string;
  limit?: number;
  offset?: number;
}

export interface PerfumeListItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  discount: number;
  image: string | null;
}

export async function getPerfumes(
  params: GetPerfumesParams = {},
): Promise<PerfumeListItem[]> {
  const searchParams = new URLSearchParams();

  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.offset) searchParams.set("offset", String(params.offset));
  if (params.search) searchParams.set("search", params.search);
  if (params.categoryId) searchParams.set("categoryId", params.categoryId);
  if (params.designerId) searchParams.set("designerId", params.designerId);
  if (params.tagId) searchParams.set("tagId", params.tagId);

  const response = await fetch(`/api/perfumes?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Error al obtener los perfumes.");
  }

  const json = await response.json();

  return json.data.map(
    (p: { id: string; name: string; price: string; rating: string; discount: number; image: string | null }) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      rating: Number(p.rating),
      discount: p.discount,
      image: p.image,
    }),
  );
}