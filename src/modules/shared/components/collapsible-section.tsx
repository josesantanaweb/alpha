"use client";

import { useState, type ReactElement, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

export interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection = ({
  title,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-stroke flex flex-col border-b py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
