import { db, isPrismaError } from "@/lib/db";
import { CreateSeasonSchema, UpdateSeasonSchema } from "./schema";
import { ApiResult } from "@/types";
import { Season } from "@prisma/client";

export async function getAll(): Promise<ApiResult<Season[]>> {
  try {
    const seasons = await db.season.findMany();

    return { success: true, status: 200, data: seasons };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener las Estaciones.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Season>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const season = await db.season.findUnique({
      where: { id },
    });

    if (!season) {
      return {
        success: false,
        status: 404,
        message: "Estacion no encontrada.",
      };
    }

    return { success: true, status: 200, data: season };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Season>> {
  const result = CreateSeasonSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const season = await db.season.create({
      data: {
        ...result.data
      },
    });
    return {
      success: true,
      status: 201,
      data: season
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Esa estacion ya existe."
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function update(id: string, rawData: unknown): Promise<ApiResult<Season>> {
  const result = UpdateSeasonSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const { id: _, ...updateData } = result.data;
    const updatedPerfume = await db.season.update({
      where: { id },
      data: updateData,
    });

    return { success: true, status: 200, data: updatedPerfume };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return {
        success: false,
        status: 404,
        message: "Estacion no encontrada."
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
    await db.season.delete({
      where: { id },
    });

    return { success: true, status: 200, data: null, message: "Estacion eliminada con éxito." };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return {
        success: false,
        status: 404,
        message: "Estacion no encontrada."
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}
