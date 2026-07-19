"use client";
import type { ReactElement } from "react";
import { useDesigners } from "@/modules/designers/hooks/use-designers";
import Image from "next/image";
import { cn } from "@/modules/shared/utils/cn";

interface FilterDesignerProps {
  value: string | null;
  onChange: (v: string | null) => void;
}

export const FilterDesigner = ({
  value,
  onChange,
}: FilterDesignerProps): ReactElement => {
  const { data: designers } = useDesigners();

  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-base font-semibold text-white">Diseñador</h4>
      <div className="grid grid-cols-4 flex-wrap items-center gap-2">
        {designers?.map((designer) => (
              <div
                key={designer.id}
                onClick={() => onChange(value === designer.name ? null : designer.name)}
                className={cn(
                  "group hover:bg-white transition-all flex h-20 items-center justify-center rounded-2xl border p-3 cursor-pointer",
                  value === designer.name
                    ? "bg-white"
                    : "bg-surface border-stroke",
                )}
              >
                <Image
                  src={designer.image || "/images/versace.svg"}
                  width={200}
                  height={200}
                  alt={designer.name}
                  className={cn("w-10", value === designer.name ? "invert" : "group-hover:invert")}
                />
              </div>
        ))}
      </div>
    </div>
  );
};
