import { db, isPrismaError } from "@/lib/db";
import { CreatePostSchema, UpdatePostSchema } from "./schema";
import type { ApiResult } from "@/modules/shared/types";
import { PaginatedResult } from "@/modules/shared/types";
import type { GetPostsParams, Post } from "./types";

export async function getAll(
  params: GetPostsParams = {},
): Promise<ApiResult<PaginatedResult<Post>>> {
  const limit = params.limit ?? 10;
  const offset = params.offset ?? 0;

  try {
    const where = params.search
      ? {
          OR: [
            { title: { contains: params.search, mode: "insensitive" as const } },
            { excerpt: { contains: params.search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.post.count({ where }),
    ]);

    const nextOffset = offset + limit;

    return {
      success: true,
      status: 200,
      data: {
        data: posts,
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
      message:
        error instanceof Error ? error.message : "Error al obtener los posts.",
    };
  }
}

export async function getOne(id: string): Promise<ApiResult<Post>> {
  if (!id) {
    return { success: false, status: 400, message: "El ID es requerido." };
  }

  try {
    const post = await db.post.findUnique({ where: { id } });

    if (!post) {
      return { success: false, status: 404, message: "Post no encontrado." };
    }

    return { success: true, status: 200, data: post };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function getBySlug(slug: string): Promise<ApiResult<Post>> {
  if (!slug) {
    return { success: false, status: 400, message: "El slug es requerido." };
  }

  try {
    const post = await db.post.findUnique({ where: { slug } });

    if (!post) {
      return { success: false, status: 404, message: "Post no encontrado." };
    }

    return { success: true, status: 200, data: post };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error interno del servidor.",
    };
  }
}

export async function create(rawData: unknown): Promise<ApiResult<Post>> {
  const result = CreatePostSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const post = await db.post.create({ data: result.data });

    return { success: true, status: 201, data: post };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ya existe un post con ese título o slug.",
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al crear el post.",
    };
  }
}

export async function update(
  id: string,
  rawData: unknown,
): Promise<ApiResult<Post>> {
  const result = UpdatePostSchema.safeParse({
    id,
    ...(rawData as Record<string, unknown>),
  });

  if (!result.success) {
    return {
      success: false,
      status: 400,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, ...updateData } = result.data;

    const post = await db.post.update({
      where: { id },
      data: updateData,
    });

    return { success: true, status: 200, data: post };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { success: false, status: 404, message: "Post no encontrado." };
    }

    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ya existe un post con ese título o slug.",
      };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al actualizar el post.",
    };
  }
}

export async function remove(id: string): Promise<ApiResult<null>> {
  if (!id) {
    return { success: false, status: 400, message: "El ID es requerido." };
  }

  try {
    await db.post.delete({ where: { id } });

    return {
      success: true,
      status: 200,
      data: null,
      message: "Post eliminado con éxito.",
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { success: false, status: 404, message: "Post no encontrado." };
    }

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al eliminar el post.",
    };
  }
}
