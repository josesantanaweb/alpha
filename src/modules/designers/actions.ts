import { db, isPrismaError } from "@/lib/db";
import { CreateDesignerSchema, UpdateDesignerSchema } from "./schema";
import { ApiResult } from "@/types";
import { Designer } from "@prisma/client";

export async function getAll(): Promise<ApiResult<Designer[]>> {
  try {
    const designers = await db.designer.findMany();

    return {
      success: true,
      status: 200,
      data: designers
    };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener los diseñadores.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Designer>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const designer = await db.designer.findUnique({
      where: { id },
    });

    if (!designer) {
      return {
        success: false,
        status: 404,
        message: "Diseñador no encontrado.",
      };
    }

    return { success: true, status: 200, data: designer };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Designer>> {
  const result = CreateDesignerSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const designer = await db.designer.create({
      data: {  ...result.data },
    });
    return {
      success: true,
      status: 201,
      data: designer
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ese nombre o slug de diseñador ya existe."
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
  const result = UpdateDesignerSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors
    };
  }

  try {
    const { id: _, ...updateData } = result.data;
    const designer = await db.designer.update({
      where: { id },
      data: { ...updateData },
    });

    return { success: true, status: 200, data: designer };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ese nombre o slug de diseñador ya existe."
      };
    }
    if (isPrismaError(error) && error.code === "P2025") {
      return {
        success: false,
        status: 404,
        message: "Diseñador no encontrado."
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
    await db.designer.delete({
      where: { id },
    });

    return {
      success: true,
      status: 200,
      message: "Diseñador eliminado con éxito."
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return {
        success: false,
        status: 404,
        message: "Diseñador no encontrado."
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}
