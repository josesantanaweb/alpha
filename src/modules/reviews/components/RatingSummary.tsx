"use client";

import { useState, type ReactElement } from "react";
import { useQueries } from "@tanstack/react-query";
import { PAGINATION_PAGE_SIZE } from "@/constants";
import { getReviews } from "@/lib/api/reviews";
import { CollapsibleSection } from "@/modules/shared/components";
import { Button } from "@/modules/shared/components/ui";
import { useAuth } from "@/modules/auth/store";
import { reviewsKeys } from "../hooks/reviews-keys";
import { ReviewSort, type ReviewWithUser } from "../types";
import {
  RatingAverage,
  RatingAverageSkeleton,
  RatingBreakdown,
  RatingBreakdownSkeleton,
  ReviewCardSkeleton,
  ReviewForm,
  ReviewList,
  ReviewSortMenu,
} from "./";

interface RatingSummaryProps {
  perfumeId: string;
  rating?: number;
  reviewCount?: number;
  defaultOpen?: boolean;
}

export const RatingSummary = ({
  perfumeId,
  rating = 0,
  reviewCount = 0,
  defaultOpen = true,
}: RatingSummaryProps): ReactElement => {
  const user = useAuth((s) => s.user);
  const [fetchedOffsets, setFetchedOffsets] = useState<number[]>([0]);
  const [sort, setSort] = useState<ReviewSort>(ReviewSort.RECENT);
  const [editingReview, setEditingReview] = useState<ReviewWithUser | null>(
    null
  );

  const pageQueries = useQueries({
    queries: fetchedOffsets.map((pageOffset) => ({
      queryKey: reviewsKeys.list({
        perfumeId,
        limit: PAGINATION_PAGE_SIZE,
        offset: pageOffset,
      }),
      queryFn: () =>
        getReviews({
          perfumeId,
          limit: PAGINATION_PAGE_SIZE,
          offset: pageOffset,
        }),
      enabled: !!perfumeId,
    })),
  });

  const firstQuery = pageQueries[0];
  const lastQuery = pageQueries[pageQueries.length - 1];
  const isInitialLoad = firstQuery?.isLoading ?? false;
  const isPaginationLoading = pageQueries.some((q, i) => i > 0 && q.isLoading);
  const isError = pageQueries.some((q) => q.isError);
  const allReviews = pageQueries.flatMap((q) => q.data?.data ?? []);
  const nextOffset = lastQuery?.data?.nextPage ?? null;
  const distribution = lastQuery?.data?.distribution;
  const userReview = lastQuery?.data?.userReview;
  const hasReview = !!userReview;
  const hasReviews = allReviews.length > 0;

  const handleEdit = (review: ReviewWithUser) => {
    setEditingReview(review);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  const handleSuccess = () => {
    setEditingReview(null);
  };

  const handleLoadMore = () => {
    if (nextOffset != null) {
      setFetchedOffsets((prev) => [...prev, nextOffset]);
    }
  };

  const formReview = editingReview ?? undefined;

  return (
    <CollapsibleSection
      title={`Reseñas (${reviewCount})`}
      defaultOpen={defaultOpen}
    >
      <div className="flex w-full flex-col items-center gap-6">
        {isInitialLoad && (
          <div className="flex w-full items-center gap-6">
            <RatingAverageSkeleton />
            <RatingBreakdownSkeleton />
          </div>
        )}

        {!isInitialLoad && !isError && (
          <div className="flex w-full items-center gap-6">
            <RatingAverage rating={rating} reviewCount={reviewCount} />
            <RatingBreakdown distribution={distribution} />
          </div>
        )}

        <div className="flex w-full flex-col">
          {isInitialLoad && (
            <>
              <ReviewCardSkeleton />
              <ReviewCardSkeleton />
              <ReviewCardSkeleton />
            </>
          )}

          <div className="flex w-full flex-col gap-3">
            {!isInitialLoad && !isError && hasReviews && (
              <>
                <ReviewSortMenu value={sort} onChange={setSort} />
                <ReviewList
                  reviews={allReviews}
                  currentUserId={user?.id}
                  onEdit={handleEdit}
                />
              </>
            )}
          </div>

          {!isInitialLoad && !isError && !hasReviews && (
            <p className="py-4 text-center text-sm text-white">
              No hay reseñas aún. Sé el primero en opinar.
            </p>
          )}
        </div>

        {nextOffset != null && !isError && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleLoadMore}
            disabled={isPaginationLoading}
          >
            {isPaginationLoading ? "Cargando..." : "Ver más reseñas"}
          </Button>
        )}

        {!isError && (!hasReview || editingReview) && (
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
