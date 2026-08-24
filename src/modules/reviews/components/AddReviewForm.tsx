"use client";

import { useState, type ReactElement } from "react";
import { Star } from "lucide-react";
import { Button, Input, Textarea } from "@/modules/shared/components/ui";

interface AddReviewFormProps {
  onSubmit?: (data: { rating: number; title: string; comment: string }) => void;
}

export const AddReviewForm = ({
  onSubmit,
}: AddReviewFormProps): ReactElement => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ title?: string; comment?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ rating, title, comment });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-start gap-6"
    >
      <h3 className="text-base font-semibold text-white">Agrega tu Reseña</h3>

      <div className="flex flex-col gap-2">
        <p className="text-body text-sm font-bold text-white uppercase">
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
      </div>

      <div className="flex w-full flex-col items-center gap-5">
        <Input
          placeholder="Título de la reseña"
          label="Título"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
        />

        <Textarea
          placeholder="Escribe tu opinión sobre el perfume..."
          label="Descripción"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={errors.comment}
        />

        <Button type="submit" variant="primary" className="w-full">
          Enviar
        </Button>
      </div>
    </form>
  );
};
