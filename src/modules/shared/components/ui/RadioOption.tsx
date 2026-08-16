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
        "flex items-center border rounded-lg h-12.5 px-4 gap-2 transition-colors cursor-pointer text-left outline-none",
        isActive ? "border-white" : "border-stroke",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-center p-0.5 h-4.5 w-4.5 rounded-full border-2 transition-colors shrink-0",
          isActive ? "border-white" : "border-stroke"
        )}
      >
        <span
          className={cn(
            "rounded-full w-full h-full transition-colors",
            isActive ? "bg-white" : "bg-transparent"
          )}
        />
      </div>
      {content && (
        <p
          className={cn(
            "text-sm transition-colors",
            isActive ? "text-white font-medium" : "text-body"
          )}
        >
          {content}
        </p>
      )}
    </button>
  );
};
