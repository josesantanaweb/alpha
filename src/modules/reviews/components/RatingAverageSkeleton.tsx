import type { ReactElement } from "react";

export const RatingAverageSkeleton = (): ReactElement => (
  <div className="flex flex-1 flex-col items-center gap-2">
    <div className="skeleton-shimmer bg-surface flex h-4 w-20 rounded-full" />
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="skeleton-shimmer bg-surface flex h-4 w-4 rounded-full"
        />
      ))}
    </div>
    <div className="skeleton-shimmer bg-surface flex h-3 w-20 rounded-full" />
  </div>
);