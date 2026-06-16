'use client';

import type { ComponentType } from 'react';
import type { BoxIconProps } from '@boxicons/react';
import { House, Heart, Search, Handbag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib';

type NavIcon = ComponentType<BoxIconProps>;

type TabItem = {
  href: string;
  icon: NavIcon;
  isCenter?: boolean;
};

const TABS: TabItem[] = [
  { href: '/', icon: House },
  { href: '/explorer', icon: Search },
  { href: '/favorites', icon: Heart },
  { href: '/cart', icon: Handbag  },
];

interface NavButtonProps {
  href: string;
  icon: NavIcon;
  isActive: boolean;
}

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto h-15 md:max-w-md bg-surface px-2">
      <div className="flex h-full items-center justify-between">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;

          return <NavButton key={tab.href} {...tab} isActive={isActive} />;
        })}
      </div>
    </nav>
  );
};

const NavButton = ({ href, icon: Icon, isActive }: NavButtonProps) => (
  <Link
    href={href}
    className={cn(
      "flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200 border-b-2 py-3.5",
      isActive ? "text-white scale-105 border-white" : "text-body hover:text-primary/80 border-transparent"
    )}
  >
    <Icon pack="filled" className={cn("h-6 w-6", isActive && "drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]")} />
  </Link>
);