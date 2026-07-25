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
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Omit<VariantProps<typeof inputVariants>, 'size'> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-1.5 w-full">
          {label && <span className={cn("text-sm uppercase font-bold", error ? "text-error" : "text-white")}>{label}</span>}
          <input
            ref={ref}
            className={cn(
              inputVariants({ inputSize, className }),
              error && "border-error focus:border-error"
            )}
            {...props}
          />
        </div>
        {error && <span className="text-error text-xs mt-1.5 font-medium">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
