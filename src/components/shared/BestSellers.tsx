"use client";
import { useState } from "react";
import type { ReactElement } from "react";
import { PerfumeBox } from "@/components/common";

const PERFUMES = [
  {
    id: "1",
    name: "Le Beau Le",
    price: 29.99,
    rating: 4.8,
    discount: 10,
    image: "/images/Le Beau Le.png",
  },
  {
    id: "2",
    name: "Uomo Born in Roma Intense",
    price: 12.99,
    rating: 4.8,
    discount: null,
    image: "/images/Uomo Born in Roma Intense.png",
  },
  {
    id: "3",
    name: "Le Male Le",
    price: 142.99,
    rating: 4.8,
    discount: null,
    image: "/images/Le Male Le.png",
  },
  {
    id: "4",
    name: "Sauvage",
    price: 142.99,
    rating: 4.8,
    discount: null,
    image: "/images/Sauvage.png",
  },
];

export const BestSellers = (): ReactElement => {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = (id: string): void => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">Mas vendidos</h5>
        <p className="text-body cursor-pointer text-sm">Ver todos</p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {PERFUMES.map((perfume) => (
          <PerfumeBox
            key={perfume.id}
            name={perfume.name}
            price={perfume.price}
            rating={perfume.rating}
            discount={perfume.discount}
            image={perfume.image}
            liked={likedIds.has(perfume.id)}
            onLikeToggle={() => toggleLike(perfume.id)}
          />
        ))}
      </div>
    </div>
  );
};
