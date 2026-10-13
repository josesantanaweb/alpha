"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import type { AdminOrderRow } from "@/modules/admin/types";
import { cn } from "@/modules/shared/utils/cn";

export interface AdminRowActionsProps {
  order: AdminOrderRow;
  onEdit?: (order: AdminOrderRow) => void;
  onDelete?: (order: AdminOrderRow) => void;
}

const MENU_ITEM_CLASSES =
  "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm whitespace-nowrap transition-colors";

export const AdminRowActions = ({
  order,
  onEdit,
  onDelete,
}: AdminRowActionsProps): ReactElement => {
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label="Opciones de la orden"
        title="Opciones"
        className={cn(
          "text-body flex h-8 w-8 border border-transparent cursor-pointer items-center justify-center rounded-md transition-colors",
          isOpen && "bg-surface border-stroke"
        )}
      >
        <Ellipsis size={18} />
      </button>

      {isOpen && (
        <div
          className={cn(
            "bg-surface border-stroke absolute right-0 z-50 w-40 rounded-lg border py-1 shadow-lg backdrop-blur-md",
          )}
        >
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onEdit?.(order);
            }}
            className={cn(MENU_ITEM_CLASSES, "text-body hover:bg-surface/70 hover:text-white")}
          >
            <Pencil size={13} className="text-body" aria-hidden="true" />
            <span>Editar</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onDelete?.(order);
            }}
            className={cn(MENU_ITEM_CLASSES, "text-error hover:bg-error/10")}
          >
            <Trash2 size={13} className="text-error" aria-hidden="true" />
            <span>Eliminar</span>
          </button>
        </div>
      )}
    </div>
  );
};
