"use client";
import { useState, type ReactElement } from "react";
import { StatBar, type StatBarProps } from "./StatBar";

const RANKINGS: StatBarProps[] = [
  { label: "La odio", image: "/images/hate.svg", value: 5, count: 10 },
  { label: "No me gusta", image: "/images/dont-like.svg", value: 10, count: 25 },
  { label: "Irrelevante", image: "/images/indifferent.svg", value: 25, count: 80 },
  {
    label: "Me gusta",
    image: "/images/like.svg",
    value: 70,
    count: 350,
  },
  { label: "Me encanta", image: "/images/love.svg", value: 90, count: 520 },
];

export const Ranking = (): ReactElement => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Puntuación</h6>
      </div>
      <div className="flex w-full flex-wrap gap-3">
        {RANKINGS.map((ranking) => (
          <StatBar 
            key={ranking.label} 
            {...ranking} 
            isActive={activeItem === ranking.label}
            onClick={() => setActiveItem(activeItem === ranking.label ? null : ranking.label)}
          />
        ))}
      </div>
    </div>
  );
};
