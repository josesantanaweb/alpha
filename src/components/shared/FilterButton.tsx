"use client";
import type { ReactElement } from "react";
import { SlidersHorizontal } from "lucide-react";

export const FilterButton = (): ReactElement => {
  return (
    <button className="bg-surface border-stroke flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-md border text-white">
      <SlidersHorizontal size={20} />
    </button>
  );
};
