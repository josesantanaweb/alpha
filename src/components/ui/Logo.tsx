"use client";
import { ASSETS } from "@/constants";
import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`w-20 ${className}`}>
      <Image
        src={ASSETS.IMAGES.LOGO}
        alt="Logo"
        width={100}
        height={100}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
