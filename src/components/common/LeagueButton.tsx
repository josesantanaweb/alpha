'use client';
import type { ReactElement } from 'react';
import { cn } from '@/lib';

interface BadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const LeagueButton = ({ label, active = false, onClick }: BadgeProps): ReactElement => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex shrink-0 h-8 px-4 rounded-full cursor-pointer font-medium items-center justify-center border border-stroke/30 uppercase text-sm transition-colors',
        active ? 'bg-primary border-primary text-on-accent' : 'bg-surface text-white',
      )}
    >
      {label}
    </button>
  );
};
