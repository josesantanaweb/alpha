"use client";
import type { ReactElement } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Banner } from "@prisma/client";
import { SliderHomeDots, SliderHomeSlide, SliderHomeSkeleton } from ".";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

interface SliderHomeProps {
  banners: Banner[];
  loading: boolean;
}

export const SliderHome = ({
  banners,
  loading,
}: SliderHomeProps): ReactElement => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  if (loading) return <SliderHomeSkeleton />;
  if (!banners.length) return <div />;

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="bg-surface relative flex h-47 w-full items-center gap-3 overflow-hidden rounded-2xl">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <SliderHomeSlide banner={banners[current]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <SliderHomeDots total={banners.length} current={current} goTo={goTo} />
    </div>
  );
};
