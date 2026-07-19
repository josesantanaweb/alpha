"use client";
import type { ReactElement } from "react";
import { Input, Slider } from "@/modules/shared/components/ui";

interface FilterPriceProps {
  min: string;
  max: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
}

const MIN_PRICE = 0;
const MAX_PRICE = 500;

export const FilterPrice = ({
  min,
  max,
  onMinChange,
  onMaxChange,
}: FilterPriceProps): ReactElement => {
  const minVal = Math.max(Number(min) || MIN_PRICE, MIN_PRICE);
  const maxVal = Math.min(Number(max) || MAX_PRICE, MAX_PRICE);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-base font-semibold text-white">Precio</h4>

      <Slider
        min={MIN_PRICE}
        max={MAX_PRICE}
        minValue={minVal}
        maxValue={maxVal}
        onMinChange={(v) => onMinChange(String(v))}
        onMaxChange={(v) => onMaxChange(String(v))}
      />

      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="price-min" className="text-xs font-semibold text-white">
            Minimo
          </label>
          <Input
            id="price-min"
            placeholder="Mín."
            type="number"
            value={min}
            onChange={(e) => onMinChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="price-max" className="text-xs font-semibold text-white">
            Maximo
          </label>
          <Input
            id="price-max"
            placeholder="Máx."
            type="number"
            value={max}
            onChange={(e) => onMaxChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
