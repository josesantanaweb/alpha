"use client";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/store";
import { getFavorites, addFavorite, removeFavorite } from "@/lib/api/favorites";
import { ROUTES } from "@/constants";
import type { PerfumeWithRelations } from "@/modules/perfumes";

export const useFavorites = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuth((s) => s.user);
  const token = useAuth((s) => s.token);
  const authLoading = useAuth((s) => s.isLoading);

  const queryKey = ["favorites", user?.id];

  const {
    data: perfumes = [],
    isLoading: favoritesLoading,
  } = useQuery<PerfumeWithRelations[]>({
    queryKey,
    queryFn: async () => {
      if (!token) return [];
      try {
        return await getFavorites(token);
      } catch {
        return [];
      }
    },
    enabled: !!user,
  });

  const ids = useMemo(() => perfumes.map((p) => p.id), [perfumes]);

  const addMutation = useMutation({
    mutationFn: async (perfumeId: string) => {
      if (!token) throw new Error("No token");
      await addFavorite(token, perfumeId);
    },
    onMutate: async (perfumeId) => {
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<PerfumeWithRelations[]>(queryKey, (old) => {
        if (old?.some((p) => p.id === perfumeId)) return old;
        return [...(old ?? [])];
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (perfumeId: string) => {
      if (!token) throw new Error("No token");
      await removeFavorite(token, perfumeId);
    },
    onMutate: async (perfumeId) => {
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<PerfumeWithRelations[]>(queryKey, (old) =>
        (old ?? []).filter((p) => p.id !== perfumeId),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const requireAuth = useCallback(() => {
    if (!user) {
      router.push(ROUTES.LOGIN);
      return false;
    }
    return true;
  }, [user, router]);

  const add = useCallback(
    (id: string) => {
      if (!requireAuth()) return;
      addMutation.mutate(id);
    },
    [requireAuth, addMutation],
  );

  const remove = useCallback(
    (id: string) => {
      if (!requireAuth()) return;
      removeMutation.mutate(id);
    },
    [requireAuth, removeMutation],
  );

  const toggle = useCallback(
    (id: string) => {
      if (!requireAuth()) return;
      if (ids.includes(id)) {
        removeMutation.mutate(id);
      } else {
        addMutation.mutate(id);
      }
    },
    [ids, requireAuth, addMutation, removeMutation],
  );

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const isPending = (id: string) =>
    addMutation.isPending || removeMutation.isPending;

  const ready = !authLoading && (!user || !favoritesLoading);

  return { ids, perfumes, ready, add, remove, toggle, isFavorite, isPending };
};