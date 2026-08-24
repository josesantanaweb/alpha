"use client";
import { useState, type ReactElement } from "react";
import { Input, Dropdown } from "@/modules/shared/components/ui";
import type { CheckoutFormData, FormErrors } from "../types";

const SHIPPING_CARRIERS = [
  { id: "mrw", label: "MRW" },
  { id: "zoom", label: "ZOOM" },
  { id: "tealca", label: "Tealca" },
  { id: "domesa", label: "Domesa" },
];

type ShippingAddressFormProps = {
  values: Pick<CheckoutFormData, "city" | "address">;
  errors: FormErrors;
  onChange: <K extends keyof CheckoutFormData>(field: K, value: string) => void;
};

export const ShippingAddressForm = ({
  values,
  errors,
  onChange,
}: ShippingAddressFormProps): ReactElement => {
  const [selectedCarrier, setSelectedCarrier] = useState(SHIPPING_CARRIERS[0]);

  return (
    <section className="flex flex-col gap-4">
      <Dropdown
        label="Agencia de envío"
        options={SHIPPING_CARRIERS}
        value={selectedCarrier}
        onChange={(option) => setSelectedCarrier(option)}
      />
      <Input
        placeholder="Ej: Caracas, Distrito Capital"
        label="Ciudad / Estado"
        type="text"
        value={values.city}
        onChange={(e) => onChange("city", e.target.value)}
        error={errors.city}
      />

      <Input
        placeholder="Ej: Av. Francisco de Miranda, Edif. Galipán, Piso 4"
        label="Dirección de destino"
        type="text"
        value={values.address}
        onChange={(e) => onChange("address", e.target.value)}
        error={errors.address}
      />
    </section>
  );
};

