import { db, isPrismaError } from "@/lib/db";
import { CreatePerfumeNoteSchema, UpdatePerfumeNoteSchema } from "./perfume-notes.schema";
import { ApiResult } from "@/types";
import { PerfumeNote } from "@prisma/client";

export async function getAll(): Promise<ApiResult<PerfumeNote[]>> {
  try {
    const perfumeNotes = await db.perfumeNote.findMany({
      orderBy: { name: "asc" },
    });

    return { success: true, status: 200, data: perfumeNotes };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener los perfumes.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<PerfumeNote>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const perfumeNote = await db.perfumeNote.findUnique({
      where: { id },
    });

    if (!perfumeNote) {
      return {
        success: false,
        status: 404,
        message: "Nota de Perfume no encontrada.",
      };
    }

    return { success: true, status: 200, data: perfumeNote };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<PerfumeNote>> {
  const result = CreatePerfumeNoteSchema.safeParse(rawData);

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const perfume = await db.perfumeNote.create({
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
        message: "Esa nota de perfume ya existe." 
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function update(id: string, rawData: unknown): Promise<ApiResult<PerfumeNote>> {
  const result = UpdatePerfumeNoteSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const { id: _, ...updateData } = result.data;
    const updatedPerfume = await db.perfumeNote.update({
      where: { id },
      data: updateData,
    });

    return { success: true, status: 200, data: updatedPerfume };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Nota de Perfume no encontrada." 
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
    await db.perfumeNote.delete({
      where: { id },
    });

    return { success: true, status: 200, data: null, message: "Nota de Perfume eliminado con éxito." };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Nota de Perfume no encontrada." 
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}