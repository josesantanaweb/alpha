import type { ReactElement } from "react";
import { Star } from "lucide-react";

interface RatingAverageProps {
  rating?: number;
  reviewCount?: number;
}

export const RatingAverage = ({
  rating = 4.3,
  reviewCount = 400,
}: RatingAverageProps): ReactElement => {
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <h3 className="text-2xl font-semibold">{rating.toFixed(1)}</h3>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="text-yellow-500"
            size={14}
            fill="currentColor"
          />
        ))}
      </div>
      <p className="text-body text-sm">{reviewCount} Reseñas</p>
    </div>
  );
};
