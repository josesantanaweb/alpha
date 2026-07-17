import { db, isPrismaError } from "@/lib/db";
import { CreateTagSchema, UpdateTagSchema } from "./schema";
import { ApiResult, PaginationParams, PaginatedResult } from "@/modules/shared/types";
import { Tag } from "@prisma/client";

export async function getAll(params: PaginationParams = {}): Promise<ApiResult<PaginatedResult<Tag>>> {
  const limit = params.limit ?? 10;
  const offset = params.offset ?? 0;

  try {
    const [tags, total] = await Promise.all([
      db.tag.findMany({
        take: limit,
        skip: offset,
      }),
      db.tag.count(),
    ]);

    const nextOffset = offset + limit;

    return {
      success: true,
      status: 200,
      data: {
        data: tags,
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
      message: error instanceof Error ? error.message : "Error al obtener las etiquetas.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Tag>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const tag = await db.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      return {
        success: false,
        status: 404,
        message: "Etiqueta no encontrada.",
      };
    }

    return { success: true, status: 200, data: tag };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Tag>> {
  const result = CreateTagSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const tag = await db.tag.create({
      data: {  ...result.data },
    });
    return {
      success: true,
      status: 201,
      data: tag
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ese nombre de etiqueta ya existe."
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
  const result = UpdateTagSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const tag = await db.tag.update({
      where: { id },
      data: {  ...result.data  },
    });

    return { success: true, status: 200, data: tag };
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
    await db.tag.delete({
      where: { id },
    });

    return {
      success: true,
      status: 200,
      message: "Etiqueta eliminada con éxito."
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return {
        success: false,
        status: 404,
        message: "Etiqueta no encontrada."
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}
