import { useMutation } from "@tanstack/react-query";
import type { ApiResult } from "@/modules/shared/types";

interface VoteProjectionParams {
  perfumeId: string;
  field: "soft" | "moderate" | "heavy" | "huge";
}

export const useProjectionVote = () => {
  return useMutation({
    mutationFn: async ({ perfumeId, field }: VoteProjectionParams) => {
      const response = await fetch(`/api/perfumes/${perfumeId}/projection`, {
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