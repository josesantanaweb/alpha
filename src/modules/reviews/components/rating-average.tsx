import type { ReactElement } from "react";
import { StarRating } from "@/modules/shared/components";

interface RatingAverageProps {
  rating?: number;
  reviewCount?: number;
}

export const RatingAverage = ({
  rating = 0,
  reviewCount = 0,
}: RatingAverageProps): ReactElement => {
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <h3 className="text-2xl font-semibold">{rating.toFixed(1)}</h3>
<StarRating value={5} size={14} />
      <p className="text-body text-sm">{reviewCount} Reseñas</p>
    </div>
  );
};
