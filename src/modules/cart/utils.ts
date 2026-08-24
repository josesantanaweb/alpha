import type { CartWithItems } from "./actions";
import type { CartProduct } from "./types";

type PerfumeSource = {
  id: string;
  name: string;
  image: string | null;
  price: string | number | { toString(): string };
  discount: number;
  designer: { name: string };
};

type DecantSource = {
  id: string;
  ml: number;
  price: string | number | { toString(): string };
  image?: string | null;
};

/**
 * Normalizes a Prisma perfume record (or any compatible shape) into the flat
 * CartProduct type used throughout the cart UI.
 * When a decant is provided, its price/ml/image take precedence over the bottle.
 */
export function toCartProduct(
  perfume: PerfumeSource,
  decant?: DecantSource | null
): CartProduct {
  if (decant) {
    const decantPrice = Number(decant.price);

    return {
      id: perfume.id,
      name: perfume.name,
      designer: perfume.designer.name,
      image: decant.image ?? perfume.image ?? "",
      price: decantPrice,
      originalPrice: decantPrice,
      ml: decant.ml,
      decantId: decant.id,
    };
  }

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
  cart: CartWithItems
): import("./types").CartItemData[] {
  return cart.items.map((item) => ({
    id: item.id,
    perfumeId: item.perfumeId,
    quantity: item.quantity,
    perfume: toCartProduct(item.perfume),
  }));
}
