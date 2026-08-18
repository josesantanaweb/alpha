import type { ReactElement } from "react";
import { RadioOption } from "@/modules/shared/components/ui";
import { PaymentProvider } from "../types";

interface VesPaymentOptionsProps {
  provider: PaymentProvider;
  onProviderChange: (provider: PaymentProvider) => void;
}

export const VesPaymentOptions = ({
  provider,
  onProviderChange,
}: VesPaymentOptionsProps): ReactElement => (
  <RadioOption
    label="Pago Móvil"
    isActive={provider === PaymentProvider.MOBILE_PAYMENT}
    onClick={() => onProviderChange(PaymentProvider.MOBILE_PAYMENT)}
    className="w-1/2"
  />
);
