import { db, isPrismaError } from "@/lib/db";
import { CreateBannerSchema, UpdateBannerSchema } from "./schema";
import { ApiResult, PaginationParams, PaginatedResult } from "@/modules/shared/types";
import { Banner } from "@prisma/client";

export async function getActive(): Promise<ApiResult<Banner[]>> {
  try {
    const banners = await db.banner.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return { success: true, status: 200, data: banners };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener los banners activos.",
    };
  }
}

export async function getAll(params: PaginationParams = {}): Promise<ApiResult<PaginatedResult<Banner>>> {
  const limit = params.limit ?? 10;
  const offset = params.offset ?? 0;

  try {
    const [banners, total] = await Promise.all([
      db.banner.findMany({
        take: limit,
        skip: offset,
      }),
      db.banner.count(),
    ]);

    const nextOffset = offset + limit;

    return {
      success: true,
      status: 200,
      data: {
        data: banners,
        total,
        limit,
        offset,
        nextPage: nextOffset < total ? nextOffset : null,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener los banners.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Banner>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const banner = await db.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      return {
        success: false,
        status: 404,
        message: "Banner no encontrado.",
      };
    }

    return { success: true, status: 200, data: banner };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Banner>> {
  const result = CreateBannerSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const banner = await db.banner.create({
      data: {  ...result.data },
    });
    return {
      success: true,
      status: 201,
      data: banner
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ese nombre de banner ya existe."
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function update(id: string, rawData: unknown) {
  const result = UpdateBannerSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const banner = await db.banner.update({
      where: { id },
      data: {  ...result.data  },
    });

    return { success: true, status: 200, data: banner };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ese nombre de la etiqueta ya existe."
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}
export async function remove(id: string) {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido."
    };
  }

  try {
    await db.banner.delete({
      where: { id },
    });

    return {
      success: true,
      status: 200,
      message: "Banner eliminado con éxito."
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return {
        success: false,
        status: 404,
        message: "Banner no encontrado."
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}
