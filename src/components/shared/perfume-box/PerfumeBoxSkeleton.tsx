"use client";
import type { ReactElement } from "react";

export const PerfumeBoxSkeleton = (): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-surface border-stroke skeleton-shimmer relative flex h-45 w-full items-center justify-center rounded-2xl border" />
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <p className="skeleton-shimmer h-3 w-10 rounded-lg" />
            <p className="skeleton-shimmer h-3 w-8 rounded-lg" />
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="skeleton-shimmer h-3 w-14 rounded-lg" />
            <p className="skeleton-shimmer h-3 w-6 rounded-lg" />
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="skeleton-shimmer h-3 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
