import { useMutation } from "@tanstack/react-query";
import type { ApiResult } from "@/modules/shared/types";

interface VoteFeelingParams {
  perfumeId: string;
  field: "hate" | "dislike" | "like" | "love";
}

export const useFeelingVote = () => {
  return useMutation({
    mutationFn: async ({ perfumeId, field }: VoteFeelingParams) => {
      const response = await fetch(`/api/perfumes/${perfumeId}/feeling`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field }),
      });

      const data = (await response.json()) as ApiResult<boolean>;

      if (!data.success) {
        throw new Error(data.message || "Error al registrar el voto");
      }

      return data;
    },
  });
};