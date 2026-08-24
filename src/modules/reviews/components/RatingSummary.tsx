"use client";

import { useState, type ReactElement } from "react";
import { CollapsibleSection } from "@/modules/shared/components";
import { useAuth } from "@/modules/auth/store";
import { useReviews } from "../hooks";
import {
  ReviewForm,
  RatingAverage,
  RatingAverageSkeleton,
  RatingBreakdown,
  RatingBreakdownSkeleton,
  ReviewCard,
  ReviewCardSkeleton,
} from "./";
import type { ReviewWithUser } from "../types";

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
  const user = useAuth((s) => s.user);
  const { data, isLoading } = useReviews({ perfumeId, limit: 10 });
  const [editingReview, setEditingReview] = useState<ReviewWithUser | null>(
    null
  );
  const reviews = data?.data || [];
  const distribution = data?.distribution;
  const userReview = data?.userReview;
  const hasReview = !!userReview;

  const handleEdit = (review: ReviewWithUser) => {
    setEditingReview(review);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  const handleSuccess = () => {
    setEditingReview(null);
  };

  const formReview = editingReview ?? undefined;

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

          {!isLoading &&
            reviews.length > 0 &&
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isOwner={user?.id === review.userId}
                onEdit={handleEdit}
              />
            ))}
          {!isLoading && reviews.length === 0 && (
            <p className="py-4 text-center text-sm text-white">
              No hay reseñas aún. Sé el primero en opinar.
            </p>
          )}
        </div>

        {(!hasReview || editingReview) && (
          <ReviewForm
            perfumeId={perfumeId}
            review={formReview}
            onCancel={editingReview ? handleCancelEdit : undefined}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </CollapsibleSection>
  );
};
