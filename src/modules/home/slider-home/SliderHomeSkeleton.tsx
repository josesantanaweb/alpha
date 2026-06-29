import type { ReactElement } from "react";

export const SliderHomeSkeleton = (): ReactElement => (
  <div className="flex flex-col gap-3 items-center">
    <div className="bg-surface relative flex h-47 w-full items-center gap-3 overflow-hidden rounded-2xl animate-pulse">
      <div className="absolute inset-0 bg-white/5" />
    </div>
    <div className="flex items-center gap-1">
      <span className="h-1 w-5 rounded-full bg-white animate-pulse" />
      <span className="h-1 w-2.5 rounded-full bg-white/20 animate-pulse" />
      <span className="h-1 w-2.5 rounded-full bg-white/20 animate-pulse" />
    </div>
  </div>
);
