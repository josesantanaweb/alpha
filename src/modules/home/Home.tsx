"use client";
import type { ReactElement } from "react";

import { useState } from "react";
import { useBanners } from "@/hooks";
// import { useDebounce } from "@/hooks";
import {
  SearchInput,
  BestSellers,
  DesignerMarquee,
  GenderCards,
  TrustBadges,
  FilterButton,
} from "@/components/shared";
import { usePerfumes } from "@/hooks";
import { SliderHome } from "./slider-home";
import { FindYourVibe } from "./find-your-vibe";
import { NewPerfumes } from "./new-perfumes";
import { AuraPlus } from "./aura-plus";

export const Home = (): ReactElement => {
  const [searchValue, setSearchValue] = useState("");
  const { data: banners = [], isLoading: bannersLoading } = useBanners();
  const { data: perfumes = [], isLoading } = usePerfumes({ limit: 50 });
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = (id: string): void => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // const debouncedSearchValue = useDebounce(searchValue.trim(), 300);

  return (
    <div className="relative flex w-full flex-col gap-6 p-5 pb-25">
      <div className="flex w-full items-center justify-between gap-3">
        <SearchInput
          placeholder="Buscar perfumes..."
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <FilterButton />
      </div>
      <SliderHome banners={banners} loading={bannersLoading} />
      <DesignerMarquee />
      <GenderCards />
      <TrustBadges />
      <BestSellers perfumes={perfumes} isLoading={isLoading} />
      <FindYourVibe />
      <AuraPlus />
      <NewPerfumes
        perfumes={perfumes}
        likedIds={likedIds}
        onLikeToggle={toggleLike}
      />
    </div>
  );
};
