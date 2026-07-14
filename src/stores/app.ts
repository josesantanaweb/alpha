"use client";
import { create } from "zustand";

interface AppState {
  hideBottomNav: boolean;
  setHideBottomNav: (value: boolean) => void;
}

export const useApp = create<AppState>((set) => ({
  hideBottomNav: false,
  setHideBottomNav: (value: boolean) => set({ hideBottomNav: value }),
}));