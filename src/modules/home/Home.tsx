"use client";
import type { ReactElement } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useBanners } from "@/hooks";
// import { useDebounce } from "@/hooks";
import { SearchInput, BestSellers, DesignerMarquee, GenderCards } from "@/components/shared";
import { SliderHome } from "./slider-home";
// import { FindYourVibe } from "./find-your-vibe";

export const Home = (): ReactElement => {
  const [searchValue, setSearchValue] = useState("");
  const { data: banners = [], isLoading: bannersLoading } = useBanners();

  // const debouncedSearchValue = useDebounce(searchValue.trim(), 300);

  return (
    <div className="relative flex w-full flex-col gap-6 p-5 pb-50">
      <div className="flex w-full items-center justify-between gap-3">
        <SearchInput
          placeholder="Buscar perfumes..."
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <button className="bg-surface border-stroke flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-md border text-white">
          <SlidersHorizontal size={20} />
        </button>
      </div>
      <SliderHome banners={banners} loading={bannersLoading} />
      <DesignerMarquee />
      <GenderCards />
      <BestSellers />
      {/* <FindYourVibe /> */}
    </div>
  );
};
