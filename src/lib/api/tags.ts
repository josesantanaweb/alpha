import type { Tag } from "@prisma/client";

export async function getTags(): Promise<Tag[]> {
  const response = await fetch("/api/tags");

  if (!response.ok) {
    throw new Error("Error al obtener los tags.");
  }

  return response.json();
}