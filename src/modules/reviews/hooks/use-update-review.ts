"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "@/lib/api/reviews";
import { useAuth } from "@/modules/auth/store";
import { reviewsKeys } from "./reviews-keys";

export const useUpdateReview = (perfumeId: string) => {
  const queryClient = useQueryClient();
  const token = useAuth((s) => s.token);

  return useMutation({
    mutationFn: async ({
      reviewId,
      data,
    }: {
      reviewId: string;
      data: { rating?: number; title?: string; comment?: string };
    }) => {
      if (!token) throw new Error("No autenticado");
      return updateReview(token, reviewId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewsKeys.all(perfumeId),
      });
    },
  });
};