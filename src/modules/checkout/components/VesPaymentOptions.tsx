import type { ReactElement } from "react";
import { RadioOption } from "@/modules/shared/components/ui";
import { PAYMENT_PROVIDER_LABELS, PaymentProvider } from "../types";

interface VesPaymentOptionsProps {
  provider: PaymentProvider;
  onProviderChange: (provider: PaymentProvider) => void;
}

export const VesPaymentOptions = ({
  provider,
  onProviderChange,
}: VesPaymentOptionsProps): ReactElement => (
  <RadioOption
    label={PAYMENT_PROVIDER_LABELS[PaymentProvider.MOBILE_PAYMENT]}
    isActive={provider === PaymentProvider.MOBILE_PAYMENT}
    onClick={() => onProviderChange(PaymentProvider.MOBILE_PAYMENT)}
    className="w-1/2"
  />
);
