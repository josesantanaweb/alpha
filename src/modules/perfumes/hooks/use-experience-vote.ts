"use client";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/store";
import { ROUTES } from "@/constants";
import type { ApiResult } from "@/modules/shared/types";

type VoteCategory =
  | "season"
  | "timeOfDay"
  | "longevity"
  | "sillage"
  | "projection"
  | "feeling";

interface VoteParams {
  category: VoteCategory;
  field: string;
}

export const useExperienceVote = (perfumeId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuth((s) => s.user);
  const token = useAuth((s) => s.token);

  const queryKey = ["user-votes", perfumeId, user?.id];

  // Cargar votos existentes del usuario para este perfume
  const { data: userVotes = {} } = useQuery<Record<string, string>>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/perfumes/${perfumeId}/vote`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return {};
      const result = (await res.json()) as ApiResult<Record<string, string>>;
      return result.success ? (result.data ?? {}) : {};
    },
    enabled: !!user && !!token,
  });

  const requireAuth = useCallback(() => {
    if (!user) {
      router.push(ROUTES.LOGIN);
      return false;
    }
    return true;
  }, [user, router]);

  const voteMutation = useMutation({
    mutationFn: async ({ category, field }: VoteParams) => {
      const res = await fetch(`/api/perfumes/${perfumeId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category, field }),
      });

      const data = (await res.json()) as ApiResult<{
        previousField: string | null;
      }>;

      if (!data.success) {
        throw new Error(data.message || "Error al registrar el voto");
      }

      return data;
    },
    onMutate: async ({ category, field }: VoteParams) => {
      await queryClient.cancelQueries({ queryKey });
      const previous =
        queryClient.getQueryData<Record<string, string>>(queryKey);

      // Optimistic update: set the new vote immediately
      queryClient.setQueryData<Record<string, string>>(queryKey, (old) => ({
        ...old,
        [category]: field,
      }));

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => {
      // Invalidar el query del perfume para re-fetch los contadores agregados
      queryClient.invalidateQueries({ queryKey: ["perfume", perfumeId] });
    },
  });

  const vote = useCallback(
    (category: VoteCategory, field: string) => {
      if (!requireAuth()) return;
      voteMutation.mutate({ category, field });
    },
    [requireAuth, voteMutation],
  );

  const getUserVote = useCallback(
    (category: VoteCategory): string | null => {
      return userVotes[category] ?? null;
    },
    [userVotes],
  );

  const isVoted = useCallback(
    (category: VoteCategory, field: string): boolean => {
      return userVotes[category] === field;
    },
    [userVotes],
  );

  return useMemo(
    () => ({ userVotes, vote, getUserVote, isVoted }),
    [userVotes, vote, getUserVote, isVoted],
  );
};
