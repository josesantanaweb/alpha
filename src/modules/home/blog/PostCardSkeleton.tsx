"use client";

import type { ReactElement } from "react";

export const PostCardSkeleton = (): ReactElement => {
  return (
    <div className="border-stroke relative animate-pulse overflow-hidden rounded-lg border">
      <div className="bg-surface h-48 w-full" />
      <div className="flex flex-col gap-2 p-5">
        <div className="bg-surface h-4 w-3/4 rounded" />
        <div className="bg-surface h-3 w-1/4 rounded" />
        <div className="bg-surface h-3 w-full rounded" />
        <div className="bg-surface h-3 w-5/6 rounded" />
      </div>
    </div>
  );
};
