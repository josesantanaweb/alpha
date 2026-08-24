import type { Accord } from "@prisma/client";
import { API_ROUTES } from "@/constants";

export async function getAccords(): Promise<Pick<Accord, "id" | "name">[]> {
  const response = await fetch(API_ROUTES.ACCORDS);

  if (!response.ok) {
    throw new Error("Error al obtener los acordes.");
  }

  const json = await response.json();
  return json.data;
}
