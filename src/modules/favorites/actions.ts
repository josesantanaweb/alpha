import "server-only";

import { db } from "@/lib/db";

import type { ApiResult } from "@/modules/shared/types";
import type { PerfumeWithRelations } from "@/modules/perfumes";

export async function getByIds(
  ids: string[]
): Promise<ApiResult<PerfumeWithRelations[]>> {
  if (!ids.length) {
    return { success: true, status: 200, data: [] };
  }

  try {
    const perfumes = await db.perfume.findMany({
      where: { id: { in: ids } },
      include: {
        decants: true,
        accords: { include: { accord: true } },
        designer: true,
        season: true,
        timeOfDay: true,
        longevity: true,
        feeling: true,
        sillage: true,
        projection: true,
        notes: true,
      },
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

export async function getUserFavorites(
  userId: string
): Promise<ApiResult<PerfumeWithRelations[]>> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        favorites: {
          include: {
            decants: true,
            accords: { include: { accord: true } },
            designer: true,
            season: true,
            timeOfDay: true,
            longevity: true,
            feeling: true,
            sillage: true,
            projection: true,
            notes: true,
          },
        },
      },
    });

    if (!user) {
      return { success: false, status: 404, message: "Usuario no encontrado" };
    }

    return {
      success: true,
      status: 200,
      data: user.favorites,
    };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener favoritos del usuario.",
    };
  }
}

export async function create(
  userId: string,
  perfumeId: string
): Promise<ApiResult<null>> {
  try {
    await db.user.update({
      where: { id: userId },
      data: { favorites: { connect: { id: perfumeId } } },
    });

    return { success: true, status: 200, data: null, message: "Favorito agregado con éxito." };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error al agregar favorito.",
    };
  }
}

export async function remove(
  userId: string,
  perfumeId: string
): Promise<ApiResult<null>> {
  try {
    await db.user.update({
      where: { id: userId },
      data: { favorites: { disconnect: { id: perfumeId } } },
    });

    return { success: true, status: 200, data: null, message: "Favorito eliminado con éxito." };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error al eliminar favorito.",
    };
  }
}
