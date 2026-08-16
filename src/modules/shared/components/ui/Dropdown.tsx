"use client";

import { useState, useRef, useEffect, type ReactElement } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/modules/shared/utils/cn";

export interface DropdownOption {
  id?: string | number;
  value?: string | number;
  label?: string;
  name?: string;
  title?: string;
  [key: string]: unknown;
}

export interface DropdownProps<T extends Record<string, unknown>> {
  options: T[];
  value?: T | string | number | null;
  onChange?: (option: T) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  labelKey?: keyof T;
  valueKey?: keyof T;
  className?: string;
  disabled?: boolean;
}

export function Dropdown<T extends Record<string, unknown>>({
  options,
  value,
  onChange,
  label,
  placeholder = "Seleccionar...",
  error,
  labelKey,
  valueKey,
  className,
  disabled = false,
}: DropdownProps<T>): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<T | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getOptionLabel = (option: T): string => {
    if (labelKey && option[labelKey] !== undefined && option[labelKey] !== null) {
      return String(option[labelKey]);
    }
    if (option.label !== undefined && option.label !== null) return String(option.label);
    if (option.name !== undefined && option.name !== null) return String(option.name);
    if (option.title !== undefined && option.title !== null) return String(option.title);
    return String(option);
  };

  const getOptionValue = (option: T): string | number => {
    if (valueKey && option[valueKey] !== undefined && option[valueKey] !== null) {
      return option[valueKey] as string | number;
    }
    if (option.value !== undefined && option.value !== null) {
      return option.value as string | number;
    }
    if (option.id !== undefined && option.id !== null) {
      return option.id as string | number;
    }
    return getOptionLabel(option);
  };

  const currentOption = (() => {
    if (value === undefined) {
      return internalSelected ?? options[0] ?? null;
    }
    if (value === null) return null;
    if (typeof value === "object") return value as T;
    return options.find((opt) => getOptionValue(opt) === value) ?? null;
  })();

  const handleSelect = (option: T) => {
    if (disabled) return;
    setInternalSelected(option);
    onChange?.(option);
    setIsOpen(false);
  };

  const selectedLabel = currentOption ? getOptionLabel(currentOption) : placeholder;

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <div className="relative flex w-full flex-col gap-1.5" ref={containerRef}>
        {label && (
          <span className={cn("text-sm font-bold uppercase", error ? "text-error" : "text-white")}>
            {label}
          </span>
        )}

        <div className="relative w-full">
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className={cn(
              "bg-surface border-stroke relative flex w-full items-center rounded-lg border text-base text-white transition-colors cursor-pointer outline-none focus:border-white/50",
              error && "border-error focus:border-error",
              disabled && "cursor-not-allowed opacity-60"
            )}
          >
            <div className="relative flex w-full items-center justify-between px-3 py-3">
              <p className={cn("flex-1 text-left text-base text-white", !currentOption && "text-body")}>
                {selectedLabel}
              </p>
              <ChevronDown
                size={18}
                className={cn("text-white transition-transform duration-200", isOpen && "rotate-180")}
              />
            </div>
          </button>

          {isOpen && (
            <div className="bg-surface border-stroke absolute top-[calc(100%+4px)] left-0 z-50 max-h-60 w-full overflow-y-auto rounded-lg border py-1 shadow-lg backdrop-blur-md">
              {options.length === 0 ? (
                <div className="text-body px-3 py-2 text-sm">No hay opciones</div>
              ) : (
                options.map((option, idx) => {
                  const optVal = getOptionValue(option);
                  const optLabel = getOptionLabel(option);
                  const isSelected = currentOption && getOptionValue(currentOption) === optVal;

                  return (
                    <button
                      key={optVal ?? idx}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "w-full px-3 py-2.5 text-left text-base text-white transition-colors hover:bg-surface/70 flex items-center justify-between cursor-pointer",
                        isSelected && "bg-stroke font-semibold"
                      )}
                    >
                      <span>{optLabel}</span>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
      {error && <span className="text-error mt-1.5 text-xs font-medium">{error}</span>}
    </div>
  );
}
