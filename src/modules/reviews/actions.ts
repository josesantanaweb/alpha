import { db, isPrismaError } from "@/lib/db";
import { CreateReviewSchema, UpdateReviewSchema } from "./schema";
import type { ApiResult } from "@/modules/shared/types";
import { PaginatedResult } from "@/modules/shared/types";
import type { ReviewWithUser, GetReviewsParams } from "./types";
import { Review } from "@prisma/client";


const userSelect = {
  id: true,
  name: true,
  avatar: true,
} as const;


async function syncPerfumeRating(perfumeId: string): Promise<void> {
  const agg = await db.review.aggregate({
    where: { perfumeId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await db.perfume.update({
    where: { id: perfumeId },
    data: {
      rating: agg._avg.rating ?? 0,
      reviewCount: agg._count.rating,
    },
  });
}

export async function getByPerfume(
  params: GetReviewsParams,
): Promise<ApiResult<PaginatedResult<ReviewWithUser>>> {
  const { perfumeId, limit = 10, offset = 0 } = params;

  if (!perfumeId) {
    return { success: false, status: 400, message: "El perfumeId es requerido." };
  }

  try {
    const [reviews, total] = await Promise.all([
      db.review.findMany({
        where: { perfumeId },
        include: { user: { select: userSelect } },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.review.count({ where: { perfumeId } }),
    ]);

    const nextOffset = offset + limit;

    return {
      success: true,
      status: 200,
      data: {
        data: reviews,
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
      message: error instanceof Error ? error.message : "Error al obtener las reviews.",
    };
  }
}

export async function getUserReview(
  userId: string,
  perfumeId: string,
): Promise<ApiResult<ReviewWithUser | null>> {
  if (!userId || !perfumeId) {
    return { success: false, status: 400, message: "Parámetros inválidos." };
  }

  try {
    const review = await db.review.findUnique({
      where: { userId_perfumeId: { userId, perfumeId } },
      include: { user: { select: userSelect } },
    });

    return { success: true, status: 200, data: review };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener la review.",
    };
  }
}

export async function create(
  userId: string,
  rawData: unknown,
): Promise<ApiResult<ReviewWithUser>> {
  const result = CreateReviewSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { perfumeId, comment, rating, title } = result.data;

  const perfume = await db.perfume.findUnique({ where: { id: perfumeId } });
  if (!perfume) {
    return { success: false, status: 404, message: "Perfume no encontrado." };
  }

  try {
    const review = await db.review.create({
      data: { userId, perfumeId, comment, rating, title },
      include: { user: { select: userSelect } },
    });

    await syncPerfumeRating(perfumeId);

    return {
      success: true,
      status: 201,
      data: review,
      message: "Review publicada con éxito.",
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ya has publicado una review para este perfume.",
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al crear la review.",
    };
  }
}

export async function update(
  reviewId: string,
  userId: string,
  rawData: unknown,
): Promise<ApiResult<ReviewWithUser>> {
  const result = UpdateReviewSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (!result.data.comment && !result.data.title && result.data.rating === undefined) {
    return {
      success: false,
      status: 400,
      message: "Debes proporcionar al menos un campo para actualizar.",
    };
  }

  try {
    const existing = await db.review.findUnique({ where: { id: reviewId } });

    if (!existing) {
      return { success: false, status: 404, message: "Review no encontrada." };
    }

    if (existing.userId !== userId) {
      return { success: false, status: 403, message: "No tienes permiso para editar esta review." };
    }

    const updated = await db.review.update({
      where: { id: reviewId },
      data: result.data,
      include: { user: { select: userSelect } },
    });

    await syncPerfumeRating(existing.perfumeId);

    return {
      success: true,
      status: 200,
      data: updated,
      message: "Review actualizada con éxito.",
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { success: false, status: 404, message: "Review no encontrada." };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al actualizar la review.",
    };
  }
}

export async function remove(
  reviewId: string,
  userId: string,
): Promise<ApiResult<null>> {
  try {
    const existing = await db.review.findUnique({ where: { id: reviewId } });

    if (!existing) {
      return { success: false, status: 404, message: "Review no encontrada." };
    }

    if (existing.userId !== userId) {
      return { success: false, status: 403, message: "No tienes permiso para eliminar esta review." };
    }

    await db.review.delete({ where: { id: reviewId } });
    await syncPerfumeRating(existing.perfumeId);

    return { success: true, status: 200, data: null, message: "Review eliminada con éxito." };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { success: false, status: 404, message: "Review no encontrada." };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al eliminar la review.",
    };
  }
}

export type { Review };
