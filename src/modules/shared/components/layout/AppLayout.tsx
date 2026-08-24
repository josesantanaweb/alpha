"use client";

import { BottomNav, Header } from "@/modules/shared/components/layout";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { cn } from "@/modules/shared/utils/cn";
import { CartDrawer } from "@/modules/cart/components";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { hideBottomNav, hideHeader } = useApp();

  return (
    <main className="bg-web-bg relative flex h-full w-full items-center justify-center overflow-auto">
      <div className="bg-box-primary relative flex h-full w-full flex-col overflow-hidden md:max-w-md">
        {!hideHeader && <Header />}
        <div
          className={cn(
            "safe-scroll w-full flex-1",
            hideHeader ? "" : "pt-17.5"
          )}
        >
          {children}
        </div>
        {!hideBottomNav && <BottomNav />}
        <CartDrawer />
      </div>
    </main>
  );
};
