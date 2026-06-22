"use client";
import type { ReactElement } from "react";
import Image from "next/image";
import { Rating, LikeButton, Discount, AddToCartButton } from "@/components/common";

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
    console.log('add to cart');
  };

  return (
    <div className="bg-surface border-stroke relative w-full rounded-2xl border p-3">
      <div className="absolute top-0 left-0 flex w-full items-center justify-between p-3">
        <Discount discount={discount} />
        <LikeButton liked={liked} onToggle={onLikeToggle} />
      </div>
      <div className="flex w-full justify-center">
        <div className="relative h-26 w-19.5 overflow-hidden">
          <Image
            src={image}
            alt="perfume"
            fill
            className="w-full object-contain"
          />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h4 className="max-w-27.5 truncate text-sm font-medium text-white">
            {name}
          </h4>
          <p className="text-base font-bold text-white">${price}</p>
          <Rating rating={rating} />
        </div>
        <AddToCartButton onAddToCart={onAddToCart} />
      </div>
    </div>
  );
};
