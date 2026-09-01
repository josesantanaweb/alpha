import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/modules/shared/utils/cn";

const inputVariants = cva(
  "rounded-lg bg-surface border-stroke text-white placeholder:text-body w-full rounded-lg border px-3 py-2 text-base outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      inputSize: {
        sm: "h-9 text-xs",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      inputSize: "lg",
    },
  }
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    Omit<VariantProps<typeof inputVariants>, "size"> {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, label, error, rightIcon, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col gap-1.5">
          {label && (
            <span
              className={cn(
                "text-sm font-bold uppercase",
                error ? "text-error" : "text-white"
              )}
            >
              {label}
            </span>
          )}
          <div className="relative">
            <input
              ref={ref}
              className={cn(
                inputVariants({ inputSize, className }),
                error && "border-error focus:border-error",
                rightIcon && "pr-10"
              )}
              {...props}
            />
            {rightIcon && (
              <div className="absolute top-1/2 right-3.5 h-4.5 -translate-y-1/2 cursor-pointer">
                {rightIcon}
              </div>
            )}
          </div>
        </div>
        {error && (
          <span className="text-error mt-1.5 text-xs font-medium">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
