import "server-only";
import { type PushSubscription } from "@prisma/client";
import { db } from "@/lib/db";
import { sendPushNotification } from "@/lib/web-push";
import { PushSubscriptionSchema } from "./schema";

const EXPIRED_STATUS_CODES = new Set([404, 410]);

export async function subscribeUser(
  userId: string,
  input: unknown
): Promise<PushSubscription | null> {
  const parsed = PushSubscriptionSchema.safeParse(input);
  if (!parsed.success) return null;

  const sub = parsed.data;

  return db.pushSubscription.upsert({
    where: { endpoint: sub.endpoint },
    update: {
      userId,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
    },
    create: {
      userId,
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
    },
  });
}

export async function unsubscribeUser(
  userId: string,
  endpoint: string
): Promise<void> {
  await db.pushSubscription.deleteMany({ where: { userId, endpoint } });
}

interface NewOrderPayload {
  orderId: string;
  contactName: string;
  total: unknown;
}

export async function notifyAdminsOnNewOrder(
  order: NewOrderPayload
): Promise<void> {
  try {
    const admins = await db.user.findMany({
      where: { role: "ADMIN" },
      select: { pushSubscriptions: true },
    });

    const subscriptions = admins.flatMap((admin) => admin.pushSubscriptions);

    if (subscriptions.length === 0) return;

    const payload = {
      title: "Nueva orden recibida",
      body: `${order.contactName} generó una orden (total ${order.total}). Revisa el panel.`,
      url: "/",
      tag: "aura-new-order",
    };

    await Promise.allSettled(
      subscriptions.map(async (sub) => {
        const result = await sendPushNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payload
        );

        if (!result.ok && result.status && EXPIRED_STATUS_CODES.has(result.status)) {
          await db.pushSubscription.deleteMany({ where: { id: sub.id } });
        }
      })
    );
  } catch (error) {
    console.error("Error al notificar admins por push:", error);
  }
}