"use client";
import type { ReactElement } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePerfumes, useFavorites } from "@/hooks";
import {
  SearchInput,
  FilterButton,
  PerfumeGrid,
} from "@/components/shared";

interface ExplorerProps {
  search?: string;
  tag?: string;
  gender?: string;
  categoryId?: string;
  designerId?: string;
}

export const Explorer = ({
  search,
  tag,
  gender,
  categoryId,
  designerId,
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

    if (categoryId) {
      params.set("categoryId", categoryId);
    }

    if (designerId) {
      params.set("designerId", designerId);
    }

    const queryString = params.toString();
    router.push(queryString ? `/explorer?${queryString}` : "/explorer");
  };

  const { data: perfumes = [], isLoading } = usePerfumes({
    search,
    tag,
    gender,
    categoryId,
    designerId,
    limit: 50,
  });

  return (
    <div className="relative flex w-full flex-col gap-6 p-5 pb-25">
      <div className="flex w-full items-center justify-between gap-3">
        <SearchInput
          placeholder="Buscar perfumes..."
          value={searchValue}
          onValueChange={setSearchValue}
          onSearch={handleSearch}
        />
        <FilterButton />
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">{search ? "Resultados" : "Explorar"}</h5>
        <p className="text-body cursor-pointer text-sm">{perfumes.length} perfumes</p>
      </div>
      <PerfumeGrid
        perfumes={perfumes}
        isLoading={isLoading}
        likedIds={new Set(likedIds)}
        onLikeToggle={toggleLike}
      />
    </div>
  );
};
