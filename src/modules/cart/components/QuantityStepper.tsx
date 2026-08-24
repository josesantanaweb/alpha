"use client";

import type { ReactElement } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  id: string;
  quantity: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export const QuantityStepper = ({
  id,
  quantity,
  onIncrease,
  onDecrease,
}: QuantityStepperProps): ReactElement => (
  <div className="border-stroke bg-surface flex w-[120px] items-center justify-between rounded-lg border">
    <button
      className="cursor-pointer px-3 py-2 text-white transition-colors"
      onClick={() => onDecrease(id)}
      type="button"
      aria-label="Disminuir cantidad"
    >
      <Minus size={18} />
    </button>
    <span className="px-3 text-white">{quantity}</span>
    <button
      className="cursor-pointer px-3 py-2 text-white transition-colors"
      onClick={() => onIncrease(id)}
      type="button"
      aria-label="Aumentar cantidad"
    >
      <Plus size={18} />
    </button>
  </div>
);
