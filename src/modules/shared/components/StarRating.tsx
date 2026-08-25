"use client";

import type { ReactElement } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  size?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}

export const StarRating = ({
  value,
  size = 14,
  readOnly = true,
  onChange,
}: StarRatingProps): ReactElement => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= value;

        if (readOnly) {
          return (
            <Star
              key={index}
              className="text-yellow-500"
              size={size}
              fill={filled ? "currentColor" : "none"}
            />
          );
        }

        return (
          <button
            key={index}
            type="button"
            aria-label={`Calificar con ${starValue} estrellas`}
            onClick={() => onChange?.(starValue)}
            className="cursor-pointer"
          >
            <Star
              className="text-yellow-500 transition-transform hover:scale-110"
              size={size}
              fill={filled ? "currentColor" : "none"}
            />
          </button>
        );
      })}
    </div>
  );
};