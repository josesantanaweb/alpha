'use client';
import type { ReactElement } from 'react';
import { CategoryButton } from '@/components/common';
import type { Category } from '@prisma/client';
import { CategoriesFilterSkeleton } from './skeletons/CategoriesFilterSkeleton';

interface CategoriesFilterProps {
  categories: Category[];
  activeCategory: Category | null;
  setActiveCategory: (category: Category | null) => void;
  loading: boolean;
}

export const CategoriesFilter = ({ categories, activeCategory, setActiveCategory, loading }: CategoriesFilterProps): ReactElement => {

  return (
    <div className="flex items-center gap-3 max-w-md overflow-x-auto scrollbar-hide">
      <CategoryButton
        key="all"
        label="Todos"
        active={activeCategory === null}
        onClick={() => setActiveCategory(null)}
      />

      {loading && (
        <CategoriesFilterSkeleton />
      )}

      {!loading && categories.map((category) => (
        <CategoryButton
          key={category.id}
          label={category.name}
          active={activeCategory?.id === category.id}
          onClick={() => setActiveCategory(category)}
        />
      ))}
    </div>
  );
};
