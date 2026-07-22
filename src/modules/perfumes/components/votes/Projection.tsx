"use client";
import { useState, type ReactElement } from "react";
import { StatBar, type StatBarProps } from "./StatBar";

const PROJECTIONS: StatBarProps[] = [
  { label: "Suave", image: "/images/afable.svg", value: 20, count: 65 },
  { label: "Moderado", image: "/images/moderate-2.svg", value: 80, count: 320 },
  { label: "Fuerte", image: "/images/strong.svg", value: 60, count: 190 },
  { label: "Enorme", image: "/images/huge.svg", value: 15, count: 40 },
];

export const Projection = (): ReactElement => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Proyección</h6>
      </div>
      <div className="flex w-full flex-wrap gap-3">
        {PROJECTIONS.map((projection) => (
          <StatBar
            key={projection.label}
            {...projection}
            isActive={activeItem === projection.label}
            onClick={() => setActiveItem(activeItem === projection.label ? null : projection.label)}
          />
        ))}
      </div>
    </div>
  );
};
