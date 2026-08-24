"use client";

import type { ReactElement } from "react";
import Image from "next/image";

const DESIGNERS = [
  "laffata",
  "chhc",
  "jean-paul-gaultier",
  "versace",
  "laffata",
  "chhc",
];

export const Designers = (): ReactElement => {
  return (
    <div className="justify-betwee absolute bottom-22 left-0 flex w-full items-center">
      {DESIGNERS.map((designer, index) => (
        <div
          className="relative h-6 w-full overflow-hidden"
          key={designer + index}
        >
          <Image
            src={`/images/${designer}.png`}
            alt={designer}
            fill
            className="w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};
