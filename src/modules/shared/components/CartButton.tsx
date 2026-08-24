"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Handbag } from "lucide-react";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { useCart } from "@/modules/cart/hooks/use-cart";

interface CartButtonProps {
  className?: string;
}

type AnimState = "idle" | "bump" | "wiggle";

const WIGGLE_INTERVAL_MS = 5000;
const BUMP_DURATION_MS = 480;
const WIGGLE_DURATION_MS = 700;

const variants = {
  idle: { scale: 1, rotate: 0 },
  bump: {
    scale: [1, 1.3, 0.9, 1.1, 1],
    rotate: 0,
  },
  wiggle: {
    scale: 1,
    rotate: [0, -18, 18, -12, 12, -6, 6, 0],
  },
};

const transitions: Record<AnimState, object> = {
  idle: { duration: 0.2 },
  bump: { duration: BUMP_DURATION_MS / 1000, ease: "easeInOut" },
  wiggle: { duration: WIGGLE_DURATION_MS / 1000, ease: "easeInOut" },
};

export const CartButton = ({ className }: CartButtonProps): ReactElement => {
  const router = useRouter();
  const { items } = useCart();
  const { setCartDrawerOpen } = useApp();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const prevCountRef = useRef(count);
  const [anim, setAnim] = useState<AnimState>("idle");

  useEffect(() => {
    if (count > prevCountRef.current) {
      setAnim("bump");
      const t = setTimeout(() => setAnim("idle"), BUMP_DURATION_MS);
      prevCountRef.current = count;
      return () => clearTimeout(t);
    }
    prevCountRef.current = count;
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnim((current) => {
        if (current !== "idle") return current; // never interrupt bump
        return "wiggle";
      });
      setTimeout(() => {
        setAnim((current) => (current === "wiggle" ? "idle" : current));
      }, WIGGLE_DURATION_MS);
    }, WIGGLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      type="button"
      className={`relative cursor-pointer text-white transition-colors ${className ?? ""}`}
      onClick={() => setCartDrawerOpen(true)}
      aria-label="Ver carrito"
    >
      <motion.div
        variants={variants}
        animate={anim}
        transition={transitions[anim]}
      >
        <Handbag size={24} />
      </motion.div>

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            className="text-canvas absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] leading-none font-semibold"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
