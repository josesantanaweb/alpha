import { db, isPrismaError } from "@/lib/db";
import { CreateAccordSchema, UpdateAccordSchema } from "./schema";
import { ApiResult, PaginationParams, PaginatedResult } from "@/types";
import { Accord } from "@prisma/client";

export async function getAll(params: PaginationParams = {}): Promise<ApiResult<PaginatedResult<Accord>>> {
  const limit = params.limit ?? 10;
  const offset = params.offset ?? 0;

  try {
    const [accords, total] = await Promise.all([
      db.accord.findMany({
        take: limit,
        skip: offset,
      }),
      db.accord.count(),
    ]);

    const nextOffset = offset + limit;

    return {
      success: true,
      status: 200,
      data: {
        data: accords,
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
      message: error instanceof Error ? error.message : "Error al obtener los acordes.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Accord>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const accord = await db.accord.findUnique({
      where: { id },
    });

    if (!accord) {
      return {
        success: false,
        status: 404,
        message: "Acorde no encontrado.",
      };
    }

    return { success: true, status: 200, data: accord };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Accord>> {
  const result = CreateAccordSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const accord = await db.accord.create({
      data: {  ...result.data },
    });
    return {
      success: true,
      status: 201,
      data: accord
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ese nombre de acorde ya existe."
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
  const result = UpdateAccordSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const accord = await db.accord.update({
      where: { id },
      data: {  ...result.data  },
    });

    return { success: true, status: 200, data: accord };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ese nombre de acorde ya existe."
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
    await db.accord.delete({
      where: { id },
    });

    return {
      success: true,
      status: 200,
      message: "Acorde eliminado con éxito."
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return {
        success: false,
        status: 404,
        message: "Acorde no encontrado."
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}