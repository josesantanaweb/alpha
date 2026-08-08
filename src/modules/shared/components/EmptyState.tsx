"use client";
import type { ReactElement, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/modules/shared/components/ui";
import { cn } from "@/modules/shared/utils/cn";

export interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showClear?: boolean;
  showHome?: boolean;
  clearText?: string;
  onClear?: () => void;
  onHome?: () => void;
  icon?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  title = "Sin resultados para tu búsqueda",
  subtitle = "Intenta ajustar tus filtros o buscar un término más general...",
  showClear = true,
  showHome = true,
  clearText = "Limpiar",
  onClear,
  onHome,
  icon,
  className,
}: EmptyStateProps): ReactElement => {
  const router = useRouter();

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      router.push("/explorer");
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-6 py-10 text-center w-full",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="border-stroke bg-surface mb-4 flex h-28 w-28 items-center justify-center rounded-full border">
          {icon ? (
            icon
          ) : (
            <div className="w-10 h-10 relative">
              <Image
                src="/images/empty-search.svg"
                width={300}
                height={300}
                className="h-full w-full object-contain"
                alt="empty-state"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-1.5 max-w-xs">
          <h4 className="text-lg font-semibold text-white">{title}</h4>
          {subtitle && (
            <p className="text-body text-center text-sm">{subtitle}</p>
          )}
        </div>
      </div>

      {(showClear || showHome) && (
        <div className="flex w-full max-w-xs flex-col items-center gap-2.5">
          {showClear && (
            <Button onClick={handleClear} className="w-full">
              {clearText}
            </Button>
          )}
          {showHome && (
            <Button
              variant={showClear ? "outline" : "primary"}
              onClick={handleHome}
              className="w-full"
            >
              Explorar catálogo
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
