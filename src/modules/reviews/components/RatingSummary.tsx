"use client";

import type { ReactElement } from "react";
import { CollapsibleSection } from "@/modules/shared/components";
import { AddReviewForm } from "./AddReviewForm";
import { RatingAverage } from "./RatingAverage";
import { RatingBreakdown } from "./RatingBreakdown";
import { ReviewCard } from "./ReviewCard";
import { useReviews } from "../hooks";

interface RatingSummaryProps {
  perfumeId: string;
  rating?: number;
  reviewCount?: number;
  distribution?: Record<number, number>;
  defaultOpen?: boolean;
}

export const RatingSummary = ({
  perfumeId,
  rating = 4.3,
  reviewCount = 400,
  distribution,
  defaultOpen = true,
}: RatingSummaryProps): ReactElement => {
  const { data, isLoading } = useReviews({ perfumeId, limit: 10 });
  const reviews = data?.data || [];

  return (
    <CollapsibleSection
      title={`Reseñas (${reviewCount})`}
      defaultOpen={defaultOpen}
    >
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full items-center gap-6">
          <RatingAverage rating={rating} reviewCount={reviewCount} />
          <RatingBreakdown distribution={distribution} />
        </div>

        <div className="flex w-full flex-col">
          {isLoading ? (
            <p className="py-4 text-center text-sm text-white">
              Cargando reseñas...
            </p>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <p className="py-4 text-center text-sm text-white">
              No hay reseñas aún. Sé el primero en opinar.
            </p>
          )}
        </div>

        <AddReviewForm />
      </div>
    </CollapsibleSection>
  );
};
