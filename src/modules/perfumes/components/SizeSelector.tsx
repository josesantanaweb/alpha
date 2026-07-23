"use client";

import { useMemo, useState } from "react";
import type { ReactElement } from "react";
import type { PerfumeWithRelations } from "../types";
import { SizeOption } from "./SizeOption";

const SIZES = [
  { name: "5ml", image: "/images/5ml.png" },
  { name: "10ml", image: "/images/10ml.png" },
  { name: "100ml", image: null },
];

interface SizeSelectorProps {
  perfume: PerfumeWithRelations;
}

export const SizeSelector = ({ perfume }: SizeSelectorProps): ReactElement => {
  const [selectedSize, setSelectedSize] = useState("5ml");

  const sizes = useMemo(
    () =>
      SIZES.map((size) => ({
        ...size,
        image: size.name === "100ml" ? perfume.image : size.image,
      })),
    [perfume.image]
  );

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-white">Escoge la medida</h3>
      <div className="flex items-center gap-3">
        {sizes.map((size) => (
          <SizeOption
            key={size.name}
            name={size.name}
            image={size.image}
            isSelected={selectedSize === size.name}
            onClick={() => setSelectedSize(size.name)}
          />
        ))}
      </div>
    </div>
  );
};