"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  liked: boolean;
  onToggle: () => void;
}

export const LikeButton = ({
  liked,
  onToggle,
}: LikeButtonProps): ReactElement => {
  return (
    <motion.button
      type="button"
      aria-pressed={liked}
      className="cursor-pointer"
      onClick={onToggle}
      whileTap={{ scale: 0.85 }}
    >
      <motion.span
        key={liked ? "liked" : "unliked"}
        className="inline-flex"
        initial={{ scale: liked ? 0.6 : 1 }}
        animate={{ scale: 1 }}
        transition={
          liked
            ? { type: "spring", stiffness: 500, damping: 12 }
            : { duration: 0.15 }
        }
      >
        <Heart
          size={20}
          className={liked ? "text-primary" : "text-white"}
          fill={liked ? "currentColor" : "none"}
        />
      </motion.span>
    </motion.button>
  );
};
