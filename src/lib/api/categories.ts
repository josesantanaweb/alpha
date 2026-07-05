import type { Category } from "@prisma/client";

export async function getCategories(): Promise<Pick<Category, "id" | "name">[]> {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    throw new Error("Error al obtener las categorías.");
  }

  const json = await response.json();
  return json.data;
}
