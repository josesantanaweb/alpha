"use client";
import type { ReactElement } from "react";
import Image from "next/image";
import {
  Rating,
  LikeButton,
  Discount,
  AddToCartButton,
} from "@/components/shared";

interface PerfumeBoxProps {
  name: string;
  price: number;
  rating: number;
  discount?: number | null;
  image: string;
  liked: boolean;
  onLikeToggle: () => void;
}

export const PerfumeBox = ({
  name,
  price,
  rating,
  discount,
  image,
  liked,
  onLikeToggle,
}: PerfumeBoxProps): ReactElement => {
  const onAddToCart = () => {
    console.log("add to cart");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-surface border-stroke relative flex w-full h-45 items-center justify-center rounded-2xl border p-3">
        <div className="absolute top-0 left-0 flex w-full items-center justify-between p-3">
          <Discount discount={discount} />
          <LikeButton liked={liked} onToggle={onLikeToggle} />
        </div>
        <div className="flex w-full justify-center">
          <div className="relative h-30 w-28.5 overflow-hidden">
            <Image
              src={image}
              alt="perfume"
              fill
              sizes="(max-width: 640px) 112px, 114px"
              className="w-full object-contain"
            />
          </div>
        </div>
        <div className="absolute right-3 bottom-3">
          <AddToCartButton onAddToCart={onAddToCart} />
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between">
            <p className="text-body text-sm italic">Jean Paul Gaultier</p>
            <p className="text-sm text-white">Hombre</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <h4 className="max-w-27.5 truncate text-sm font-semibold text-white">
              {name}
            </h4>
            <Rating rating={rating} />
          </div>
          <p className="text-base font-bold text-white">${price}</p>
        </div>
      </div>
    </div>
  );
};
