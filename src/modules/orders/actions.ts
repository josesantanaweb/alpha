import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import type { ApiResult } from "@/modules/shared/types";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/constants";
import { CreateOrderSchema } from "./schema";
import { orderInclude, type OrderWithItems } from "./types";

const DELIVERY_METHOD_MAP = {
  DELIVERY: "DELIVERY",
  PICKUP: "PICKUP",
} as const;

const CURRENCY_MAP = {
  VES: "VES",
  USD: "USD",
} as const;

const PAYMENT_METHOD_MAP = {
  MOBILE_PAYMENT: "MOBILE_PAYMENT",
  BINANCE: "BINANCE",
  ZINLI: "ZINLI",
} as const;

export async function createOrder(
  userId: string,
  rawData: unknown,
): Promise<ApiResult<OrderWithItems>> {
  const parsed = CreateOrderSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos inválidos.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            perfume: { select: { id: true, name: true, price: true, discount: true, stock: true } },
            decant: { select: { id: true, price: true, stock: true } },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        status: 400,
        message: "El carrito está vacío.",
      };
    }

    const requestedItems = data.items;
    const cartItemMap = new Map(cart.items.map((i) => [i.perfumeId, i]));

    for (const reqItem of requestedItems) {
      const cartItem = cartItemMap.get(reqItem.perfumeId);
      if (!cartItem) {
        return {
          success: false,
          status: 400,
          message: `El producto no está en tu carrito.`,
        };
      }

      if (reqItem.decantId) {
        const decant = cartItem.decant;
        if (!decant || decant.id !== reqItem.decantId) {
          return {
            success: false,
            status: 400,
            message: "Decant no encontrado en el carrito.",
          };
        }
        if (decant.stock < reqItem.quantity) {
          return {
            success: false,
            status: 400,
            message: `Stock insuficiente para el decant seleccionado.`,
          };
        }
      } else {
        if (cartItem.perfume.stock < reqItem.quantity) {
          return {
            success: false,
            status: 400,
            message: `Stock insuficiente para "${cartItem.perfume.name}".`,
          };
        }
      }
    }

    const orderItems: {
      perfumeId: string;
      decantId: string | null;
      quantity: number;
      price: Prisma.Decimal;
    }[] = [];

    let subtotal = 0;
    let discount = 0;

    for (const reqItem of requestedItems) {
      const cartItem = cartItemMap.get(reqItem.perfumeId)!;
      let unitPrice: number;
      let originalPrice: number;

      if (reqItem.decantId) {
        const decantPrice = Number(cartItem.decant!.price);
        unitPrice = decantPrice;
        originalPrice = decantPrice;
      } else {
        const perfumePrice = Number(cartItem.perfume.price);
        const perfumeDiscount = cartItem.perfume.discount;
        unitPrice = perfumePrice;
        originalPrice =
          perfumeDiscount > 0
            ? Math.round(perfumePrice / (1 - perfumeDiscount / 100))
            : perfumePrice;
      }

      subtotal += originalPrice * reqItem.quantity;
      discount += (originalPrice - unitPrice) * reqItem.quantity;

      orderItems.push({
        perfumeId: reqItem.perfumeId,
        decantId: reqItem.decantId ?? null,
        quantity: reqItem.quantity,
        price: new Prisma.Decimal(unitPrice),
      });
    }

    const itemsTotal = subtotal - discount;
    const isDelivery = data.deliveryMethod === "DELIVERY";
    const shipping =
      isDelivery && itemsTotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
    const total = itemsTotal + shipping;

    const order = await db.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userId,
          status: "PENDING",
          deliveryMethod: DELIVERY_METHOD_MAP[data.deliveryMethod],
          currency: CURRENCY_MAP[data.paymentCurrency],
          paymentMethod: PAYMENT_METHOD_MAP[data.paymentProvider],
          contactName: `${data.firstName} ${data.lastName}`,
          contactEmail: data.email,
          contactPhone: data.phone,
          city: data.city || null,
          address: data.address || null,
          subtotal: new Prisma.Decimal(subtotal),
          discount: new Prisma.Decimal(discount),
          shipping: new Prisma.Decimal(shipping),
          total: new Prisma.Decimal(total),
          items: {
            create: orderItems,
          },
        },
        include: orderInclude,
      });

      for (const reqItem of requestedItems) {
        if (reqItem.decantId) {
          await tx.decant.update({
            where: { id: reqItem.decantId },
            data: { stock: { decrement: reqItem.quantity } },
          });
        } else {
          await tx.perfume.update({
            where: { id: reqItem.perfumeId },
            data: { stock: { decrement: reqItem.quantity } },
          });
        }
      }

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return created;
    });

    return {
      success: true,
      status: 201,
      data: order,
      message: "Pedido creado con éxito.",
    };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error al crear el pedido.",
    };
  }
}

export async function getOrders(
  userId: string,
): Promise<ApiResult<OrderWithItems[]>> {
  try {
    const orders = await db.order.findMany({
      where: { userId },
      include: orderInclude,
      orderBy: { createdAt: "desc" },
    });

    return { success: true, status: 200, data: orders };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener los pedidos.",
    };
  }
}

export async function getOrderById(
  userId: string,
  orderId: string,
): Promise<ApiResult<OrderWithItems>> {
  try {
    const order = await db.order.findFirst({
      where: { id: orderId, userId },
      include: orderInclude,
    });

    if (!order) {
      return {
        success: false,
        status: 404,
        message: "Pedido no encontrado.",
      };
    }

    return { success: true, status: 200, data: order };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener el pedido.",
    };
  }
}