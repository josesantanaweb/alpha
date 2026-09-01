"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { useAuth } from "@/modules/auth/store";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(ROUTES.LOGIN);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return <>{children}</>;
}
