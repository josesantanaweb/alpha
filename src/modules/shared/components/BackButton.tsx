"use client";

import type { ReactElement } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = (): ReactElement => {
  const router = useRouter();

  return (
    <button
      className="cursor-pointer text-white"
      onClick={() => router.back()}
      aria-label="Volver"
    >
      <ArrowLeft size={24} />
    </button>
  );
};