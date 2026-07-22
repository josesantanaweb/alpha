import { useMutation } from "@tanstack/react-query";
import type { ApiResult } from "@/modules/shared/types";

interface VoteLongevityParams {
  perfumeId: string;
  field: "weak" | "moderate" | "long" | "veryLong";
}

export const useLongevityVote = () => {
  return useMutation({
    mutationFn: async ({ perfumeId, field }: VoteLongevityParams) => {
      const response = await fetch(`/api/perfumes/${perfumeId}/longevity`, {
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
