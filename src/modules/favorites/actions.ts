import { db } from "@/lib/db";
import type { ApiResult } from "@/types";
import type { PerfumeWithRelations } from "@/modules/perfumes";

export async function getByIds(
  ids: string[],
): Promise<ApiResult<PerfumeWithRelations[]>> {
  if (!ids.length) {
    return { success: true, status: 200, data: [] };
  }

  try {
    const perfumes = await db.perfume.findMany({
      where: { id: { in: ids } },
      include: { category: true, designer: true },
    });

    const ordered = ids
      .map((id) => perfumes.find((p) => p.id === id))
      .filter((p): p is PerfumeWithRelations => p !== undefined);

    return { success: true, status: 200, data: ordered };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener los favoritos.",
    };
  }
}
