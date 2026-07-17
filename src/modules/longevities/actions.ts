import { db, isPrismaError } from "@/lib/db";
import { CreateLongevitySchema, UpdateLongevitySchema } from "./schema";
import { ApiResult, PaginationParams, PaginatedResult } from "@/modules/shared/types";
import { Longevity } from "@prisma/client";

export async function getAll(params: PaginationParams = {}): Promise<ApiResult<PaginatedResult<Longevity>>> {
  const limit = params.limit ?? 10;
  const offset = params.offset ?? 0;

  try {
    const [longevities, total] = await Promise.all([
      db.longevity.findMany({
        take: limit,
        skip: offset,
      }),
      db.longevity.count(),
    ]);

    const nextOffset = offset + limit;

    return {
      success: true,
      status: 200,
      data: {
        data: longevities,
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
      message: error instanceof Error ? error.message : "Error al obtener las longevidad.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Longevity>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const longevity = await db.longevity.findUnique({
      where: { id },
    });

    if (!longevity) {
      return {
        success: false,
        status: 404,
        message: "Longevidad no encontrada.",
      };
    }

    return { success: true, status: 200, data: longevity };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Longevity>> {
  const result = CreateLongevitySchema.safeParse(rawData);

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const longevity = await db.longevity.create({
      data: { 
        ...result.data
      },
    });
    return { 
      success: true, 
      status: 201, 
      data: longevity 
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return { 
        success: false, 
        status: 409, 
        message: "Esa longevidad ya existe." 
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function update(id: string, rawData: unknown): Promise<ApiResult<Longevity>> {
  const result = UpdateLongevitySchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const { id: _, ...updateData } = result.data;
    const updatedPerfume = await db.longevity.update({
      where: { id },
      data: updateData,
    });

    return { success: true, status: 200, data: updatedPerfume };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Longevidad no encontrada." 
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
    await db.longevity.delete({
      where: { id },
    });

    return { success: true, status: 200, data: null, message: "Longevidad eliminado con éxito." };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Longevidad no encontrada." 
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}