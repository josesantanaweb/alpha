import type { ReactElement } from "react";
import { CollapsibleSection } from "@/modules/shared/components";
import { AddReviewForm } from "./AddReviewForm";
import { RatingAverage } from "./RatingAverage";
import { RatingBreakdown } from "./RatingBreakdown";
import { ReviewCard } from "./ReviewCard";

interface RatingSummaryProps {
  rating?: number;
  reviewCount?: number;
  distribution?: Record<number, number>;
  defaultOpen?: boolean;
}

export const RatingSummary = ({
  rating = 4.3,
  reviewCount = 400,
  distribution,
  defaultOpen = false,
}: RatingSummaryProps): ReactElement => {
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
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>

        <AddReviewForm />
      </div>
    </CollapsibleSection>
  );
};
