"use client";
import type { ReactElement } from "react";

export const PostCardSkeleton = (): ReactElement => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-stroke animate-pulse">
      <div className="w-full h-48 bg-surface" />
      <div className="flex flex-col gap-2 p-5">
        <div className="h-4 w-3/4 rounded bg-surface" />
        <div className="h-3 w-1/4 rounded bg-surface" />
        <div className="h-3 w-full rounded bg-surface" />
        <div className="h-3 w-5/6 rounded bg-surface" />
      </div>
    </div>
  );
};
