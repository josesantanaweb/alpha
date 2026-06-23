import { db, isPrismaError } from "@/lib/db";
import { CreateDecantSchema, UpdateDecantSchema } from "./decants.schema";
import { ApiResult } from "@/types";
import { Decant } from "@prisma/client";

export async function getAll(): Promise<ApiResult<Decant[]>> {
  try {
    const decants = await db.decant.findMany({
      include: {
        perfume: true
      }
    });

    return { success: true, status: 200, data: decants };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener los decants.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Decant>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const decant = await db.decant.findUnique({
      where: { id },
      include: {
        perfume: true
      }
    });

    if (!decant) {
      return {
        success: false,
        status: 404,
        message: "Decant no encontrado.",
      };
    }

    return { success: true, status: 200, data: decant };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Decant>> {
  const result = CreateDecantSchema.safeParse(rawData);

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const decant = await db.decant.create({
      data: { 
        ...result.data
      },
    });
    return { 
      success: true, 
      status: 201, 
      data: decant 
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return { 
        success: false, 
        status: 409, 
        message: "Ese decant ya existe." 
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function update(id: string, rawData: unknown): Promise<ApiResult<Decant>> {
  const result = UpdateDecantSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const { id: _, ...updateData } = result.data;
    const updatedPerfume = await db.decant.update({
      where: { id },
      data: updateData,
    });

    return { success: true, status: 200, data: updatedPerfume };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Decant no encontrado." 
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
    await db.decant.delete({
      where: { id },
    });

    return { success: true, status: 200, data: null, message: "Decant eliminado con éxito." };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Decant no encontrada." 
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}