import type { ReactElement, ReactNode } from "react";
import { cn } from "@/modules/shared/utils/cn";

interface PaymentNoticeProps {
  children?: ReactNode;
  className?: string;
}

export const PaymentNotice = ({
  children = "Solo necesitamos conocer tu preferencia. No realizarás ningún pago en este momento. Confirmaremos tu pedido por WhatsApp antes de que transfieras.",
  className,
}: PaymentNoticeProps): ReactElement => (
  <div
    className={cn(
      "border-stroke bg-surface mb-1 rounded-lg border p-3 italic",
      className
    )}
  >
    <p className="text-body text-sm">{children}</p>
  </div>
);
