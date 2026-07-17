"use client";
import type { ReactElement } from "react";
import { Badge } from "@/modules/shared/components/ui";
import { useAccords } from "@/modules/accords/hooks/use-accords";

export const FilterCategories = (): ReactElement => {
  const { data, isLoading } = useAccords();

  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-lg font-semibold text-white">Categorias</h4>
      <div className="flex items-center gap-2">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-body/20 h-8 w-20 animate-pulse rounded-full"
              />
            ))
          : data
              ?.filter((c) => c.name !== "Nicho")
              .map((c) => (
                <Badge key={c.id} label={c.name} />
              ))}
      </div>
    </div>
  );
};
