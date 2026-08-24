"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { formatDate } from "@/modules/shared/utils/format-date";
import { usePosts } from "@/modules/posts/hooks/use-posts";
import { PostCard } from "../blog/PostCard";
import { PostCardSkeleton } from "../blog/PostCardSkeleton";

export const Blog = (): ReactElement => {
  const { data, isLoading } = usePosts({ limit: 3 });
  const posts = data?.data ?? [];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">Nuestro Blog</h5>
        <Link href={ROUTES.BLOG} className="text-body cursor-pointer text-sm">
          Ver todos
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)}

        {!isLoading &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              image={post.image ?? ""}
              title={post.title}
              date={formatDate(post.createdAt)}
              excerpt={post.excerpt ?? ""}
              href={`${ROUTES.BLOG}/${post.slug}`}
            />
          ))}
      </div>
    </div>
  );
};
