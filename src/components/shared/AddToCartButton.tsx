"use client";
import type { ReactElement } from "react";
import { Plus } from "lucide-react";

interface AddToCartButtonProps {
  onAddToCart: () => void;
}

export const AddToCartButton = ({
  onAddToCart
}: AddToCartButtonProps): ReactElement => {
  return (
    <button onClick={onAddToCart} className="text-white flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-stroke">
      <Plus size={16} />
    </button>
  );
};
