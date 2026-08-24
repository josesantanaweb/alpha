import type { Banner } from "@prisma/client";
import { API_ROUTES } from "@/constants";

export async function getActiveBanners(): Promise<Banner[]> {
  const response = await fetch(API_ROUTES.BANNERS.ACTIVE);

  if (!response.ok) {
    throw new Error("Error al obtener los banners.");
  }

  return response.json();
}
