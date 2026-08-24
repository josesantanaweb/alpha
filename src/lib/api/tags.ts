import type { Tag } from "@prisma/client";
import { API_ROUTES } from "@/constants";

export async function getTags(): Promise<Tag[]> {
  const response = await fetch(API_ROUTES.TAGS);

  if (!response.ok) {
    throw new Error("Error al obtener los tags.");
  }

  const json = await response.json();
  return json.data;
}
