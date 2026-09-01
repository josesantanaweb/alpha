"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { FilterButton, SearchInput } from "@/modules/shared/components";
import { useBanners } from "@/modules/banners/hooks/use-banners";
import { useFavorites } from "@/modules/favorites/hooks/use-favorites";
import {
  BestSellers,
  DesignerMarquee,
  GenderCards,
  TrustBadges,
} from "@/modules/perfumes/components";
import { usePerfumes } from "@/modules/perfumes/hooks/use-perfume-query";
import { FindYourVibe } from "./find-your-vibe";
import { NewPerfumes } from "./new-perfumes";
import { SliderHome } from "./slider-home";
import { AuraPlus } from "./aura-plus";
import { Blog } from "./blog";

export const Home = (): ReactElement => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { data: banners = [], isLoading: bannersLoading } = useBanners();
  const { data: perfumes = [], isLoading } = usePerfumes({ limit: 50 });
  const { ids: likedIds, toggle: toggleLike } = useFavorites();

  const handleSearch = (value: string) => {
    const query = value.trim();
    if (query) {
      router.push(`${ROUTES.EXPLORER}?search=${encodeURIComponent(query)}`);
    }
  };

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
      <SliderHome banners={banners} loading={bannersLoading} />
      <DesignerMarquee />
      <GenderCards />
      <TrustBadges />
      <BestSellers
        perfumes={perfumes}
        isLoading={isLoading}
        likedIds={new Set(likedIds)}
        onLikeToggle={toggleLike}
      />
      <FindYourVibe />
      <AuraPlus />
      <Blog />
      <NewPerfumes
        perfumes={perfumes}
        likedIds={new Set(likedIds)}
        onLikeToggle={toggleLike}
        isLoading={isLoading}
      />
    </div>
  );
};
