import { db, isPrismaError } from "@/lib/db";
import { CreateNoteSchema, UpdateNoteSchema } from "./schema";
import { ApiResult } from "@/types";
import { Note } from "@prisma/client";

export async function getAll(): Promise<ApiResult<Note[]>> {
  try {
    const notes = await db.note.findMany();

    return { success: true, status: 200, data: notes };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener las notas.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Note>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const note = await db.note.findUnique({
      where: { id },
    });

    if (!note) {
      return {
        success: false,
        status: 404,
        message: "Nota de Perfume no encontrada.",
      };
    }

    return { success: true, status: 200, data: note };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Note>> {
  const result = CreateNoteSchema.safeParse(rawData);

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const note = await db.note.create({
      data: { 
        ...result.data
      },
    });
    return { 
      success: true, 
      status: 201, 
      data: note 
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

export async function update(id: string, rawData: unknown): Promise<ApiResult<Note>> {
  const result = UpdateNoteSchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return { 
      success: false, 
      status: 400, 
      errors: result.error.flatten().fieldErrors 
    };
  }

  try {
    const { id: _, ...updateData } = result.data;
    const updatedPerfume = await db.note.update({
      where: { id },
      data: updateData,
    });

    return { success: true, status: 200, data: updatedPerfume };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Nota de perfume no encontrada." 
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
    await db.note.delete({
      where: { id },
    });

    return { success: true, status: 200, data: null, message: "Nota de perfume eliminado con éxito." };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { 
        success: false, 
        status: 404, 
        message: "Nota de perfume no encontrada." 
      };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}