import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/modules/shared/utils/cn";

export interface RadioOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: ReactNode;
  isActive?: boolean;
}

export const RadioOption = ({
  label,
  isActive = false,
  children,
  className,
  onClick,
  ...props
}: RadioOptionProps) => {
  const content = label ?? children;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-12.5 cursor-pointer items-center gap-2 rounded-lg border px-4 text-left transition-colors outline-none",
        isActive ? "border-white" : "border-stroke",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 p-0.5 transition-colors",
          isActive ? "border-white" : "border-stroke"
        )}
      >
        <span
          className={cn(
            "h-full w-full rounded-full transition-colors",
            isActive ? "bg-white" : "bg-transparent"
          )}
        />
      </div>
      {content && (
        <p
          className={cn(
            "text-base transition-colors",
            isActive ? "font-medium text-white" : "text-body"
          )}
        >
          {content}
        </p>
      )}
    </button>
  );
};
