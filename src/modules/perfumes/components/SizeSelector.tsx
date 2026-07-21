import Image from "next/image";
import type { ReactElement } from "react";

const SIZES = [
  {
    name: "5ml",
    image: "/images/5ml.png",
  },
  {
    name: "10ml",
    image: "/images/10ml.png",
  },
];

export const SizeSelector = (): ReactElement => (
  <div className="flex flex-col gap-3">
    <h3 className="text-lg font-bold text-white">Escoge la medida</h3>
    <div className="flex items-center gap-3">
      {SIZES.map((size) => (
        <div
          key={size.name}
          className="bg-surface border-stroke flex h-22 w-22 cursor-pointer items-center justify-center rounded-lg border"
        >
          <div className="w-5">
            <Image
              src={size.image || "/images/versache.png"}
              alt={size.name}
              width={200}
              height={200}
              className="w-full h-full object-none"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
