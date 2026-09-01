"use client";

import { API_ROUTES } from "@/constants";
import type { PushSubscriptionInput } from "@/modules/push/schema";

async function authHeaders(token: string): Promise<HeadersInit> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function subscribePush(
  token: string,
  subscription: PushSubscriptionInput
): Promise<boolean> {
  const res = await fetch(API_ROUTES.PUSH.SUBSCRIBE, {
    method: "POST",
    headers: await authHeaders(token),
    body: JSON.stringify(subscription),
  });

  if (!res.ok) return false;

  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function unsubscribePush(
  token: string,
  endpoint: string
): Promise<boolean> {
  const res = await fetch(API_ROUTES.PUSH.UNSUBSCRIBE, {
    method: "DELETE",
    headers: await authHeaders(token),
    body: JSON.stringify({ endpoint }),
  });

  if (!res.ok) return false;

  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}