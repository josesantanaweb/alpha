import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/modules/shared/utils/cn';

const inputVariants = cva(
  'rounded-lg bg-surface border-stroke text-white placeholder:text-body w-full rounded-lg border px-3 py-2 text-base outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      inputSize: {
        sm: 'h-9 text-xs',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      inputSize: 'lg',
    },
  },
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    Omit<VariantProps<typeof inputVariants>, 'size'> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <span className="text-white text-sm uppercase font-bold">{label}</span>}
        <input ref={ref} className={cn(inputVariants({ inputSize, className }))} {...props} />
      </div>
    );
  },
);

Input.displayName = 'Input';
