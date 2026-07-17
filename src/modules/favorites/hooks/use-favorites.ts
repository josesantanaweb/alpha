"use client";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/store";
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
      const res = await fetch("/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return [];
      return res.json() as Promise<PerfumeWithRelations[]>;
    },
    enabled: !!user,
  });

  const ids = useMemo(() => perfumes.map((p) => p.id), [perfumes]);

  const addMutation = useMutation({
    mutationFn: async (perfumeId: string) => {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ perfumeId }),
      });
      if (!res.ok) throw new Error("Error al agregar favorito");
    },
    onMutate: async (perfumeId) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<PerfumeWithRelations[]>(
        queryKey,
      );
      queryClient.setQueryData<PerfumeWithRelations[]>(queryKey, (old) => {
        if (old?.some((p) => p.id === perfumeId)) return old;
        return [...(old ?? [])];
      });
      return { previous };
    },
    onError: (_err, _perfumeId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (perfumeId: string) => {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ perfumeId }),
      });
      if (!res.ok) throw new Error("Error al eliminar favorito");
    },
    onMutate: async (perfumeId) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<PerfumeWithRelations[]>(
        queryKey,
      );
      queryClient.setQueryData<PerfumeWithRelations[]>(queryKey, (old) =>
        (old ?? []).filter((p) => p.id !== perfumeId),
      );
      return { previous };
    },
    onError: (_err, _perfumeId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
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

  const ready = !authLoading && (!user || !favoritesLoading);

  return { ids, perfumes, ready, add, remove, toggle, isFavorite };
};