"use client";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useState,
  type ReactElement,
  Suspense,
} from "react";
import Image from "next/image";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useAuth } from "@/modules/auth/store";
import { useCart } from "../cart/hooks/use-cart";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { ROUTES } from "@/constants";
import { formatPrice } from "@/modules/shared/utils/format-price";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/constants";
import { Button, Input } from "@/modules/shared/components/ui";
import { TopBar } from "@/modules/shared/components/layout";

export const Checkout = (): ReactElement => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { setHideBottomNav } = useApp();
  const user = useAuth((s) => s.user);
  const isLoading = useAuth((s) => s.isLoading);
  const { items, isLoading: cartLoading } = useCart();

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
  const shipping = itemsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = itemsTotal + shipping;

  const handleFieldChange = (field: "email" | "password", val: string) => {};

  const handleBlur = (field: "email" | "password") => {
    // setErrors((prev) => ({ ...prev, [field]: validators[field](formData[field]) }));
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

      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-semibold text-white">
          1. Método de Entrega
        </h4>
        <div className="flex items-center gap-3">
          <Button>
            <ShoppingCart size={16} className="text-inherit" />
            Delivery
          </Button>
          <Button>
            <ShoppingCart size={16} className="text-inherit" />
            Retiro
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-base font-semibold text-white">
            Datos de entrega
          </h4>

          <div className="flex items-center gap-3">
            <Input
              placeholder="Ej: Jonh"
              label="Nombre"
              type="text"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
            />

            <Input
              placeholder="Ej: Doe"
              label="Apellido"
              type="text"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
            />
          </div>

          <div className="flex items-center gap-3">
            <Input
              placeholder="Ej: jonhdoe@gmail.com"
              label="Correo electrónico"
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
            />
          </div>
        </div>
      </div>

      {/* {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <ShoppingBag size={48} className="text-body" />
          <p className="text-body text-base">Tu carrito está vacío</p>
          <Button onClick={() => router.push(ROUTES.HOME)}>Explorar perfumes</Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border-stroke bg-surface flex items-center gap-4 rounded-2xl border p-4"
              >
                <div className="border-stroke relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-2">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9D9D9]/20 blur-[16px]" />
                  </div>
                  <div className="relative h-14 w-14">
                    <Image
                      src={item.perfume.image}
                      alt={item.perfume.name}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-1 min-w-0 flex-col gap-1">
                  <p className="truncate text-sm font-bold text-white">
                    {item.perfume.name}
                  </p>
                  <p className="text-body text-xs italic">{item.perfume.designer}</p>
                  <p className="text-body text-xs">Cantidad: {item.quantity}</p>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  {item.perfume.originalPrice > item.perfume.price && (
                    <p className="text-body text-xs line-through">
                      {formatPrice(item.perfume.originalPrice * item.quantity, {
                        locale: "es-ES",
                        currency: "USD",
                      })}
                    </p>
                  )}
                  <p className="text-sm font-bold text-white">
                    {formatPrice(item.perfume.price * item.quantity, {
                      locale: "es-ES",
                      currency: "USD",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-stroke flex flex-col gap-3 border-t pt-5">
            <div className="flex items-center justify-between">
              <p className="text-body text-sm">Subtotal</p>
              <p className="text-sm font-semibold text-white">
                {formatPrice(subtotal, { locale: "es-ES", currency: "USD" })}
              </p>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-body text-sm">Descuento</p>
                <p className="text-sm font-semibold text-white">
                  -{formatPrice(discount, { locale: "es-ES", currency: "USD" })}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="text-body text-sm">Envío</p>
              <p className="text-sm font-semibold text-white">
                {shipping === 0
                  ? "Gratis"
                  : formatPrice(shipping, { locale: "es-ES", currency: "USD" })}
              </p>
            </div>
            <div className="border-stroke flex items-center justify-between border-t pt-3">
              <p className="text-lg font-bold text-white">Total</p>
              <p className="text-lg font-bold text-white">
                {formatPrice(total, { locale: "es-ES", currency: "USD" })}
              </p>
            </div>
          </div>

          <Button disabled className="opacity-60 cursor-not-allowed">
            Confirmar pedido (próximamente)
          </Button>
        </>
      )} */}
    </div>
  );
};
