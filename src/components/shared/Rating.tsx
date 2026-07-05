"use client";
import type { ReactElement } from "react";
import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps): ReactElement => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < Math.floor(rating) ? "currentColor" : "none"}
          className={i < Math.floor(rating) ? "text-yellow-500" : "text-body"}
        />
      ))}
    </div>
  );
};
