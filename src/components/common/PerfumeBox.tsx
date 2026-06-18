"use client";
import type { ReactElement } from "react";
import { Star, Heart } from "lucide-react";
import Image from "next/image";

interface PerfumeBoxProps {
  name: string;
  price: number;
  rating: number;
  discount?: string | null;
  image: string;
}

export const PerfumeBox = ({ name, price, rating, discount, image }: PerfumeBoxProps): ReactElement => {
  return (
    <div className="bg-surface border-stroke relative w-full rounded-2xl border p-3">
      <div className="absolute top-0 left-0 flex w-full items-center justify-between p-3">
        {discount && <p className="text-sm text-yellow-500">{discount}</p>}
        <Heart size={20} className="cursor-pointer text-white" />
      </div>
      <div className="flex w-full justify-center">
        <div className="relative w-18.5 h-24 overflow-hidden">
          <Image src={image} alt="perfume" fill className="w-full object-contain" />
        </div>
      </div>
      <div className="flex flex-col">
        <h4 className="text-base font-bold text-white truncate">{name}</h4>
        <div className="flex items-center gap-1">
          <Star size={16} fill="currentColor" className="text-yellow-500" />
          <p className="text-base text-white">{rating}</p>
        </div>
        <p className="text-sm font-bold text-white">${price}</p>
      </div>
    </div>
  );
};
