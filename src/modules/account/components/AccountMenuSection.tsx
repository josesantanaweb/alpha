import type { ReactElement, ReactNode } from "react";

interface AccountMenuSectionProps {
  title: string;
  children: ReactNode;
}

export const AccountMenuSection = ({
  title,
  children,
}: AccountMenuSectionProps): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <h6 className="text-body text-sm font-semibold uppercase">{title}</h6>
      <div className="border-stroke divide-stroke flex flex-col divide-y rounded-lg border">
        {children}
      </div>
    </div>
  );
};