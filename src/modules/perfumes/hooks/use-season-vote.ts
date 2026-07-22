import { useMutation } from "@tanstack/react-query";
import type { ApiResult } from "@/modules/shared/types";

interface VoteSeasonParams {
  perfumeId: string;
  field: "winter" | "spring" | "summer" | "autumn";
}

export const useSeasonVote = () => {
  return useMutation({
    mutationFn: async ({ perfumeId, field }: VoteSeasonParams) => {
      const response = await fetch(`/api/perfumes/${perfumeId}/season`, {
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
