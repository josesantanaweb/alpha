"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactElement } from "react";
import { useAuth } from "@/modules/auth/store";
import { useCart } from "../cart/hooks/use-cart";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { ROUTES } from "@/constants";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/constants";
import { Button } from "@/modules/shared/components/ui";
import { TopBar } from "@/modules/shared/components/layout";
import { OrderSummary } from "@/modules/shared/components/OrderSummary";
import { DeliveryMethodSelector } from "./components/DeliveryMethodSelector";
import { ContactForm } from "./components/ContactForm";
import { ShippingAddressForm } from "./components/ShippingAddressForm";
import { PaymentPreferenceSelector } from "./components/PaymentPreferenceSelector";

import {
  type CheckoutFormData,
  type DeliveryMethod,
  type FormErrors,
  INITIAL_FORM,
} from "./types";

export const Checkout = (): ReactElement => {
  const router = useRouter();
  const { setHideBottomNav } = useApp();
  const user = useAuth((s) => s.user);
  const isLoading = useAuth((s) => s.isLoading);
  const { items, isLoading: cartLoading } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`${ROUTES.LOGIN}?redirect=checkout`);
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    setHideBottomNav(true);
    return () => setHideBottomNav(false);
  }, [setHideBottomNav]);

  const subtotal = items.reduce(
    (acc, item) => acc + item.perfume.originalPrice * item.quantity,
    0
  );
  const discount = items.reduce((acc, item) => {
    const savings = Math.max(
      item.perfume.originalPrice - item.perfume.price,
      0
    );
    return acc + savings * item.quantity;
  }, 0);
  const itemsTotal = subtotal - discount;
  const isDelivery = formData.deliveryMethod === "delivery";
  const shipping = isDelivery
    ? itemsTotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE
    : 0;
  const total = itemsTotal + shipping;

  const mockSubtotal = items.length > 0 ? itemsTotal : 48.0;
  const mockDiscount = items.length > 0 ? discount : 12.0;
  const mockShipping: number | "pickup" =
    items.length > 0
      ? isDelivery
        ? shipping
        : "pickup"
      : isDelivery
        ? 5.0
        : "pickup";
  const mockTotal =
    items.length > 0
      ? total
      : mockSubtotal -
        mockDiscount +
        (mockShipping === "pickup" ? 0 : (mockShipping as number));

  const setField = <K extends keyof CheckoutFormData>(
    field: K,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setDeliveryMethod = (method: DeliveryMethod) => {
    setFormData((prev) => ({
      ...prev,
      deliveryMethod: method,
      ...(method === "pickup" ? { city: "", address: "" } : {}),
    }));
    setErrors({});
  };

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!formData.firstName.trim()) next.firstName = "Requerido";
    if (!formData.lastName.trim()) next.lastName = "Requerido";
    if (!formData.email.trim()) next.email = "Requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      next.email = "Correo inválido";
    if (!formData.phone.trim()) next.phone = "Requerido";

    if (isDelivery) {
      if (!formData.city.trim()) next.city = "Requerido";
      if (!formData.address.trim()) next.address = "Requerido";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // TODO: await createOrder({ ...formData, items, subtotal, discount, shipping, total })
    console.log("Checkout payload:", {
      ...formData,
      items: items.map((i) => ({
        perfumeId: i.perfume.id,
        quantity: i.quantity,
      })),
      subtotal,
      discount,
      shipping,
      total,
    });
  };

  if (isLoading || cartLoading) {
    return (
      <div className="flex w-full flex-col gap-5 p-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface h-24 w-full animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 p-5">
      <TopBar title="Mi pedido" isCheckout />

      <DeliveryMethodSelector
        value={formData.deliveryMethod}
        onChange={setDeliveryMethod}
      />

      <div className="flex flex-col gap-4">
        <ContactForm values={formData} errors={errors} onChange={setField} />

        {isDelivery && (
          <ShippingAddressForm
            values={formData}
            errors={errors}
            onChange={setField}
          />
        )}

        <PaymentPreferenceSelector
          currency={formData.paymentCurrency}
          provider={formData.paymentProvider}
          onCurrencyChange={(currency) => setField("paymentCurrency", currency)}
          onProviderChange={(provider) => setField("paymentProvider", provider)}
        />
      </div>

       <section className="flex flex-col gap-3">
        <h4 className="text-lg font-semibold text-white">
          3. Resumen de la Orden
        </h4>
        <OrderSummary
          subtotal={mockSubtotal}
          discount={mockDiscount}
          shipping={mockShipping}
          total={mockTotal}
        />
      </section>

      <Button onClick={handleSubmit}>Confirmar pedido</Button>
    </div>
  );
};
