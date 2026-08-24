"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { FilterButton, SearchInput } from "@/modules/shared/components";
import { useFavorites } from "@/modules/favorites/hooks/use-favorites";
import { PerfumeGrid } from "@/modules/perfumes/components/PerfumeGrid";
import { usePerfumes } from "@/modules/perfumes/hooks/use-perfume-query";

interface ExplorerProps {
  search?: string;
  tag?: string;
  gender?: string;
  accord?: string;
  designer?: string;
  type?: string;
  priceMin?: string;
  priceMax?: string;
}

export const Explorer = ({
  search,
  tag,
  gender,
  accord,
  designer,
  type,
  priceMin,
  priceMax,
}: ExplorerProps): ReactElement => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(search ?? "");
  const { ids: likedIds, toggle: toggleLike } = useFavorites();

  const handleSearch = (value: string) => {
    const query = value.trim();
    const params = new URLSearchParams();

    if (query) {
      params.set("search", query);
    }

    if (tag) {
      params.set("tag", tag);
    }

    if (gender) {
      params.set("gender", gender);
    }

    if (accord) {
      params.set("accord", accord);
    }

    if (designer) {
      params.set("designer", designer);
    }

    if (type) {
      params.set("type", type);
    }

    if (priceMin) {
      params.set("priceMin", priceMin);
    }

    if (priceMax) {
      params.set("priceMax", priceMax);
    }

    const queryString = params.toString();
    router.push(queryString ? `/explorer?${queryString}` : "/explorer");
  };

  const { data: perfumes = [], isLoading } = usePerfumes({
    search,
    tag,
    gender,
    accord,
    designer,
    type,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : undefined,
    limit: 50,
  });

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
          <h5 className="text-lg font-semibold text-white">
            {search ? `Resultados para "${search}"` : "Explorar"}
          </h5>
          <p className="text-body cursor-pointer text-sm">
            {perfumes.length} perfumes
          </p>
        </div>
        <PerfumeGrid
          perfumes={perfumes}
          isLoading={isLoading}
          likedIds={new Set(likedIds)}
          onLikeToggle={toggleLike}
        />
      </div>
    </div>
  );
};
