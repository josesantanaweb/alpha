'use client';
import type { ReactElement } from 'react';
import { CategoryButton } from '@/components/shared';
import type { Category } from '@prisma/client';
import { CategoriesFilterSkeleton } from './CategoriesFilterSkeleton';

type CategoryFilterItem = Pick<Category, 'id' | 'name'> & {
  icon?: string | null;
};

interface CategoriesFilterProps {
  categories: CategoryFilterItem[];
  loading: boolean;
}

export const CategoriesFilter = ({ categories, loading }: CategoriesFilterProps): ReactElement => {

  return (
    <div className="flex items-center gap-8 max-w-md overflow-x-auto scrollbar-hide">
      <CategoryButton
        key="all"
        text="Todos"
      />

      {loading && (
        <CategoriesFilterSkeleton />
      )}

      {!loading && categories.map((category) => (
        <CategoryButton
          key={category.id}
          text={category.name}
          icon={category.icon ?? undefined}
        />
      ))}
    </div>
  );
};
