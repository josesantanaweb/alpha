"use client";

import { useCallback, useRef, useState, type ReactElement } from "react";
import type { Banner } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { SliderHomeDots, SliderHomeSkeleton, SliderHomeSlide } from ".";

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
  const touchStartX = useRef(0);
  const isTouching = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const paginate = useCallback(
    (newDirection: number) => {
      const next = current + newDirection;
      if (next < 0 || next >= banners.length) return;
      setDirection(newDirection);
      setCurrent(next);
    },
    [current, banners.length]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isTouching.current = true;
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        paginate(diff > 0 ? 1 : -1);
      }
    },
    [paginate]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isTouching.current) return;
    touchStartX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (isTouching.current) {
        isTouching.current = false;
        return;
      }
      const diff = touchStartX.current - e.clientX;
      if (Math.abs(diff) > 40) {
        paginate(diff > 0 ? 1 : -1);
      }
    },
    [paginate]
  );

  if (loading) return <SliderHomeSkeleton />;
  if (!banners.length) return <div />;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="bg-surface relative flex h-47 w-full items-center gap-3 overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
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
