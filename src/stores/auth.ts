"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: true,
      setSession: (user, token) => set({ user, token }),
      clearSession: () => set({ user: null, token: null }),
    }),
    {
      name: "aura_auth",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);