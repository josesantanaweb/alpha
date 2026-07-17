"use client";
import { useEffect } from "react";
import Image from "next/image";
import type { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/modules/shared/components/ui";
import { useApp } from "@/modules/shared/stores/use-ui-store";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showClear?: boolean;
}

export const EmptyState = ({
  title = "Sin resultados para tu busqueda",
  subtitle = "Intenta ajustar tus filtros o buscar un término más general...",
  showClear = true,
}: EmptyStateProps): ReactElement => {
  const router = useRouter();
  const { setHideBottomNav } = useApp();

  useEffect(() => {
    setHideBottomNav(true);
    return () => setHideBottomNav(false);
  }, [setHideBottomNav]);

  return (
    <div className="relative flex h-[calc(100vh-320px)] flex-col items-center justify-center gap-3">
      <div className="flex flex-col justify-center items-center -mt-20">
        <div className="border-stroke bg-surface mb-6 flex h-32.5 w-32.5 items-center justify-center rounded-full border">
          <div className="w-12">
            <Image
              src="/images/empty-search.svg"
              width={300}
              height={300}
              className="h-full w-full"
              alt="empty-search"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <h4 className="text-xl font-semibold">{title}</h4>
          <p className="text-body text-center text-base">{subtitle}</p>
        </div>
      </div>
      <div className="absolute bottom-0 flex w-full flex-col items-center gap-3">
        {showClear && (
          <Button onClick={() => router.push("/explorer")}>Limpiar</Button>
        )}
        <Button variant="outline" onClick={() => router.push("/")}>
          Ir al inicio
        </Button>
      </div>
    </div>
  );
};
