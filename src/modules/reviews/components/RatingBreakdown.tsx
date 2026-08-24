import type { ReactElement } from "react";

interface RatingBreakdownProps {
  distribution?: Record<number, number>;
}

export const RatingBreakdown = ({
  distribution,
}: RatingBreakdownProps): ReactElement => {
  const starsList = [5, 4, 3, 2, 1];

  return (
    <div className="flex w-full flex-col gap-1">
      {starsList.map((stars) => {
        const percentage = distribution?.[stars] ?? 50;
        return (
          <div key={stars} className="flex w-full items-center gap-3">
            <span className="text-body text-sm">{stars}</span>
            <div className="bg-stroke flex h-2.5 w-full items-center overflow-hidden rounded-full">
              <span
                className="h-full rounded-full bg-yellow-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
