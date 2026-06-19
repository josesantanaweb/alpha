import { db } from "@/lib/db";
import { CreateCategorySchema, UpdateCategorySchema } from "./categories.schema";
import { Category } from "@/types/category";
import { ApiResult } from "@/types/api";

export async function getAll(): Promise<ApiResult<Category[]>> {
  try {
    const categories = await db.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    return { success: true, status: 200, data: categories };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener las categorías.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Category>> {
  const result = CreateCategorySchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, status: 400, errors: result.error.flatten().fieldErrors };
  }

  try {
    const category = await db.category.create({
      data: { name: result.data.name },
      select: { id: true, name: true },
    });
    return { success: true, status: 201, data: category };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: unknown }).code === "P2002"
    ) {
      return { success: false, status: 409, message: "Ese nombre de categoría ya existe." };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function update(id: string, rawData: unknown) {
  const result = UpdateCategorySchema.safeParse({ id, ...(rawData as Record<string, unknown>) });

  if (!result.success) {
    return { success: false, status: 400, errors: result.error.flatten().fieldErrors };
  }

  try {
    const updatedCategory = await db.category.update({
      where: { id },
      data: { name: result.data.name },
    });

    return { success: true, status: 200, data: updatedCategory };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: unknown }).code === "P2002"
    ) {
      return { success: false, status: 409, message: "Ese nombre de categoría ya existe." };
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
    return { success: false, status: 400, message: "El ID es requerido." };
  }

  try {
    await db.category.delete({
      where: { id },
    });

    return { success: true, status: 200, message: "Categoría eliminada con éxito." };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: unknown }).code === "P2025"
    ) {
      return { success: false, status: 404, message: "Categoría no encontrada." };
    }
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}