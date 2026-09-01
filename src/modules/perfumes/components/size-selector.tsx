"use client";

import { useMemo, type ReactElement } from "react";
import { BOTTLE_ML } from "@/constants";
import type { PerfumeWithRelations } from "../types";
import { SizeOption } from "./size-option";

export interface PerfumeSize {
  key: string;
  ml: number;
  price: number;
  image: string | null;
  decantId?: string;
}

interface SizeSelectorProps {
  perfume: PerfumeWithRelations;
  value: number;
  onChange: (ml: number) => void;
}

export const SizeSelector = ({
  perfume,
  value,
  onChange,
}: SizeSelectorProps): ReactElement => {
  const sizes = useMemo<PerfumeSize[]>(() => {
    const decants = perfume.decants ?? [];

    const decantSizes: PerfumeSize[] = decants.map((decant) => ({
      key: `${decant.ml}ml`,
      ml: decant.ml,
      price: Number(decant.price),
      image: decant.image ?? perfume.image,
      decantId: decant.id,
    }));

    const bottle: PerfumeSize = {
      key: `${BOTTLE_ML}ml`,
      ml: BOTTLE_ML,
      price: Number(perfume.price),
      image: perfume.image,
    };

    return [...decantSizes, bottle];
  }, [
    perfume.decants,
    perfume.image,
    perfume.price,
    perfume.remainingMl,
    perfume.stock,
  ]);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-white">Escoge la medida</h3>
      <div className="flex items-center gap-3">
        {sizes.map((size) => (
          <SizeOption
            key={size.key}
            name={`${size.ml}ml`}
            image={size.image}
            isSelected={value === size.ml}
            onClick={() => onChange(size.ml)}
          />
        ))}
      </div>
    </div>
  );
};
