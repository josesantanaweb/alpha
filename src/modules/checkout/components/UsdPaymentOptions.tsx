import type { ReactElement } from "react";
import { RadioOption } from "@/modules/shared/components/ui";
import { PaymentProvider } from "../types";

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
      label="Binance Pay"
      isActive={provider === PaymentProvider.BINANCE}
      onClick={() => onProviderChange(PaymentProvider.BINANCE)}
      className="w-1/2"
    />
    <RadioOption
      label="Zinli"
      isActive={provider === PaymentProvider.ZINLI}
      onClick={() => onProviderChange(PaymentProvider.ZINLI)}
      className="w-1/2"
    />
  </>
);