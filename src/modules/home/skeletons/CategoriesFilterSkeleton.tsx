'use client';
import type { ReactElement } from 'react';


const CategoryFilterSkeleton = (): ReactElement => (
  <span className="flex shrink-0 h-12 w-12 px-4 rounded-full skeleton-shimmer" />
);

export const CategoriesFilterSkeleton = (): ReactElement => (
  <div className="flex items-center gap-3">
    {Array.from({ length: 4 }).map((_, index) => (
      <CategoryFilterSkeleton key={index} />
    ))}
  </div>
);
