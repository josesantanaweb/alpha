"use client";
import type { ReactElement } from "react";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FilterSheet } from "@/modules/perfumes/components/filters/FilterSheet";

export const FilterButton = (): ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="bg-surface border-stroke flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-md border text-white"
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal size={20} />
      </button>
      <FilterSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
};
