import type { ReactElement } from "react";
import { RadioOption } from "@/modules/shared/components/ui";
import type { PaymentProvider } from "../types";

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
    isActive={provider === "pago_movil"}
    onClick={() => onProviderChange("pago_movil")}
    className="w-1/2"
  />
);
