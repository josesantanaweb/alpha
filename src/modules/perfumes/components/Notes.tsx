"use client";
import { useState, type ReactElement } from "react";
import Image from "next/image";
import { Plus, Minus, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const Notes = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-stroke flex flex-col gap-3 border-b py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between"
      >
        <h3 className="text-lg font-bold text-white">Notas destacadas</h3>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <h6 className="text-sm font-semibold uppercase">
                  Notas de salida
                </h6>
                <button className="text-white">
                  <Info size={16} />
                </button>
              </div>
              <div className="flex w-full flex-wrap gap-3">
                <div className="bg-surface border-stroke flex h-22 w-22 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border">
                  <Image
                    src={"/images/mandarina.png"}
                    alt="mandarina"
                    width={200}
                    height={200}
                    className="w-10 h-10 object-cover"
                  />
                  <p className="text-xs text-white">Mandarina</p>
                </div>
                <div className="bg-surface border-stroke flex h-22 w-22 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border">
                  <Image
                    src={"/images/moscada.png"}
                    alt="moscada"
                    width={200}
                    height={200}
                    className="w-10 h-10 object-cover"
                  />
                  <p className="text-xs text-white">Moscada</p>
                </div>
                <div className="bg-surface border-stroke flex h-22 w-22 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border">
                  <Image
                    src={"/images/vainilla.png"}
                    alt="vainilla"
                    width={200}
                    height={200}
                    className="w-10 h-10 object-cover"
                  />
                  <p className="text-xs text-white">Vainilla</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
