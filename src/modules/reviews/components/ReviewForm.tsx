"use client";

import { useState, type ReactElement } from "react";
import { StarRating } from "@/modules/shared/components";
import { Button, Input, Textarea } from "@/modules/shared/components/ui";
import { useCreateReview, useUpdateReview } from "../hooks";
import { CreateReviewSchema, UpdateReviewSchema } from "../schema";
import type { ReviewWithUser } from "../types";

interface ReviewFormProps {
  perfumeId: string;
  review?: ReviewWithUser;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const ReviewForm = ({
  perfumeId,
  review,
  onCancel,
  onSuccess,
}: ReviewFormProps): ReactElement => {
  const isEditing = !!review;
  const [rating, setRating] = useState(review?.rating ?? 0);
  const [title, setTitle] = useState(review?.title ?? "");
  const [comment, setComment] = useState(review?.comment ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const createMutation = useCreateReview(perfumeId);
  const updateMutation = useUpdateReview(perfumeId);
  const isPending = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;
  const canSubmit = rating > 0 && comment.length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const data = {
      rating,
      title: title || undefined,
      comment,
    };

    const result = isEditing
      ? UpdateReviewSchema.safeParse(data)
      : CreateReviewSchema.safeParse({ ...data, perfumeId });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const flattened = result.error.flatten().fieldErrors;
      for (const [key, messages] of Object.entries(flattened)) {
        if (messages?.length) fieldErrors[key] = messages[0];
      }
      setErrors(fieldErrors);
      return;
    }

    if (isEditing && review) {
      updateMutation.mutate(
        {
          reviewId: review.id,
          data,
        },
        { onSuccess }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setRating(0);
          setTitle("");
          setComment("");
          onSuccess?.();
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-start gap-6"
    >
      <h3 className="text-lg font-semibold text-white">
        {isEditing ? "Editar tu Reseña" : "Agrega tu Reseña"}
      </h3>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-white uppercase">Clasificación</p>
        <StarRating
          value={rating}
          size={18}
          readOnly={false}
          onChange={setRating}
        />
        {errors.rating && (
          <p className="text-xs text-red-400">{errors.rating}</p>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-5">
        <Input
          placeholder="Título de la reseña"
          label="Título"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Escribe tu opinión sobre el perfume..."
          label="Descripción"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={errors.comment}
          maxLength={1000}
        />

        {error && (
          <p className="w-full text-left text-xs text-red-400">
            {error.message}
          </p>
        )}

        <div className="flex w-full items-center gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={!canSubmit || isPending}
          >
            {isPending
              ? "Enviando..."
              : isEditing
                ? "Guardar cambios"
                : "Enviar"}
          </Button>
        </div>
      </div>
    </form>
  );
};
