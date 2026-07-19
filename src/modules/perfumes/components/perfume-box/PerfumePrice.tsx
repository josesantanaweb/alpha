"use client";

import type { ReactElement } from "react";

interface PerfumePriceProps {
  price: number;
  discount?: number | null;
}

export const PerfumePrice = ({
  price,
  discount,
}: PerfumePriceProps): ReactElement => {
  if (discount) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-body text-lg line-through">${Number(price)}</p>
        <p className="text-lg font-bold text-white">
          ${Number(price) - Number(discount)}
        </p>
      </div>
    );
  }

  return <p className="text-lg font-bold text-white">${Number(price)}</p>;
};
