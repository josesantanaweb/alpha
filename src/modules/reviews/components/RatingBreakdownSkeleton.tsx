import type { ReactElement } from "react";

export const RatingBreakdownSkeleton = (): ReactElement => (
  <div className="flex w-full flex-col gap-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex w-full items-center gap-3">
        <div className="skeleton-shimmer bg-surface flex h-4 w-4 rounded-full" />
        <div className="skeleton-shimmer bg-surface flex h-3 w-full items-center rounded-full" />
      </div>
    ))}
  </div>
);