"use client";
import type { ReactElement } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePosts } from "@/modules/posts/hooks/use-posts";
import { PostCard } from "@/modules/home/blog/PostCard";
import { PostCardSkeleton } from "@/modules/home/blog/PostCardSkeleton";
import { SearchInput } from "@/modules/shared/components";
import { ROUTES } from "@/constants";

interface BlogListProps {
  search?: string;
}

export const BlogList = ({ search }: BlogListProps): ReactElement => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(search ?? "");

  const { data, isLoading } = usePosts({ search, limit: 20 });
  const posts = data?.data ?? [];

  const handleSearch = (value: string) => {
    const query = value.trim();
    router.push(query ? `${ROUTES.BLOG}?search=${encodeURIComponent(query)}` : ROUTES.BLOG);
  };

  return (
    <div className="relative flex w-full flex-col gap-5 p-5 pb-25">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">Blog</h1>
        <p className="text-sm text-body">
          Descubre el mundo de la perfumería
        </p>
      </div>

      <SearchInput
        placeholder="Buscar artículos..."
        value={searchValue}
        onValueChange={setSearchValue}
        onSearch={handleSearch}
      />

      {!isLoading && (
        <p className="text-sm text-body">
          {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
          {search ? ` para "${search}"` : ""}
        </p>
      )}

      {isLoading && (
        <div className="flex flex-col gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              image={post.image ?? ""}
              title={post.title}
              date={new Intl.DateTimeFormat("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(post.createdAt))}
              excerpt={post.excerpt ?? ""}
              href={`${ROUTES.BLOG}/${post.slug}`}
            />
          ))}
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-body text-sm">
            {search
              ? `No encontramos artículos para "${search}".`
              : "No hay artículos publicados todavía."}
          </p>
        </div>
      )}
    </div>
  );
};
