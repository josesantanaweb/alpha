"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { useFavorites } from "@/modules/favorites/hooks/use-favorites";

interface FavoriteButtonProps {
  perfumeId: string;
}

export const FavoriteButton = ({
  perfumeId,
}: FavoriteButtonProps): ReactElement => {
  const { toggle, isFavorite, isPending } = useFavorites();
  const liked = isFavorite(perfumeId);
  const loading = isPending(perfumeId);

  return (
    <motion.button
      className="text-surface inline-flex h-12.5 w-12.5 shrink-0 cursor-pointer items-center justify-center rounded-md bg-white transition-all hover:-translate-y-0.5 disabled:opacity-50"
      onClick={() => toggle(perfumeId)}
      disabled={loading}
      whileTap={loading ? {} : { scale: 0.85 }}
    >
      {loading ? (
        <Loader2 size={24} className="text-surface animate-spin" />
      ) : (
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
            size={24}
            className={liked ? "text-primary" : "text-surface"}
            fill={liked ? "currentColor" : "none"}
          />
        </motion.span>
      )}
    </motion.button>
  );
};
