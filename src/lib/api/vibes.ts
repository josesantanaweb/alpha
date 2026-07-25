import type { Vibe } from "@prisma/client";
import { API_ROUTES } from "@/constants";
export async function getActiveVibes(): Promise<Vibe[]> {
  const response = await fetch(API_ROUTES.VIBES);

  if (!response.ok) {
    throw new Error("Error al obtener las vibras.");
  }

  return response.json();
}
