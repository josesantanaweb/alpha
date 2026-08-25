"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/constants";
import { createReview } from "@/lib/api/reviews";
import { useAuth } from "@/modules/auth/store";
import { reviewsKeys } from "./reviews-keys";

export const useCreateReview = (perfumeId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuth((s) => s.user);
  const token = useAuth((s) => s.token);

  return useMutation({
    mutationFn: async (data: {
      rating: number;
      title?: string;
      comment: string;
    }) => {
      if (!token) throw new Error("No autenticado");
      return createReview(token, { ...data, perfumeId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewsKeys.all(perfumeId),
      });
    },
    onError: () => {
      if (!user) router.push(ROUTES.LOGIN);
    },
  });
};