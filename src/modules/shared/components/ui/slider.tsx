"use client";

import { useCallback, type ReactElement } from "react";

interface SliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (v: number) => void;
  onMaxChange: (v: number) => void;
}

export const Slider = ({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: SliderProps): ReactElement => {
  const handleMinSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onMinChange(Math.min(Number(e.target.value), maxValue - 1));
    },
    [maxValue, onMinChange]
  );

  const handleMaxSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onMaxChange(Math.max(Number(e.target.value), minValue + 1));
    },
    [minValue, onMaxChange]
  );

  const rangePercent = ((maxValue - minValue) / (max - min)) * 100;
  const leftPercent = ((minValue - min) / (max - min)) * 100;

  return (
    <div className="relative h-6">
      <div className="bg-stroke absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full" />
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-white"
        style={{ left: `${leftPercent}%`, width: `${rangePercent}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={handleMinSlider}
        className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={handleMaxSlider}
        className="[&::-moz-range-thumb]:shadow-md] pointer-events-none absolute top-0 left-0 h-full w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
      />
    </div>
  );
};
