import type { ReactElement } from "react";
import { RadioOption } from "@/modules/shared/components/ui";
import { PAYMENT_PROVIDER_LABELS, PaymentProvider } from "../types";

interface UsdPaymentOptionsProps {
  provider: PaymentProvider;
  onProviderChange: (provider: PaymentProvider) => void;
}

export const UsdPaymentOptions = ({
  provider,
  onProviderChange,
}: UsdPaymentOptionsProps): ReactElement => (
  <>
    <RadioOption
      label={PAYMENT_PROVIDER_LABELS[PaymentProvider.BINANCE]}
      isActive={provider === PaymentProvider.BINANCE}
      onClick={() => onProviderChange(PaymentProvider.BINANCE)}
      className="w-1/2"
    />
    <RadioOption
      label={PAYMENT_PROVIDER_LABELS[PaymentProvider.ZINLI]}
      isActive={provider === PaymentProvider.ZINLI}
      onClick={() => onProviderChange(PaymentProvider.ZINLI)}
      className="w-1/2"
    />
  </>
);
