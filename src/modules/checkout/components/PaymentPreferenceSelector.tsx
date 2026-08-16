import type { ReactElement } from "react";
import { RadioOption } from "@/modules/shared/components/ui";
import { PaymentNotice } from "./PaymentNotice";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import type { PaymentCurrency, PaymentProvider } from "../types";

type PaymentPreferenceSelectorProps = {
  currency: PaymentCurrency;
  provider: PaymentProvider;
  onCurrencyChange: (currency: PaymentCurrency) => void;
  onProviderChange: (provider: PaymentProvider) => void;
  stepNumber?: number | string;
};

export const PaymentPreferenceSelector = ({
  currency,
  provider,
  onCurrencyChange,
  onProviderChange,
  stepNumber = 2,
}: PaymentPreferenceSelectorProps): ReactElement => {
  const handleCurrencySelect = (newCurrency: PaymentCurrency) => {
    onCurrencyChange(newCurrency);
    if (newCurrency === "ves") {
      onProviderChange("pago_movil");
    } else {
      onProviderChange("binance");
    }
  };

  return (
    <section className="flex flex-col gap-3">
      <h4 className="text-lg font-semibold text-white">
        {stepNumber}. ¿Cómo prefieres pagar?
      </h4>

      <PaymentNotice />

      <div className="flex items-center gap-3">
        <RadioOption
          label="Bolívares (Bs. VES)"
          isActive={currency === "ves"}
          onClick={() => handleCurrencySelect("ves")}
          className="w-1/2"
        />
        <RadioOption
          label="Dólares ($ USD)"
          isActive={currency === "usd"}
          onClick={() => handleCurrencySelect("usd")}
          className="w-1/2"
        />
      </div>

      <PaymentMethodSelector
        currency={currency}
        provider={provider}
        onProviderChange={onProviderChange}
      />
    </section>
  );
};
