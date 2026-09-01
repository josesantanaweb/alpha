import type { ReactElement } from "react";

export const SliderHomeSkeleton = (): ReactElement => (
  <div className="flex flex-col items-center gap-3">
    <div className="bg-surface relative flex h-47 w-full animate-pulse items-center gap-3 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-white/5" />
    </div>
    <div className="flex items-center gap-1">
      <span className="h-1 w-5 animate-pulse rounded-full bg-white" />
      <span className="h-1 w-2.5 animate-pulse rounded-full bg-white/20" />
      <span className="h-1 w-2.5 animate-pulse rounded-full bg-white/20" />
    </div>
  </div>
);
