import type { ReactElement } from "react";
import { RadioOption } from "@/modules/shared/components/ui";
import { PaymentNotice } from "./PaymentNotice";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { PaymentCurrency, PaymentProvider } from "../types";

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
    if (newCurrency === PaymentCurrency.VES) {
      onProviderChange(PaymentProvider.MOBILE_PAYMENT);
    } else {
      onProviderChange(PaymentProvider.BINANCE);
    }
  };

  return (
    <section className="flex flex-col gap-3">
      <h4 className="text-lg font-semibold text-white">
        {stepNumber}. {String.fromCharCode(191)}Cómo prefieres pagar?
      </h4>

      <PaymentNotice />

      <div className="flex items-center gap-3">
        <RadioOption
          label="Bolívares"
          isActive={currency === PaymentCurrency.VES}
          onClick={() => handleCurrencySelect(PaymentCurrency.VES)}
          className="w-1/2"
        />
        <RadioOption
          label="Dólares"
          isActive={currency === PaymentCurrency.USD}
          onClick={() => handleCurrencySelect(PaymentCurrency.USD)}
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