import type { ReactElement } from "react";
import { RadioOption } from "@/modules/shared/components/ui";
import type { PaymentProvider } from "../types";

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
      isActive={provider === "binance"}
      onClick={() => onProviderChange("binance")}
      className="w-1/2"
    />
    <RadioOption
      label="Zinli"
      isActive={provider === "zinli"}
      onClick={() => onProviderChange("zinli")}
      className="w-1/2"
    />
  </>
);
