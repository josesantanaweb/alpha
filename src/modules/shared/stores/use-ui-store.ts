"use client";
import { create } from "zustand";

interface AppState {
  hideBottomNav: boolean;
  hideHeader: boolean;
  isCartDrawerOpen: boolean;
  setHideBottomNav: (value: boolean) => void;
  setHideHeader: (value: boolean) => void;
  setCartDrawerOpen: (value: boolean) => void;
}

export const useApp = create<AppState>((set) => ({
  hideBottomNav: false,
  hideHeader: false,
  isCartDrawerOpen: false,
  setHideBottomNav: (value: boolean) => set({ hideBottomNav: value }),
  setHideHeader: (value: boolean) => set({ hideHeader: value }),
  setCartDrawerOpen: (value: boolean) => set({ isCartDrawerOpen: value }),
}));