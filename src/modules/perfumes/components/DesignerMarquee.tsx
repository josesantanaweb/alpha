"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDesigners } from "@/modules/designers/hooks/use-designers";

export const DesignerMarquee = (): ReactElement | null => {
  const { data: designer, isLoading } = useDesigners();

  if (isLoading || !designer?.length) return null;

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max gap-6"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {[...designer, ...designer].map((designer, index) => (
          <div key={`${designer.id}-${index}`} className="w-12 shrink-0">
            <Image
              src={designer.image || "/images/versace.svg"}
              alt={designer.name}
              width={300}
              height={300}
              className="h-full w-full"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
