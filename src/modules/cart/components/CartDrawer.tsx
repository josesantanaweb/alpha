"use client";

import { useEffect, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
            className="bg-canvas/50 fixed inset-0 z-100 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-canvas fixed top-0 right-0 z-101 flex h-full w-[90%] max-w-md flex-col shadow-2xl"
          >
            <Cart />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
