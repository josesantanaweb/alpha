'use client';
import type { ReactElement } from 'react';


const CategoryFilterSkeleton = (): ReactElement => (
  <div className="flex flex-col gap-2 items-center justify-center">
    <span className="flex shrink-0 h-12 w-12 rounded-full skeleton-shimmer" />
    <span className="h-3 w-12 rounded-lg skeleton-shimmer" />
  </div>
);

export const CategoriesFilterSkeleton = (): ReactElement => (
  <div className="flex items-center gap-3 justify-between w-full">
    {Array.from({ length: 4 }).map((_, index) => (
      <CategoryFilterSkeleton key={index} />
    ))}
  </div>
);
