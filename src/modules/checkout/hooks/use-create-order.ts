"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/store";
import { createOrder } from "@/lib/api/orders";
import type { CreateOrderInput } from "@/modules/orders";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const token = useAuth((s) => s.token);
  const userId = useAuth((s) => s.user?.id);

  return useMutation({
    mutationFn: async (payload: CreateOrderInput) => {
      if (!token) throw new Error("No autenticado");
      return createOrder(token, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
};