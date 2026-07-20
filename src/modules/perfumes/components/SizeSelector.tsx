import Image from "next/image";
import type { ReactElement } from "react";

interface SizeSelectorProps {
  image: string | null;
  name: string;
}

const sizes = [1, 2, 3];

export const SizeSelector = ({
  image,
  name,
}: SizeSelectorProps): ReactElement => (
  <div className="flex flex-col gap-3">
    <h3 className="text-lg font-bold text-white">Escoge la medida</h3>
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <div
          key={size}
          className="bg-surface border-stroke flex h-22 w-22 cursor-pointer items-center justify-center rounded-lg border"
        >
          <Image
            src={image || "/images/versache.png"}
            alt={name}
            width={200}
            height={200}
            className="w-8 object-cover"
          />
        </div>
      ))}
    </div>
  </div>
);