"use client";
import { useState, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/modules/shared/components/ui";
import { FavoriteButton } from "./FavoriteButton";
import { useCartStore } from "@/modules/cart/store";
import type { CartProduct } from "@/modules/cart/types";

interface AddToCartProps {
  perfumeId: string;
  perfume: CartProduct;
}

export const AddToCart = ({ perfumeId, perfume }: AddToCartProps): ReactElement => {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(perfumeId, perfume);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto flex items-center gap-3 bg-surface p-4 md:max-w-md">
      <FavoriteButton perfumeId={perfumeId} />
      <Button
        onClick={handleAddToCart}
        disabled={added}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Check size={16} />
              Agregado
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              Agregar al carrito
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
};
