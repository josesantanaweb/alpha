"use client";

import { ReactElement, useState } from "react";
import {
  EmptyState,
  FilterButton,
  SearchInput,
} from "@/modules/shared/components";
import { useFavorites } from "@/modules/favorites/hooks/use-favorites";
import { PerfumeGrid } from "@/modules/perfumes/components";

export const Favorites = (): ReactElement => {
  const { perfumes, ids, toggle, isLoading } = useFavorites();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {};

  return (
    <div className="relative flex w-full flex-col gap-5 p-5 pb-25">
      <div className="flex w-full items-center justify-between gap-3">
        <SearchInput
          placeholder="Buscar perfumes..."
          value={searchValue}
          onValueChange={setSearchValue}
          onSearch={handleSearch}
        />
        <FilterButton />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h5 className="text-lg font-semibold text-white">Mis favoritos</h5>
          <p className="text-body cursor-pointer text-sm">
            {perfumes.length} perfumes
          </p>
        </div>
        <PerfumeGrid
          perfumes={perfumes}
          isLoading={isLoading}
          likedIds={new Set(ids)}
          onLikeToggle={toggle}
          emptyState={
            <EmptyState
              title="No tienes favoritos"
              subtitle="Los perfumes que marques como favoritos aparecerán aquí."
              showClear={false}
            />
          }
        />
      </div>
    </div>
  );
};
