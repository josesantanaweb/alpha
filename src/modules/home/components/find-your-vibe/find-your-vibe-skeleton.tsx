import type { ReactElement } from "react";

export const FindYourVibeSkeleton = (): ReactElement => (
  <div className="flex max-w-full gap-5 overflow-hidden pr-10">
    {Array.from({ length: 2 }, (_, i) => (
      <div
        key={i}
        className="bg-surface h-81.5 w-64 shrink-0 animate-pulse overflow-hidden rounded-2xl"
      >
        <div className="h-full w-full bg-white/5" />
      </div>
    ))}
  </div>
);
