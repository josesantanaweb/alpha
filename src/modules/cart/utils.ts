import type { CartProduct } from "./types";
import type { CartWithItems } from "./actions";

type PerfumeSource = {
  id: string;
  name: string;
  image: string | null;
  price: string | number | { toString(): string };
  discount: number;
  designer: { name: string };
};

/**
 * Normalizes a Prisma perfume record (or any compatible shape) into the flat
 * CartProduct type used throughout the cart UI.
 */
export function toCartProduct(perfume: PerfumeSource): CartProduct {
  const price = Number(perfume.price);
  const originalPrice =
    perfume.discount > 0
      ? Math.round(price / (1 - perfume.discount / 100))
      : price;

  return {
    id: perfume.id,
    name: perfume.name,
    designer: perfume.designer.name,
    image: perfume.image ?? "",
    price,
    originalPrice,
  };
}

/**
 * Normalizes a full CartWithItems server response into CartItemData[].
 */
export function normalizeCartItems(
  cart: CartWithItems,
): import("./types").CartItemData[] {
  return cart.items.map((item) => ({
    id: item.id,
    perfumeId: item.perfumeId,
    quantity: item.quantity,
    perfume: toCartProduct(item.perfume),
  }));
}
