import { db, isPrismaError } from "@/lib/db";
import { CreatePerfumeSchema, UpdatePerfumeSchema } from "./perfumes.schema";
import { ApiResult } from "@/types";
import { Perfume } from "@prisma/client";

export async function getAll(): Promise<ApiResult<Perfume[]>> {
  try {
    const perfumes = await db.perfume.findMany({
      orderBy: { name: "asc" },
      include: {
        category: true,
      }
    });

    return { success: true, status: 200, data: perfumes };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener los perfumes.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Perfume>> {
  const result = CreatePerfumeSchema.safeParse(rawData);

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const perfume = await db.perfume.create({
      data: { 
        ...result.data
      },
    });
    return { 
      success: true, 
      status: 201, 
      data: perfume 
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return { 
        success: false, 
        status: 409, 
        message: "Ese perfume ya existe." 
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function update(id: string, rawData: unknown): Promise<ApiResult<Perfume>> {
  const result = UpdatePerfumeSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const { id: _, ...updateData } = result.data;
    const updatedPerfume = await db.perfume.update({
      where: { id },
      data: updateData,
    });

    return { success: true, status: 200, data: updatedPerfume };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Perfume no encontrado." 
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
    await db.perfume.delete({
      where: { id },
    });

    return { success: true, status: 200, data: null, message: "Perfume eliminado con éxito." };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Perfume no encontrado." 
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}