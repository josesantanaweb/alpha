"use client";

import type { ReactElement } from "react";
import type { Accord } from "@prisma/client";
import { CategoryButton } from "@/modules/shared/components/category-button";
import { CategoriesFilterSkeleton } from "./categories-filter-skeleton";

type CategoryFilterItem = Pick<Accord, "id" | "name"> & {
  icon?: string | null;
};

interface CategoriesFilterProps {
  categories: CategoryFilterItem[];
  loading: boolean;
}

export const CategoriesFilter = ({
  categories,
  loading,
}: CategoriesFilterProps): ReactElement => {
  return (
    <div className="scrollbar-hide flex max-w-md items-center gap-8 overflow-x-auto">
      <CategoryButton key="all" text="Todos" />

      {loading && <CategoriesFilterSkeleton />}

      {!loading &&
        categories.map((category) => (
          <CategoryButton
            key={category.id}
            text={category.name}
            icon={category.icon ?? undefined}
          />
        ))}
    </div>
  );
};
