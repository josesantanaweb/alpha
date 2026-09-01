"use client";

import type { ReactElement } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  Avatar,
  HelpfulButton,
  StarRating,
} from "@/modules/shared/components";
import { formatRelativeDate } from "@/modules/shared/utils";
import { useDeleteReview, useVoteReview } from "../hooks";
import type { ReviewWithVote } from "../types";

interface ReviewCardProps {
  review?: ReviewWithVote;
  isOwner?: boolean;
  onEdit?: (review: ReviewWithVote) => void;
}

export const ReviewCard = ({
  review,
  isOwner,
  onEdit,
}: ReviewCardProps): ReactElement | null => {
  const { mutate: remove, isPending: isDeleting } = useDeleteReview(
    review?.perfumeId ?? ""
  );
  const { mutate: vote, isPending: isVoting } = useVoteReview(
    review?.perfumeId ?? ""
  );

  if (!review) return null;

  const userName = review.user?.name ?? "";
  const title = review.title ?? "";
  const comment = review.comment ?? "";
  const rating = review.rating ?? 0;
  const dateStr = formatRelativeDate(review.createdAt);

  const handleDelete = () => {
    if (window.confirm("¿Eliminar tu reseña?")) {
      remove(review.id);
    }
  };

  const handleVote = (isHelpful: boolean) => {
    vote({ reviewId: review.id, isHelpful });
  };

  return (
    <div className="border-stroke flex w-full flex-col gap-3 border-b py-3">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex w-full items-start gap-3">
          <Avatar src={review.user?.avatar} name={userName} size={40} />
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-white">{userName}</h4>

              <p className="text-body text-xs mb-1">{dateStr}</p>

              <StarRating value={rating} size={14} />
            </div>
            {isOwner && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit?.(review)}
                  className="text-body cursor-pointer hover:text-white"
                  title="Editar"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-body cursor-pointer hover:text-red-400 disabled:opacity-50"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 pl-14">
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold text-white">{title}</h5>
          <p className="text-body text-sm mb-2">{comment}</p>
          <div className="flex items-center gap-3">
            <HelpfulButton
              direction="up"
              label="Útil"
              count={review.helpfulCount}
              active={review.userVote === true}
              disabled={isVoting}
              onClick={() => handleVote(true)}
            />
            <HelpfulButton
              direction="down"
              label="No útil"
              count={review.notHelpfulCount}
              active={review.userVote === false}
              disabled={isVoting}
              onClick={() => handleVote(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
