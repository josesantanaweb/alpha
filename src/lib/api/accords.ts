import type { Accord } from "@prisma/client";

export async function getAccords(): Promise<Pick<Accord, "id" | "name">[]> {
  const response = await fetch("/api/accords");

  if (!response.ok) {
    throw new Error("Error al obtener los acordes.");
  }

  const json = await response.json();
  return json.data;
}