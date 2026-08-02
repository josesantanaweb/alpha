"use client";
import type { ReactElement } from "react";

export const PerfumeBoxSkeleton = (): ReactElement => {
  return (
    <div className="flex flex-col gap-3 shrink-0 min-w-45" aria-hidden="true">
      <div className="bg-surface border-stroke relative flex h-45 w-full items-center justify-center rounded-2xl border p-3 skeleton-shimmer" />
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="skeleton-shimmer h-3 w-24 rounded-lg" />
            <div className="skeleton-shimmer h-3 w-12 rounded-lg" />
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="skeleton-shimmer h-3 w-20 rounded-lg" />
            <div className="skeleton-shimmer h-3 w-10 rounded-lg" />
          </div>
          <div className="skeleton-shimmer h-3 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
