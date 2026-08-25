"use client";

import type { ReactElement } from "react";
import { ReviewCard } from "./ReviewCard";
import type { ReviewWithVote } from "../types";

interface ReviewListProps {
  reviews: ReviewWithVote[];
  currentUserId?: string;
  onEdit?: (review: ReviewWithVote) => void;
}

export const ReviewList = ({
  reviews,
  currentUserId,
  onEdit,
}: ReviewListProps): ReactElement => {
  return (
    <>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          isOwner={
            currentUserId ? currentUserId === review.userId : undefined
          }
          onEdit={onEdit}
        />
      ))}
    </>
  );
};
