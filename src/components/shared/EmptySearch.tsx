"use client";
import Image from "next/image";
import type { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export const EmptySearch = (): ReactElement => {
  const router = useRouter();

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
          <h4 className="text-xl font-semibold">
            Sin resultados para tu busqueda
          </h4>
          <p className="text-body text-center text-base">
            Intenta ajustar tus filtros o buscar un término más general...
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 flex w-full flex-col items-center gap-3">
        <Button onClick={() => router.push("/explorer")}>Limpiar</Button>
        <Button variant="outline" onClick={() => router.push("/")}>
          Ir al inicio
        </Button>
      </div>
    </div>
  );
};
