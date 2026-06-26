"use client";
import type { ReactElement } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { Category } from "@prisma/client";
import { useCategories } from "@/hooks";
import { SearchInput, BestSellers, Designers } from "@/components/common";
import { CategoriesFilter } from "./CategoriesFilter";
import { SliderHome } from "./SliderHome";
import { FindYourVibe } from "./FindYourVibe";

export const Home = (): ReactElement => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const { data: categories = [], isLoading } = useCategories();

  // const debouncedSearchValue = useDebounce(searchValue.trim(), 300);

  return (
    <div className="w-full flex flex-col gap-6 p-5 pb-50 relative">
      <div className="flex items-center justify-between w-full gap-3">
        <SearchInput
          placeholder="Buscar perfumes..."
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <button className="rounded-md cursor-pointer border bg-surface border-stroke w-12 h-12 text-white flex items-center shrink-0 justify-center">
          <SlidersHorizontal size={20} />
        </button>
      </div>
      <SliderHome />
      <CategoriesFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        loading={isLoading}
      />
      <BestSellers />
      <FindYourVibe />
      <Designers />
    </div>
  );
};
