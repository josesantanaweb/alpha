"use client";
import type { ReactElement } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Category } from "@prisma/client";
// import { useDebounce } from "@/hooks";
import { SearchInput, BestSellers } from "@/components/common";
import { CategoriesFilter } from "./CategoriesFilter";
import { SliderHome } from "./SliderHome";
import { FindYourVibe } from "./FindYourVibe";

const CATEGORIES = [
  {
    id: "1",
    name: "Para el gimnasio",
  },
  {
    id: "2",
    name: "Dia",
  },
  {
    id: "3",
    name: "Noche",
  },
  {
    id: "4",
    name: "Sexual",
  },
];

export const Home = (): ReactElement => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [searchValue, setSearchValue] = useState("");

  // const debouncedSearchValue = useDebounce(searchValue.trim(), 300);

  return (
    <div className="w-full flex flex-col gap-6 p-5 pb-50">
      <div className="flex items-center justify-between w-full gap-3">
        <SearchInput
          placeholder="Buscar perfumes..."
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <button className="rounded-full cursor-pointer border bg-surface border-stroke w-12 h-12 text-white flex items-center shrink-0 justify-center">
          <SlidersHorizontal size={20} />
        </button>
      </div>
      <SliderHome />
      <CategoriesFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        loading={false}
      />
      <BestSellers />
      <FindYourVibe />
    </div>
  );
};
