"use client";
import type { ReactElement } from "react";
import Image from "next/image";

interface Usage {
  label: string;
  image: string;
  value: number;
  count: string;
}

const USAGES: Usage[] = [
  { label: "Invierno", image: "/images/winter.svg", value: 10, count: "2k" },
  { label: "Verano", image: "/images/summer.svg", value: 10, count: "2k" },
  { label: "Dia", image: "/images/day.svg", value: 10, count: "2k" },
  { label: "Noche", image: "/images/night.svg", value: 10, count: "2k" },
];

export const WhenToUse = (): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Cuando usarlo</h6>
      </div>
      <div className="flex w-full flex-wrap gap-6">
        {USAGES.map((usage) => (
          <div
            key={usage.label}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-10 w-10">
              <Image
                src={usage.image}
                alt={usage.label}
                width={200}
                height={200}
                className="h-full w-full object-scale-down"
              />
            </div>
            <p className="text-xs text-white">{usage.label}</p>
            <div className="bg-surface border-stroke relative h-2.5 w-17.5 overflow-hidden rounded-xs">
              <span
                className="bg-white block h-full"
                style={{ width: `${usage.value}%` }}
              />
            </div>
            <p className="text-xs text-white">{usage.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
