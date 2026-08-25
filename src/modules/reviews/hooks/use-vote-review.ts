"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/constants";
import { voteReview } from "@/lib/api/reviews";
import { useAuth } from "@/modules/auth/store";
import { reviewsKeys } from "./reviews-keys";
import type { GetReviewsResponse } from "../types";

interface VoteVariables {
  reviewId: string;
  isHelpful: boolean;
}

export const useVoteReview = (perfumeId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuth((s) => s.user);
  const token = useAuth((s) => s.token);

  return useMutation({
    mutationFn: async ({ reviewId, isHelpful }: VoteVariables) => {
      if (!token) throw new Error("No autenticado");
      return voteReview(token, reviewId, isHelpful);
    },
    onMutate: async ({ reviewId, isHelpful }: VoteVariables) => {
      const queryKey = reviewsKeys.all(perfumeId);
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueriesData<GetReviewsResponse>({
        queryKey,
      });

      previous.forEach(([key, data]) => {
        if (!data) return;

        const review = data.data.find((r) => r.id === reviewId);
        if (!review) return;

        const prevVote = review.userVote;
        const nextVote =
          prevVote === isHelpful ? null : isHelpful;

        let helpfulCount = review.helpfulCount;
        let notHelpfulCount = review.notHelpfulCount;

        if (prevVote === true) helpfulCount -= 1;
        if (prevVote === false) notHelpfulCount -= 1;
        if (nextVote === true) helpfulCount += 1;
        if (nextVote === false) notHelpfulCount += 1;

        queryClient.setQueryData<GetReviewsResponse>(key, {
          ...data,
          data: data.data.map((r) =>
            r.id === reviewId
              ? { ...r, userVote: nextVote, helpfulCount, notHelpfulCount }
              : r
          ),
        });
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      context?.previous.forEach(([key, data]) => {
        if (data) queryClient.setQueryData(key, data);
      });
      if (!user) router.push(ROUTES.LOGIN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: reviewsKeys.all(perfumeId),
      });
    },
  });
};
