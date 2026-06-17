"use client";
import type { ReactElement } from "react";
import { useState } from "react";
import type { Category } from "@/types";
import { CategoriesFilter } from "./CategoriesFilter";

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
];

export const Home = (): ReactElement => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  // const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <CategoriesFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        loading={false}
      />
    </div>
  );
};
