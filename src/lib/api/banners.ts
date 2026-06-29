import type { Banner } from "@prisma/client";

export async function getActiveBanners(): Promise<Banner[]> {
  const response = await fetch("/api/banners/active");

  if (!response.ok) {
    throw new Error("Error al obtener los banners.");
  }

  return response.json();
}
