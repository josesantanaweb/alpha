'use client';
import { BottomNav, Header } from '@/modules/shared/components/layout';
import { useApp } from '@/modules/shared/stores/use-ui-store';
import { cn } from '@/modules/shared/utils/cn';
import { CartDrawer } from '@/modules/cart/components';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { hideBottomNav, hideHeader } = useApp();

  return (
    <main className="relative w-full flex items-center justify-center overflow-auto bg-web-bg h-full">
      <div className="relative w-full md:max-w-md flex flex-col h-full bg-box-primary overflow-hidden">
        {!hideHeader && <Header />}
        <div className={cn("flex-1 safe-scroll w-full", hideHeader ? "" : "pt-17.5")}>{children}</div>
        {!hideBottomNav && <BottomNav />}
        <CartDrawer />
      </div>
    </main>
  );
};
