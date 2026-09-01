"use client";

import type { ReactElement } from "react";

const CategoryFilterSkeleton = (): ReactElement => (
  <div className="flex flex-col items-center justify-center gap-2">
    <span className="skeleton-shimmer flex h-12 w-12 shrink-0 rounded-full" />
    <span className="skeleton-shimmer h-3 w-12 rounded-lg" />
  </div>
);

export const CategoriesFilterSkeleton = (): ReactElement => (
  <div className="flex w-full items-center justify-between gap-3">
    {Array.from({ length: 4 }).map((_, index) => (
      <CategoryFilterSkeleton key={index} />
    ))}
  </div>
);
