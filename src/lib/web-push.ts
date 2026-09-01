import "server-only";
import webpush from "web-push";

const subject = process.env.VAPID_SUBJECT;
const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;

let configured = false;

export function isWebPushConfigured(): boolean {
  return Boolean(publicKey && privateKey);
}

function ensureConfigured(): boolean {
  configureWebPush();
  return configured;
}

export function configureWebPush(): boolean {
  if (configured) return true;
  if (!publicKey || !privateKey) return false;

  webpush.setVapidDetails(
    subject ?? "mailto:admin@aura.com",
    publicKey,
    privateKey
  );
  configured = true;
  return true;
}

export interface PushSubscriptionDto {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export async function sendPushNotification(
  subscription: PushSubscriptionDto,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status?: number }> {
  if (!ensureConfigured()) {
    return { ok: false };
  }

  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return { ok: true };
  } catch (error) {
    const status = (error as { statusCode?: number }).statusCode;
    return { ok: false, status };
  }
}