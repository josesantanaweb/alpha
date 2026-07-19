"use client";
import type { ReactElement } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDesigners } from "@/modules/designers/hooks/use-designers";

export const DesignerMarquee = (): ReactElement | null => {
  const { data, isLoading } = useDesigners();

  if (isLoading || !data?.length) return null;

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
        {[...data, ...data].map((designer, index) => (
          <div key={`${designer.id}-${index}`} className="w-12 shrink-0">
            {designer.image ? (
              <Image
                src={designer.image}
                alt={designer.name}
                width={300}
                height={300}
                className="h-full w-full"
              />
            ) : (
              <p className="text-body text-center text-xs">{designer.name}</p>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
