"use client";
import type { ReactElement } from "react";
import Image from "next/image";

interface Projection {
  label: string;
  image: string;
  value: number;
  count: string;
}

const PROJECTIONS: Projection[] = [
  { label: "Suave", image: "/images/afable.svg", value: 0, count: "0" },
  { label: "Moderado", image: "/images/moderate-2.svg", value: 20, count: "20" },
  { label: "Fuerte", image: "/images/strong.svg", value: 30, count: "30" },
  { label: "Enorme", image: "/images/huge.svg", value: 50, count: "50" },
];

export const Projection = (): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Proyección</h6>
      </div>
      <div className="flex w-full flex-wrap gap-3">
        {PROJECTIONS.map((projection) => (
          <div
            key={projection.label}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-10 w-10">
              <Image
                src={projection.image}
                alt={projection.label}
                width={200}
                height={200}
                className="h-full w-full object-scale-down"
              />
            </div>
            <p className="text-xs text-white">{projection.label}</p>
            <div className="bg-surface border-stroke relative h-2.5 w-17.5 overflow-hidden rounded-xs">
              <span
                className="bg-white block h-full"
                style={{ width: `${projection.value}%` }}
              />
            </div>
            <p className="text-xs text-white">{projection.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
