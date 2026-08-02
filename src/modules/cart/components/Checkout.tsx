"use client";
import { useEffect, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useAuth } from "@/modules/auth/store";
import { useCart } from "../hooks/use-cart";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { ROUTES } from "@/constants";
import { formatPrice } from "@/modules/shared/utils/format-price";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/constants";
import { Button } from "@/modules/shared/components/ui";

export const Checkout = (): ReactElement => {
  const router = useRouter();
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
    0,
  );
  const discount = items.reduce((acc, item) => {
    const savings = Math.max(item.perfume.originalPrice - item.perfume.price, 0);
    return acc + savings * item.quantity;
  }, 0);
  const itemsTotal = subtotal - discount;
  const shipping = itemsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = itemsTotal + shipping;

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
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-body hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white">Resumen del pedido</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <ShoppingBag size={48} className="text-body" />
          <p className="text-body text-base">Tu carrito está vacío</p>
          <Button onClick={() => router.push(ROUTES.HOME)}>Explorar perfumes</Button>
        </div>
      ) : (
        <>
          {/* Items list */}
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border-stroke bg-surface flex items-center gap-4 rounded-2xl border p-4"
              >
                {/* Image */}
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

                {/* Info */}
                <div className="flex flex-1 min-w-0 flex-col gap-1">
                  <p className="truncate text-sm font-bold text-white">
                    {item.perfume.name}
                  </p>
                  <p className="text-body text-xs italic">{item.perfume.designer}</p>
                  <p className="text-body text-xs">Cantidad: {item.quantity}</p>
                </div>

                {/* Price */}
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

          {/* Summary */}
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

          {/* CTA placeholder */}
          <Button disabled className="opacity-60 cursor-not-allowed">
            Confirmar pedido (próximamente)
          </Button>
        </>
      )}
    </div>
  );
};
