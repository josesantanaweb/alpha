"use client";
import type { ReactElement } from "react";
import Image from "next/image";
import { ASSETS } from "@/constants";

const VIPES = [
  {
    id: "1",
    name: "Top Noche",
    description: "Fragancias intensas",
    image: ASSETS.IMAGES.NIGHT,
  },
  {
    id: "2",
    name: "Top Sexy",
    description: "Seducción a corta distancia",
    image: ASSETS.IMAGES.SEXY,
  },
];

export const FindYourVibe = (): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-start">
        <h5 className="text-lg font-semibold text-white">Encuentra tu vibra</h5>
        <p className="text-body text-sm">
          Las mejores selecciones para cada momento
        </p>
      </div>
      <div className="flex max-w-full gap-5 overflow-x-scroll pr-10">
        {VIPES.map((vipe) => (
          <div
            className="bg-surface relative h-81.5 w-64 shrink-0 overflow-hidden rounded-2xl"
            key={vipe.id}
          >
            <Image
              src={vipe.image}
              alt={vipe.name}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />

            <div className="absolute top-0 left-0 z-50 flex h-full w-full items-end bg-linear-to-t from-neutral-900 to-transparent p-5">
              <div className="flex flex-col">
                <h4 className="text-lg font-bold text-white">{vipe.name}</h4>
                <p className="text-body text-base">{vipe.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
