import type { ReactElement } from "react";
import { VesPaymentOptions } from "./VesPaymentOptions";
import { UsdPaymentOptions } from "./UsdPaymentOptions";
import { PaymentCurrency, PaymentProvider } from "../types";

type PaymentMethodSelectorProps = {
  currency: PaymentCurrency;
  provider: PaymentProvider;
  onProviderChange: (provider: PaymentProvider) => void;
};

export const PaymentMethodSelector = ({
  currency,
  provider,
  onProviderChange,
}: PaymentMethodSelectorProps): ReactElement => (
  <div className="mt-1 flex flex-col gap-3">
    <h5 className="text-base font-semibold text-white">Método de Pago</h5>
    <div className="flex items-center gap-3">
      {currency === PaymentCurrency.VES ? (
        <VesPaymentOptions
          provider={provider}
          onProviderChange={onProviderChange}
        />
      ) : (
        <UsdPaymentOptions
          provider={provider}
          onProviderChange={onProviderChange}
        />
      )}
    </div>
  </div>
);