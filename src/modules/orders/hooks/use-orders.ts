"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/api/orders";
import { useAuth } from "@/modules/auth/store";
import type { OrderWithItems } from "@/modules/orders/types";

export const useOrders = () => {
  const user = useAuth((s) => s.user);
  const token = useAuth((s) => s.token);
  const authLoading = useAuth((s) => s.isLoading);

  const queryKey = ["orders", user?.id];

  const { data: orders = [], isLoading, error } = useQuery<OrderWithItems[]>({
    queryKey,
    queryFn: async () => {
      if (!token) return [];
      try {
        return await getOrders(token);
      } catch {
        return [];
      }
    },
    enabled: !!user,
  });

  return {
    orders,
    isLoading: authLoading || (!!user && isLoading),
    error,
  };
};