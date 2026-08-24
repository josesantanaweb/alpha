import "server-only";

import { Prisma } from "@prisma/client";

import { db, isPrismaError } from "@/lib/db";
import type { ApiResult } from "@/modules/shared/types";
import { AddCartItemSchema } from "./schema";

const cartInclude = {
  items: {
    include: {
      decant: true,
      perfume: {
        include: {
          designer: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  },
} satisfies Prisma.CartInclude;

export type CartWithItems = Prisma.CartGetPayload<{
  include: typeof cartInclude;
}>;

export async function getUserCart(
  userId: string,
): Promise<ApiResult<CartWithItems | null>> {
  try {
    const cart = await db.cart.findUnique({
      where: { userId },
      include: cartInclude,
    });

    return { success: true, status: 200, data: cart };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error al obtener el carrito.",
    };
  }
}

export async function addItem(
  userId: string,
  rawData: unknown,
): Promise<ApiResult<CartWithItems>> {
  const parsed = AddCartItemSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos inválidos.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { perfumeId, decantId, quantity } = parsed.data;

  try {
    const perfume = await db.perfume.findUnique({
      where: { id: perfumeId },
      select: { id: true },
    });

    if (!perfume) {
      return { success: false, status: 404, message: "Perfume no encontrado." };
    }

    if (decantId) {
      const decant = await db.decant.findFirst({
        where: { id: decantId, perfumeId },
        select: { id: true },
      });

      if (!decant) {
        return {
          success: false,
          status: 404,
          message: "Decant no encontrado para este perfume.",
        };
      }
    }

    const cart = await db.$transaction(async (transaction) => {
      const currentCart = await transaction.cart.upsert({
        where: { userId },
        create: { userId },
        update: {},
        select: { id: true },
      });

      const existingItem = await transaction.cartItem.findFirst({
        where: {
          cartId: currentCart.id,
          perfumeId,
          decantId: decantId ?? null,
        },
        select: { id: true },
      });

      if (existingItem) {
        await transaction.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: { increment: quantity } },
        });
      } else {
        await transaction.cartItem.create({
          data: {
            cartId: currentCart.id,
            perfumeId,
            decantId,
            quantity,
          },
        });
      }

      return transaction.cart.findUniqueOrThrow({
        where: { id: currentCart.id },
        include: cartInclude,
      });
    });

    return {
      success: true,
      status: 201,
      data: cart,
      message: "Producto agregado al carrito.",
    };
  } catch (error: unknown) {
    if (isPrismaError(error) && error.code === "P2003") {
      return { success: false, status: 404, message: "Usuario no encontrado." };
    }

    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error al agregar al carrito.",
    };
  }
}

export async function removeItem(
  userId: string,
  itemId: string,
): Promise<ApiResult<null>> {
  try {
    const { count } = await db.cartItem.deleteMany({
      where: {
        id: itemId,
        cart: { userId },
      },
    });

    if (count === 0) {
      return {
        success: false,
        status: 404,
        message: "Item del carrito no encontrado.",
      };
    }

    return {
      success: true,
      status: 200,
      data: null,
      message: "Item eliminado del carrito.",
    };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error al eliminar el item.",
    };
  }
}
