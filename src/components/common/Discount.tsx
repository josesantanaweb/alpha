"use client";
import type { ReactElement } from "react";

interface DiscountProps {
  discount?: number | null;
}

export const Discount = ({
  discount
}: DiscountProps): ReactElement => {
  return (
    discount ? (
      <p className="text-sm text-yellow-500">{discount}%</p>
    ) : (
      <div />
    )
  );
};
