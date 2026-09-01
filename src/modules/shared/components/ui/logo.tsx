"use client";

import Image from "next/image";
import Link from "next/link";
import { ASSETS } from "@/constants";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={`block w-20 ${className}`}
      aria-label="Ir al inicio"
    >
      <Image
        src={ASSETS.IMAGES.LOGO}
        alt="Logo"
        width={100}
        height={100}
        className="h-full w-full object-cover"
      />
    </Link>
  );
};
