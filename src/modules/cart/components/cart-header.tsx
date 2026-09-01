"use client";

import type { ReactElement } from "react";
import { X } from "lucide-react";
import { useApp } from "@/modules/shared/stores/use-ui-store";

export const CartHeader = (): ReactElement => {
  const { setCartDrawerOpen } = useApp();

  return (
    <div className="flex items-center justify-between">
      <span />
      <h3 className="text-lg font-bold text-white">Mi Carrito</h3>
      <button
        className="cursor-pointer text-white"
        onClick={() => setCartDrawerOpen(false)}
      >
        <X size={24} />
      </button>
    </div>
  );
};
