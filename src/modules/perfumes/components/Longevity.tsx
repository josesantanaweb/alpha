"use client";
import type { ReactElement } from "react";
import Image from "next/image";

interface Longevity {
  label: string;
  image: string;
  value: number;
  count: string;
}

const LONGEVITIES: Longevity[] = [
  { label: "Muy debil", image: "/images/scarce.svg", value: 0, count: "0" },
  { label: "Debil", image: "/images/weak.svg", value: 10, count: "10" },
  { label: "Moderado", image: "/images/moderate.svg", value: 20, count: "20" },
  { label: "Duradera", image: "/images/long.svg", value: 30, count: "30" },
  { label: "Eterna", image: "/images/very-long.svg", value: 50, count: "50" },
];

export const Longevity = (): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Longevidad</h6>
      </div>
      <div className="flex w-full flex-wrap gap-3">
        {LONGEVITIES.map((longevity) => (
          <div
            key={longevity.label}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-10 w-10">
              <Image
                src={longevity.image}
                alt={longevity.label}
                width={200}
                height={200}
                className="h-full w-full object-scale-down"
              />
            </div>
            <p className="text-xs text-white">{longevity.label}</p>
            <div className="bg-surface border-stroke relative h-2.5 w-17.5 overflow-hidden rounded-xs">
              <span
                className="bg-white block h-full"
                style={{ width: `${longevity.value}%` }}
              />
            </div>
            <p className="text-xs text-white">{longevity.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
