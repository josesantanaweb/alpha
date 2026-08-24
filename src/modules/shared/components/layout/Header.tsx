"use client";

import { Menu } from "lucide-react";
import { CartButton } from "@/modules/shared/components";
import { Logo } from "@/modules/shared/components/ui";

export const Header = () => {
  return (
    <div className="bg-surface fixed top-0 right-0 left-0 z-50 mx-auto h-17 md:max-w-md">
      <div className="flex h-full items-center justify-between px-5">
        <button className="cursor-pointer text-white">
          <Menu size={24} />
        </button>
        <Logo />
        <div className="flex items-center gap-3">
          <CartButton />
        </div>
      </div>
    </div>
  );
};
