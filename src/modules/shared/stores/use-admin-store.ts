"use client";

import { create } from "zustand";

interface AdminState {
  collapseSidebar: boolean;
  isMobileSidebarOpen: boolean;
  setCollapseSidebar: (value: boolean) => void;
  setMobileSidebarOpen: (value: boolean) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  collapseSidebar: false,
  isMobileSidebarOpen: false,
  setCollapseSidebar: (value: boolean) => set({ collapseSidebar: value }),
  setMobileSidebarOpen: (value: boolean) => set({ isMobileSidebarOpen: value }),
}));