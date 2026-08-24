"use client";

import { useEffect, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { FREE_SHIPPING_THRESHOLD, ROUTES, SHIPPING_FEE } from "@/constants";
import { TopBar } from "@/modules/shared/components/layout";
import { Button } from "@/modules/shared/components/ui";
import { useApp } from "@/modules/shared/stores";
import { useAuth } from "@/modules/auth/store";
import { useCart } from "@/modules/cart/hooks";
import { useCreateOrder } from "../hooks/use-create-order";
import {
  DeliveryMethod,
  INITIAL_FORM,
  type CheckoutFormData,
  type FormErrors,
} from "../types";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";
import { ContactForm } from "./ContactForm";
import { DeliveryMethodSelector } from "./DeliveryMethodSelector";
import { PaymentPreferenceSelector } from "./PaymentPreferenceSelector";
import { ShippingAddressForm } from "./ShippingAddressForm";

export const Checkout = (): ReactElement => {
  const router = useRouter();
  const { setHideBottomNav } = useApp();
  const user = useAuth((s) => s.user);
  const isLoading = useAuth((s) => s.isLoading);
  const { items, isLoading: cartLoading } = useCart();
  const { mutate: createOrder, isPending, isError, error } = useCreateOrder();

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
  const isDelivery = formData.deliveryMethod === DeliveryMethod.DELIVERY;
  const shipping = isDelivery
    ? itemsTotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE
    : 0;
  const total = itemsTotal + shipping;

  const isFormValid = (() => {
    if (!formData.firstName.trim()) return false;
    if (!formData.lastName.trim()) return false;
    if (!formData.email.trim()) return false;
    if (!formData.phone.trim()) return false;
    if (isDelivery) {
      if (!formData.city.trim()) return false;
      if (!formData.address.trim()) return false;
    }
    return true;
  })();

  const mockSubtotal = items.length > 0 ? itemsTotal : 48.0;
  const mockDiscount = items.length > 0 ? discount : 12.0;
  const mockShipping: number | typeof DeliveryMethod.PICKUP =
    items.length > 0
      ? isDelivery
        ? shipping
        : DeliveryMethod.PICKUP
      : isDelivery
        ? 5.0
        : DeliveryMethod.PICKUP;
  const mockTotal =
    items.length > 0
      ? total
      : mockSubtotal -
        mockDiscount +
        (mockShipping === DeliveryMethod.PICKUP ? 0 : (mockShipping as number));

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
      ...(method === DeliveryMethod.PICKUP ? { city: "", address: "" } : {}),
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

    createOrder(
      {
        ...formData,
        items: items.map((i) => ({
          perfumeId: i.perfumeId,
          decantId: i.perfume.decantId ?? undefined,
          quantity: i.quantity,
        })),
        subtotal,
        discount,
        shipping,
        total,
      },
      {
        onSuccess: () => {
          router.push(ROUTES.ACCOUNT);
        },
      }
    );
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

      <div className="flex flex-col gap-3">
        <CheckoutOrderSummary
          items={items}
          subtotal={mockSubtotal}
          discount={mockDiscount}
          shipping={mockShipping}
          total={mockTotal}
        />

        {isError && (
          <p className="text-center text-sm text-red-400">
            {error instanceof Error
              ? error.message
              : "Error al crear el pedido. Intenta de nuevo."}
          </p>
        )}

        <Button onClick={handleSubmit} disabled={isPending || !isFormValid}>
          {isPending ? "Creando pedido..." : "Confirmar pedido"}
        </Button>
      </div>
    </div>
  );
};
