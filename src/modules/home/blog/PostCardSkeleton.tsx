"use client";
import type { ReactElement } from "react";

export const PostCardSkeleton = (): ReactElement => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-surface border border-stroke animate-pulse">
      <div className="w-full h-48 bg-white/5" />
      <div className="flex flex-col gap-2 p-5">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/4 rounded bg-white/5" />
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-5/6 rounded bg-white/5" />
        <div className="mt-3 h-3 w-16 rounded bg-white/10" />
      </div>
    </div>
  );
};
