import "server-only";
import type { Vibe } from "@prisma/client";
import { db } from "@/lib/db";
import type { ApiResult } from "@/modules/shared/types";

export async function getActive(): Promise<ApiResult<Vibe[]>> {
  try {
    const vibes = await db.vibe.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return { success: true, status: 200, data: vibes };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error al obtener las vibras.",
    };
  }
}
