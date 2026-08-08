"use client";
import { useEffect, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { Cart } from "./Cart";

export const CartDrawer = (): ReactElement => {
  const { isCartDrawerOpen, setCartDrawerOpen } = useApp();

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartDrawerOpen]);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartDrawerOpen(false)}
            className="absolute inset-0 z-[100] bg-canvas/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 z-[101] flex h-full w-[90%] flex-col bg-canvas shadow-2xl"
          >
            <Cart />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
