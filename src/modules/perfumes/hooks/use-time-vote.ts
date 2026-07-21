import { useMutation } from "@tanstack/react-query";
import type { ApiResult } from "@/modules/shared/types";

interface VoteTimeParams {
  perfumeId: string;
  field: "day" | "night";
}

export const useTimeVote = () => {
  return useMutation({
    mutationFn: async ({ perfumeId, field }: VoteTimeParams) => {
      const response = await fetch(`/api/perfumes/${perfumeId}/time-of-day`, {
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
