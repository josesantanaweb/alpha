import { db, isPrismaError } from "@/lib/db";
import { CreateSillageSchema, UpdateSillageSchema } from "./schema";
import { ApiResult, PaginationParams, PaginatedResult } from "@/modules/shared/types";
import { Sillage } from "@prisma/client";

export async function getAll(params: PaginationParams = {}): Promise<ApiResult<PaginatedResult<Sillage>>> {
  const limit = params.limit ?? 10;
  const offset = params.offset ?? 0;

  try {
    const [sillages, total] = await Promise.all([
      db.sillage.findMany({
        take: limit,
        skip: offset,
      }),
      db.sillage.count(),
    ]);

    const nextOffset = offset + limit;

    return {
      success: true,
      status: 200,
      data: {
        data: sillages,
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
      message: error instanceof Error ? error.message : "Error al obtener las estelas.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Sillage>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const sillage = await db.sillage.findUnique({
      where: { id },
    });

    if (!sillage) {
      return {
        success: false,
        status: 404,
        message: "Estela no encontrada.",
      };
    }

    return { success: true, status: 200, data: sillage };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Sillage>> {
  const result = CreateSillageSchema.safeParse(rawData);

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const sillage = await db.sillage.create({
      data: { 
        ...result.data
      },
    });
    return { 
      success: true, 
      status: 201, 
      data: sillage 
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return { 
        success: false, 
        status: 409, 
        message: "Esa estela ya existe." 
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function update(id: string, rawData: unknown): Promise<ApiResult<Sillage>> {
  const result = UpdateSillageSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const { id: _, ...updateData } = result.data;
    const updatedPerfume = await db.sillage.update({
      where: { id },
      data: updateData,
    });

    return { success: true, status: 200, data: updatedPerfume };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Estela no encontrada." 
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
    await db.sillage.delete({
      where: { id },
    });

    return { success: true, status: 200, data: null, message: "Estela eliminada con éxito." };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Estela no encontrada." 
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}