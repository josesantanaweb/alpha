"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { useAuth } from "@/modules/auth/store";

export function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.push(ROUTES.HOME);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "ADMIN") return null;

  return <>{children}</>;
}