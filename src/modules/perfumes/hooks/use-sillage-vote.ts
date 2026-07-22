import { useMutation } from "@tanstack/react-query";
import type { ApiResult } from "@/modules/shared/types";

interface VoteSillageParams {
  perfumeId: string;
  field: "soft" | "moderate" | "heavy" | "huge";
}

export const useSillageVote = () => {
  return useMutation({
    mutationFn: async ({ perfumeId, field }: VoteSillageParams) => {
      const response = await fetch(`/api/perfumes/${perfumeId}/sillage`, {
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