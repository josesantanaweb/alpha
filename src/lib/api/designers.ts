import type { Designer } from "@prisma/client";
import { API_ROUTES } from "@/constants";

export async function getDesigners(): Promise<
  Pick<Designer, "id" | "name" | "image">[]
> {
  const response = await fetch(`${API_ROUTES.DESIGNERS}?limit=50`);

  if (!response.ok) {
    throw new Error("Error al obtener los diseñadores.");
  }

  const json = await response.json();
  return json.data;
}
