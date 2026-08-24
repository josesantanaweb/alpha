"use client";

import type { ReactElement } from "react";
import { CollapsibleSection } from "@/modules/shared/components";
import { useReviews } from "../hooks";
import {
  AddReviewForm,
  RatingAverage,
  RatingAverageSkeleton,
  RatingBreakdown,
  RatingBreakdownSkeleton,
  ReviewCard,
  ReviewCardSkeleton,
} from "./";

interface RatingSummaryProps {
  perfumeId: string;
  rating?: number;
  reviewCount?: number;
  defaultOpen?: boolean;
}

export const RatingSummary = ({
  perfumeId,
  rating = 4.3,
  reviewCount = 400,
  defaultOpen = true,
}: RatingSummaryProps): ReactElement => {
  const { data, isLoading } = useReviews({ perfumeId, limit: 10 });
  const reviews = data?.data || [];
  const distribution = data?.distribution;

  return (
    <CollapsibleSection
      title={`Reseñas (${reviewCount})`}
      defaultOpen={defaultOpen}
    >
      <div className="flex w-full flex-col items-center gap-6">
        {isLoading && (
          <div className="flex w-full items-center gap-6">
            <RatingAverageSkeleton />
            <RatingBreakdownSkeleton />
          </div>
        )}

        {!isLoading && (
          <div className="flex w-full items-center gap-6">
            <RatingAverage rating={rating} reviewCount={reviewCount} />
            <RatingBreakdown distribution={distribution} />
          </div>
        )}

        <div className="flex w-full flex-col">
          {isLoading && (
            <>
              <ReviewCardSkeleton />
              <ReviewCardSkeleton />
              <ReviewCardSkeleton />
            </>
          )}

          {!isLoading && reviews.length > 0 && reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {!isLoading && reviews.length === 0 && (
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
