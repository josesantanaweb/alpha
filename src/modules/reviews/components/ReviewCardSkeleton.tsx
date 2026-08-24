import type { ReactElement } from "react";

export const ReviewCardSkeleton = (): ReactElement => (
  <div className="border-stroke flex w-full flex-col gap-3 border-b py-3">
    <div className="flex w-full items-center gap-3">
      <span className="skeleton-shimmer bg-surface h-12 w-12 shrink-0 rounded-full" />
      <div className="flex w-full flex-col gap-2">
        <div className="skeleton-shimmer bg-surface h-3 w-20 rounded-full" />
        <div className="skeleton-shimmer bg-surface h-3 w-40 rounded-full" />
      </div>
    </div>
    <div className="flex flex-col gap-3 pl-14">
      <div className="flex flex-col gap-2">
        <div className="skeleton-shimmer bg-surface h-3 w-full rounded-full" />
        <div className="skeleton-shimmer bg-surface h-3 w-full rounded-full" />
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-shimmer bg-surface h-4 w-4 rounded-full" />
        ))}
      </div>
    </div>
  </div>
);