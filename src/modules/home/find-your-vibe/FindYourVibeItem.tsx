"use client";
import type { ReactElement } from "react";
import Image from "next/image";

interface FindYourVibeItemProps {
  description?: string | null;
  name: string;
  image?: string | null;
}

export const FindYourVibeItem = ({
  name,
  description,
  image,
}: FindYourVibeItemProps): ReactElement => (
  <div className="bg-surface relative h-81.5 w-64 shrink-0 overflow-hidden rounded-2xl">
    {image && (
      <Image
        src={image}
        alt={name}
        width={500}
        height={500}
        className="h-full w-full object-cover"
      />
    )}
    <div className="absolute top-0 left-0 z-50 flex h-full w-full items-end bg-linear-to-t from-neutral-900 to-transparent p-5">
      <div className="flex flex-col">
        <h4 className="text-lg font-bold text-white">{name}</h4>
        {description && (
          <p className="text-body text-base">{description}</p>
        )}
      </div>
    </div>
  </div>
);
