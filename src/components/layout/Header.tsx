"use client";
import { Menu, Handbag } from "lucide-react";
import { Logo } from "@/components/ui";

export const Header = () => {
  return (
    <div className="bg-surface fixed top-0 right-0 left-0 z-50 mx-auto h-17 md:max-w-md">
      <div className="flex h-full items-center justify-between px-5">
        <button className="cursor-pointer text-white">
          <Menu size={24} />
        </button>
        <Logo />
        <button className="relative cursor-pointer text-white">
          <Handbag size={24} />
          <span className="absolute -top-1 -right-1 bg-white text-[10px] w-4 h-4 rounded-full text-canvas font-semibold">2</span>
        </button>
      </div>
    </div>
  );
};
