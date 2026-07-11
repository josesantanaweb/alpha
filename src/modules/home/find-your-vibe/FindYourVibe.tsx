"use client";
import type { ReactElement } from "react";
import { FindYourVibeItem } from "./FindYourVibeItem";

const ITEMS = [
  {
    name: "Para la Noche",
    image: "https://i.ibb.co/WpcGktL2/noche.png",
    description: "Fragancias misteriosas",
  },
  {
    name: "Para Seducir",
    image: "https://i.ibb.co/gZG5srhZ/sexy.png",
    description: "Seducción a corta distancia",
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

      <div className="flex max-w-full gap-5 overflow-x-scroll pr-2.5">
        {ITEMS.map((item) => (
          <FindYourVibeItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};
