import { db, isPrismaError } from "@/lib/db";
import { CreatePerfumeSchema, UpdatePerfumeSchema } from "./schema";
import { ApiResult, PaginationParams, PaginatedResult } from "@/types";
import { Perfume, Prisma } from "@prisma/client";

export type PerfumeWithRelations = Prisma.PerfumeGetPayload<{
  include: { category: true; designer: true };
}>;

export interface GetPerfumesParams extends PaginationParams {
  search?: string;
  categoryId?: string;
  designerId?: string;
  tagId?: string;
  tag?: string;
  gender?: string;
}

export async function getAll(params: GetPerfumesParams = {}): Promise<ApiResult<PaginatedResult<PerfumeWithRelations>>> {
  const limit = params.limit ?? 10;
  const offset = params.offset ?? 0;

  try {
    // Objeto dinámico: agregar filtros futuros (acordes, notas, género, temporada)
    // aquí sin tocar el resto de la lógica de paginado.
    const whereConditions: Prisma.PerfumeWhereInput = {};

    if (params.search) {
      whereConditions.name = { contains: params.search, mode: "insensitive" };
    }

    if (params.categoryId) {
      whereConditions.categoryId = params.categoryId;
    }

    if (params.designerId) {
      whereConditions.designerId = params.designerId;
    }

    if (params.tagId) {
      whereConditions.tags = { some: { id: params.tagId } };
    }

    if (params.tag) {
      whereConditions.tags = { some: { name: { equals: params.tag, mode: "insensitive" } } };
    }

    if (params.gender) {
      whereConditions.gender = params.gender as Prisma.EnumGenderFilter["equals"];
    }

    const [perfumes, total] = await Promise.all([
      db.perfume.findMany({
        where: whereConditions,
        orderBy: { name: "asc" },
        include: {
          category: true,
          designer: true,
        },
        take: limit,
        skip: offset,
      }),
      db.perfume.count({ where: whereConditions }),
    ]);

    const nextOffset = offset + limit;

    return {
      success: true,
      status: 200,
      data: {
        data: perfumes,
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
      message: error instanceof Error ? error.message : "Error al obtener los perfumes.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<PerfumeWithRelations>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "El ID es requerido.",
    };
  }

  try {
    const perfume = await db.perfume.findUnique({
      where: { id },
      include: {
        category: true,
        designer: true,
      },
    });

    if (!perfume) {
      return {
        success: false,
        status: 404,
        message: "Perfume no encontrado.",
      };
    }

    return { success: true, status: 200, data: perfume };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
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