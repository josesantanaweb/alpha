import type { Vibe } from "@prisma/client";

export async function getActiveVibes(): Promise<Vibe[]> {
  const response = await fetch("/api/vibes");

  if (!response.ok) {
    throw new Error("Error al obtener las vibras.");
  }

  return response.json();
}
