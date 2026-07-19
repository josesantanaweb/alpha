import type { Designer } from "@prisma/client";

export async function getDesigners(): Promise<
  Pick<Designer, "id" | "name" | "image">[]
> {
  const response = await fetch("/api/designers?limit=50");

  if (!response.ok) {
    throw new Error("Error al obtener los diseñadores.");
  }

  const json = await response.json();
  return json.data;
}
