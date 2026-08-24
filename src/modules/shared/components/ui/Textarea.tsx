import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/modules/shared/utils/cn";

const textareaVariants = cva(
  "rounded-lg bg-surface border-stroke text-white placeholder:text-body w-full border px-3 py-2 text-base outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60 resize-none min-h-[100px]",
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, label, error, ...props }, ref) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <span
            className={cn(
              "text-sm font-bold uppercase",
              error ? "text-error" : "text-white",
            )}
          >
            {label}
          </span>
        )}
        <textarea
          ref={ref}
          className={cn(
            textareaVariants({ className }),
            error && "border-error focus:border-error",
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="text-error mt-1.5 text-xs font-medium">
          {error}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";
