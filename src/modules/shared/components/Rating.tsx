"use client";
import type { ReactElement } from "react";
import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps): ReactElement => {
  const normalizedRating = Number.isFinite(rating) ? rating : 0;
  const formattedRating = normalizedRating.toFixed(1);

  return (
    <div className="text-foreground flex items-center gap-1 text-sm font-medium">
      <Star
        size={14}
        fill="currentColor"
        className="text-yellow-500"
      />
      <span>{formattedRating}</span>
    </div>
  );
};
