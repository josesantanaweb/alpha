import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/modules/shared/utils/cn";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, indeterminate = false, className, ...props }, ref) => (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked}
        ref={(node) => {
          if (node) {
            node.indeterminate = indeterminate;
          }
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className="sr-only"
        {...props}
      />
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-sm border transition-colors",
          checked || indeterminate ? "bg-white text-stroke" : "bg-surface border-stroke",
          className
        )}
      >
        {indeterminate ? (
          <Minus className="text-surface" size={14} strokeWidth={4} aria-hidden="true" />
        ) : checked ? (
          <Check className="text-surface" size={14} strokeWidth={4} aria-hidden="true" />
        ) : null}
      </span>
    </label>
  )
);

Checkbox.displayName = "Checkbox";
