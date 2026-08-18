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
    const perfumeIds = [...new Set(data.items.map((i) => i.perfumeId))];
    const decantIds = [
      ...new Set(
        data.items.filter((i) => i.decantId).map((i) => i.decantId!),
      ),
    ];

    const [perfumes, decants] = await Promise.all([
      db.perfume.findMany({
        where: { id: { in: perfumeIds } },
        select: { id: true, name: true, price: true, discount: true, stock: true },
      }),
      decantIds.length > 0
        ? db.decant.findMany({
            where: { id: { in: decantIds } },
            select: { id: true, perfumeId: true, price: true, stock: true },
          })
        : Promise.resolve([]),
    ]);

    const perfumeMap = new Map(perfumes.map((p) => [p.id, p]));
    const decantMap = new Map(decants.map((d) => [d.id, d]));

    for (const item of data.items) {
      const perfume = perfumeMap.get(item.perfumeId);
      if (!perfume) {
        return {
          success: false,
          status: 400,
          message: `Perfume no encontrado.`,
        };
      }

      if (item.decantId) {
        const decant = decantMap.get(item.decantId);
        if (!decant || decant.perfumeId !== item.perfumeId) {
          return {
            success: false,
            status: 400,
            message: "Decant no encontrado.",
          };
        }
        if (decant.stock < item.quantity) {
          return {
            success: false,
            status: 400,
            message: "Stock insuficiente para el decant seleccionado.",
          };
        }
      } else {
        if (perfume.stock < item.quantity) {
          return {
            success: false,
            status: 400,
            message: `Stock insuficiente para "${perfume.name}".`,
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

    for (const item of data.items) {
      const perfume = perfumeMap.get(item.perfumeId)!;
      let unitPrice: number;
      let originalPrice: number;

      if (item.decantId) {
        const decantPrice = Number(decantMap.get(item.decantId)!.price);
        unitPrice = decantPrice;
        originalPrice = decantPrice;
      } else {
        const perfumePrice = Number(perfume.price);
        const perfumeDiscount = perfume.discount;
        unitPrice = perfumePrice;
        originalPrice =
          perfumeDiscount > 0
            ? Math.round(perfumePrice / (1 - perfumeDiscount / 100))
            : perfumePrice;
      }

      subtotal += originalPrice * item.quantity;
      discount += (originalPrice - unitPrice) * item.quantity;

      orderItems.push({
        perfumeId: item.perfumeId,
        decantId: item.decantId ?? null,
        quantity: item.quantity,
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

      for (const item of data.items) {
        if (item.decantId) {
          await tx.decant.update({
            where: { id: item.decantId },
            data: { stock: { decrement: item.quantity } },
          });
        } else {
          await tx.perfume.update({
            where: { id: item.perfumeId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      const cart = await tx.cart.findUnique({
        where: { userId },
        select: { id: true },
      });

      if (cart) {
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }

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