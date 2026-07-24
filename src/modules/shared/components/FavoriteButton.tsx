"use client";

import type { ReactElement } from "react";
import { Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
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
      className="cursor-pointer w-12.5 h-12.5 shrink-0 inline-flex items-center rounded-md justify-center bg-white text-surface transition-all hover:-translate-y-0.5 disabled:opacity-50"
      onClick={() => toggle(perfumeId)}
      disabled={loading}
      whileTap={loading ? {} : { scale: 0.85 }}
    >
      {loading ? (
        <Loader2 size={24} className="animate-spin text-surface" />
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