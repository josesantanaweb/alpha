"use client";
import { useState, type ReactElement } from "react";
import { StatBar, type StatBarProps } from "./StatBar";

const LONGEVITIES: StatBarProps[] = [
  { label: "Muy debil", image: "/images/scarce.svg", value: 5, count: 12 },
  { label: "Debil", image: "/images/weak.svg", value: 15, count: 45 },
  { label: "Moderado", image: "/images/moderate.svg", value: 65, count: 210 },
  { label: "Duradera", image: "/images/long.svg", value: 85, count: 430 },
  { label: "Eterna", image: "/images/very-long.svg", value: 30, count: 95 },
];

export const Longevity = (): ReactElement => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Longevidad</h6>
      </div>
      <div className="flex w-full gap-3">
        {LONGEVITIES.map((longevity) => (
          <StatBar 
            key={longevity.label} 
            {...longevity} 
            isActive={activeItem === longevity.label}
            onClick={() => setActiveItem(activeItem === longevity.label ? null : longevity.label)}
          />
        ))}
      </div>
    </div>
  );
};
