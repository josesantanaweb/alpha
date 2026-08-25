"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "@/lib/api/reviews";
import { useAuth } from "@/modules/auth/store";
import { reviewsKeys } from "./reviews-keys";

export const useDeleteReview = (perfumeId: string) => {
  const queryClient = useQueryClient();
  const token = useAuth((s) => s.token);

  return useMutation({
    mutationFn: async (reviewId: string) => {
      if (!token) throw new Error("No autenticado");
      return deleteReview(token, reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewsKeys.all(perfumeId),
      });
    },
  });
};