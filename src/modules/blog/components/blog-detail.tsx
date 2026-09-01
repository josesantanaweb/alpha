"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import { BackButton } from "@/modules/shared/components";
import { formatDate } from "@/modules/shared/utils/format-date";
import { usePost } from "@/modules/blog/hooks/use-posts";

interface BlogDetailProps {
  slug: string;
}

const DetailSkeleton = (): ReactElement => (
  <div className="flex animate-pulse flex-col gap-5">
    <div className="h-56 w-full rounded-xl bg-white/5" />
    <div className="flex flex-col gap-2 px-5">
      <div className="h-6 w-3/4 rounded bg-white/10" />
      <div className="h-3 w-1/4 rounded bg-white/5" />
    </div>
    <div className="flex flex-col gap-2 px-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-3 w-full rounded bg-white/5" />
      ))}
    </div>
  </div>
);

export const BlogDetail = ({ slug }: BlogDetailProps): ReactElement => {
  const { data: post, isLoading, isError } = usePost(slug);

  return (
    <div className="relative flex w-full flex-col pb-25">
      <div className="flex items-center gap-3 p-5">
        <BackButton />
        <h2 className="text-base font-semibold text-white">Artículo</h2>
      </div>

      {isLoading && <DetailSkeleton />}

      {isError && (
        <div className="flex flex-col items-center gap-3 px-5 py-12 text-center">
          <p className="text-body text-sm">No pudimos cargar el artículo.</p>
        </div>
      )}

      {post && (
        <div className="flex flex-col gap-5">
          {post.image && (
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-col gap-4 px-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl leading-snug font-bold text-white">
                {post.title}
              </h1>
              <p className="text-body text-sm italic">
                {formatDate(post.createdAt)}
              </p>
            </div>

            {post.excerpt && (
              <p className="text-body border-l-2 border-white/20 pl-3 text-sm font-medium italic">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-col gap-3">
              {post.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-body text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
