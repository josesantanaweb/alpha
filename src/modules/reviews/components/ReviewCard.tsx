"use client";

import type { ReactElement } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import type { ReviewWithUser } from "../types";
import { useDeleteReview } from "../hooks";
import { StarRating } from "@/modules/shared/components";

interface ReviewCardProps {
  review?: ReviewWithUser;
  isOwner?: boolean;
  onEdit?: (review: ReviewWithUser) => void;
}

export const ReviewCard = ({
  review,
  isOwner,
  onEdit,
}: ReviewCardProps): ReactElement | null => {
  const { mutate: remove, isPending: isDeleting } = useDeleteReview(
    review?.perfumeId ?? ""
  );

  if (!review) return null;

  const userName = review.user?.name ?? "";
  const userInitial = userName.charAt(0).toUpperCase();
  const title = review.title ?? "";
  const comment = review.comment ?? "";
  const rating = review.rating ?? 0;
  const dateStr = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const handleDelete = () => {
    if (window.confirm("¿Eliminar tu reseña?")) {
      remove(review.id);
    }
  };

  return (
    <div className="border-stroke flex w-full flex-col gap-3 border-b py-3">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {review.user?.avatar ? (
            <Image
              src={review.user.avatar}
              alt={userName}
              width={200}
              height={200}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-surface flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold">
              {userInitial}
            </span>
          )}
          <div className="flex flex-col">
            <h4 className="text-base font-semibold text-white">{userName}</h4>
            <p className="text-body text-sm">{dateStr}</p>
          </div>
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
      <div className="flex flex-col gap-3 pl-14">
        <div className="flex flex-col gap-2">
          {title && (
            <h5 className="text-sm font-semibold text-white">{title}</h5>
          )}
          <p className="text-body text-xs">{comment}</p>
        </div>
        <StarRating value={rating} size={14} />
      </div>
    </div>
  );
};
