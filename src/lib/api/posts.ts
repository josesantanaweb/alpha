import type { Post } from "@prisma/client";
import { API_ROUTES } from "@/constants";

export interface GetPostsParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface PostsPageResult {
  data: Post[];
  total: number;
  limit: number;
  offset: number;
  nextPage: number | null;
}

export async function getPosts(
  params: GetPostsParams = {},
): Promise<PostsPageResult> {
  const searchParams = new URLSearchParams();

  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.offset) searchParams.set("offset", String(params.offset));
  if (params.search) searchParams.set("search", params.search);

  const response = await fetch(
    `${API_ROUTES.POSTS}?${searchParams.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Error al obtener los posts.");
  }

  return response.json();
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const response = await fetch(`${API_ROUTES.POSTS}/slug/${slug}`);

  if (!response.ok) {
    throw new Error("Post no encontrado.");
  }

  return response.json();
}
