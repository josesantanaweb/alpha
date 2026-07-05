'use client';
import type { ReactElement } from 'react';
import { cn } from '@/lib';

interface CategoryButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const CategoryButton = ({ label, active = false, onClick }: CategoryButtonProps): ReactElement => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex shrink-0 h-9 px-4 rounded-full cursor-pointer font-medium items-center justify-center border border-stroke uppercase text-sm transition-colors',
        active ? 'bg-white border-white text-surface' : 'bg-surface text-white',
      )}
    >
      {label}
    </button>
  );
};
