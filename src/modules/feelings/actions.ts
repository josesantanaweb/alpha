import "server-only";
import { Feeling } from "@prisma/client";
import { db, isPrismaError } from "@/lib/db";
import {
  ApiResult,
  PaginatedResult,
  PaginationParams,
} from "@/modules/shared/types";
import { CreateFeelingSchema, UpdateFeelingSchema } from "./schema";

export async function getAll(
  params: PaginationParams = {}
): Promise<ApiResult<PaginatedResult<Feeling>>> {
  const limit = params.limit ?? 10;
  const offset = params.offset ?? 0;

  try {
    const [feelings, total] = await Promise.all([
      db.feeling.findMany({
        take: limit,
        skip: offset,
      }),
      db.feeling.count(),
    ]);

    const nextOffset = offset + limit;

    return {
      success: true,
      status: 200,
      data: {
        data: feelings,
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
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener la emocion .",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Feeling>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const feeling = await db.feeling.findUnique({
      where: { id },
    });

    if (!feeling) {
      return {
        success: false,
        status: 404,
        message: "Emocion no encontrada.",
      };
    }

    return { success: true, status: 200, data: feeling };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Feeling>> {
  const result = CreateFeelingSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const feeling = await db.feeling.create({
      data: {
        ...result.data,
      },
    });
    return {
      success: true,
      status: 201,
      data: feeling,
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Esa emocion ya existe.",
      };
    }

    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function update(
  id: string,
  rawData: unknown
): Promise<ApiResult<Feeling>> {
  const result = UpdateFeelingSchema.safeParse({
    id,
    ...(rawData as Record<string, unknown>),
  });

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const { id: _, ...updateData } = result.data;
    const updatedPerfume = await db.feeling.update({
      where: { id },
      data: updateData,
    });

    return { success: true, status: 200, data: updatedPerfume };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return {
        success: false,
        status: 404,
        message: "Emocion no encontrada.",
      };
    }

    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function remove(id: string) {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    await db.feeling.delete({
      where: { id },
    });

    return {
      success: true,
      status: 200,
      data: null,
      message: "Emocion eliminada con éxito.",
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return {
        success: false,
        status: 404,
        message: "Emocion no encontrada.",
      };
    }
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}
