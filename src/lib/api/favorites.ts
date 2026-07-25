import type { PerfumeWithRelations } from "@/modules/perfumes";
import { API_ROUTES } from "@/constants";

/** Get current user's favorite perfumes */
export async function getFavorites(token: string): Promise<PerfumeWithRelations[]> {
  const res = await fetch(API_ROUTES.FAVORITES, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return (await res.json()) as PerfumeWithRelations[];
}

/** Add a perfume to the user's favorites */
export async function addFavorite(
  token: string,
  perfumeId: string,
): Promise<void> {
  const res = await fetch(API_ROUTES.FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ perfumeId }),
  });
  if (!res.ok) throw new Error("Error al agregar favorito");
}

/** Remove a perfume from the user's favorites */
export async function removeFavorite(
  token: string,
  perfumeId: string,
): Promise<void> {
  const res = await fetch(API_ROUTES.FAVORITES, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ perfumeId }),
  });
  if (!res.ok) throw new Error("Error al eliminar favorito");
}
