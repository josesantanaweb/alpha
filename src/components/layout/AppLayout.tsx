'use client';
import { BottomNav, Header } from '@/components/layout';
import { useApp } from '@/stores/app';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { hideBottomNav: hide } = useApp();

  return (
    <main className="relative w-full flex items-center justify-center overflow-auto bg-web-bg h-full">
      <div className="w-full md:max-w-md flex flex-col h-full bg-box-primary">
        <Header />
        <div className="flex-1 safe-scroll pt-17.5 w-full">{children}</div>
        {!hide && <BottomNav />}
      </div>
    </main>
  );
};
