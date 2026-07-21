"use client";
import { useState, type ReactElement } from "react";
import { StatBar, type StatBarProps } from "./StatBar";

const USAGES: StatBarProps[] = [
  { label: "Invierno", image: "/images/winter.svg", value: 85, count: 410 },
  { label: "Verano", image: "/images/summer.svg", value: 20, count: 90 },
  { label: "Dia", image: "/images/day.svg", value: 45, count: 180 },
  { label: "Noche", image: "/images/night.svg", value: 90, count: 480 },
];

export const WhenToUse = (): ReactElement => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Cuando usarlo</h6>
      </div>
      <div className="flex w-full gap-6">
        {USAGES.map((usage) => (
          <StatBar 
            key={usage.label} 
            {...usage} 
            isActive={activeItem === usage.label}
            onClick={() => setActiveItem(activeItem === usage.label ? null : usage.label)}
          />
        ))}
      </div>
    </div>
  );
};
