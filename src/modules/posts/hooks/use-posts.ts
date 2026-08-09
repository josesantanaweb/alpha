import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostBySlug, type GetPostsParams } from "@/lib/api/posts";
import type { Post } from "@prisma/client";
import type { PostsPageResult } from "@/lib/api/posts";

export const usePosts = (params: GetPostsParams = {}) => {
  return useQuery<PostsPageResult>({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
  });
};

export const usePost = (slug: string) => {
  return useQuery<Post>({
    queryKey: ["posts", "slug", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  });
};
