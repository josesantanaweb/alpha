"use client";

import { useState, type ReactElement } from "react";
import { Star } from "lucide-react";
import { Button, Input, Textarea } from "@/modules/shared/components/ui";
import { useCreateReview, useUpdateReview } from "../hooks";
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

    if (rating === 0) {
      setErrors({ rating: "Selecciona una clasificación." });
      return;
    }
    if (comment.length < 10) {
      setErrors({
        comment: "El comentario debe tener al menos 10 caracteres.",
      });
      return;
    }

    if (isEditing && review) {
      updateMutation.mutate(
        {
          reviewId: review.id,
          data: { rating, title: title || undefined, comment },
        },
        { onSuccess }
      );
    } else {
      createMutation.mutate(
        { rating, title: title || undefined, comment },
        {
          onSuccess: () => {
            setRating(0);
            setTitle("");
            setComment("");
            onSuccess?.();
          },
        }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-start gap-6"
    >
      <h3 className="text-base font-semibold text-white">
        {isEditing ? "Editar tu Reseña" : "Agrega tu Reseña"}
      </h3>

      <div className="flex flex-col gap-2">
        <p className="text-white text-sm font-bold uppercase">
          Clasificación
        </p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            return (
              <Star
                key={index}
                className="cursor-pointer text-yellow-500 transition-transform hover:scale-110"
                size={18}
                fill={starValue <= rating ? "currentColor" : "none"}
                onClick={() => setRating(starValue)}
              />
            );
          })}
        </div>
        {errors.rating && (
          <p className="text-red-400 text-xs">{errors.rating}</p>
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
        />

        {error && (
          <p className="text-red-400 text-xs w-full text-left">
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