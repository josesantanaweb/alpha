"use client";
import type { ReactElement } from "react";
import { Badge } from "@/components/ui";

const SIZES = [
  { label: "5ml", value: "5" },
  { label: "10ml", value: "10" },
  { label: "100ml", value: "100" },
];

export const FilterSizes = (): ReactElement => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-lg font-semibold text-white">Tamaño</h4>
      <div className="flex items-center gap-2">
        {SIZES.map((s) => (
          <Badge key={s.value} label={s.label} />
        ))}
      </div>
    </div>
  );
};
