"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/modules/shared/utils";
import { ReviewSort } from "../types";

interface SortOption {
  value: ReviewSort;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: ReviewSort.RECENT, label: "Recientes" },
  { value: ReviewSort.RATING, label: "Mejor calificación" },
  { value: ReviewSort.HELPFUL, label: "Más útiles" },
];

interface ReviewSortMenuProps {
  value: ReviewSort;
  onChange: (value: ReviewSort) => void;
}

export const ReviewSortMenu = ({
  value,
  onChange,
}: ReviewSortMenuProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected =
    SORT_OPTIONS.find((opt) => opt.value === value) ?? SORT_OPTIONS[0];

  return (
    <div className="flex w-full items-center justify-end">
      <div className="flex items-center gap-3">
        <p className="text-body text-sm">Ordenar por:</p>
        <div className="relative" ref={containerRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="flex cursor-pointer items-center gap-1"
          >
            <p className="text-sm font-semibold text-white">{selected.label}</p>
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>

          {isOpen && (
            <div className="bg-surface border-stroke absolute top-[calc(100%+4px)] right-0 z-50 min-w-40 rounded-lg border py-1 shadow-lg">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "hover:bg-stroke block w-full cursor-pointer px-3 py-2 text-left text-sm text-white transition-colors",
                    opt.value === value && "font-semibold"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
