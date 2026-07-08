'use client';

import type { ComponentType } from 'react';
import { forwardRef, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { BoxIconProps } from '@boxicons/react';
import { House, Heart, Search, Handbag } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const activeIndex = useMemo(() => TABS.findIndex((tab) => pathname === tab.href), [pathname]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const container = navRef.current;
      const activeTab = tabRefs.current[activeIndex];

      if (!container || !activeTab) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      setIndicator({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  return (
    <nav className="fixed bottom-5 left-0 right-0 z-50 mx-auto h-15 w-sm rounded-full bg-linear-to-r from-[#444451] via-[#4c4c4c] to-[#444451] p-px shadow-lg md:max-w-md">
      <div ref={navRef} className="relative flex h-full items-center justify-between rounded-full bg-surface px-1">
        <motion.div
          layout
          className="absolute top-1 bottom-1 rounded-full bg-stroke"
          animate={{ left: indicator.left, width: indicator.width }}
          transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.8 }}
        />

        {TABS.map((tab, index) => {
          const isActive = activeIndex === index;

          return (
            <NavButton
              key={tab.href}
              href={tab.href}
              icon={tab.icon}
              isActive={isActive}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
            />
          );
        })}
      </div>
    </nav>
  );
};

const NavButton = forwardRef<HTMLAnchorElement, NavButtonProps>(({ href, icon: Icon, isActive }, ref) => (
  <Link
    ref={ref}
    href={href}
    className={cn(
      'relative z-10 flex flex-1 flex-col items-center justify-center gap-1 rounded-full py-3.5 transition-all duration-200',
      isActive ? 'scale-105 text-white' : 'text-body hover:text-primary/80'
    )}
  >
    <Icon pack="filled" className={cn('h-6 w-6', isActive && 'drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]')} />
  </Link>
));

NavButton.displayName = 'NavButton';
