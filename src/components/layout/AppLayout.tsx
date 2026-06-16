'use client';
import { BottomNav, Header } from '@/components/layout';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative w-full flex items-center justify-center overflow-auto bg-web-bg h-full">
      <div className="w-full md:max-w-md flex flex-col h-full bg-box-primary">
        <Header />
        <div className="flex-1 safe-scroll p-6 pt-20 w-full">{children}</div>
        <BottomNav />
      </div>
    </main>
  );
};
