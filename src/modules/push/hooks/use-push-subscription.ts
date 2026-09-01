"use client";

import { useCallback, useState } from "react";
import { subscribePush, unsubscribePush } from "@/lib/api/push";
import { useAuth } from "@/modules/auth/store";
import { urlBase64ToUint8Array } from "@/modules/push/utils/vapid";

interface UsePushSubscription {
  support: boolean;
  permission: NotificationPermission | null;
  subscribed: boolean;
  loading: boolean;
  error: string | null;
  enable: () => Promise<void>;
  disable: () => Promise<void>;
}

function getVapidPublicKey(): Uint8Array | null {
  if (typeof process === "undefined") return null;
  const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!key) return null;
  return urlBase64ToUint8Array(key);
}

export const usePushSubscription = (): UsePushSubscription => {
  const user = useAuth((s) => s.user);
  const token = useAuth((s) => s.token);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === "ADMIN";

  const isSupported = (): boolean =>
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window;

  const support = isAdmin && isSupported();
  const permission: NotificationPermission | null = support
    ? Notification.permission
    : null;

  const getExistingSubscription = useCallback(async (): Promise<
    PushSubscription | null
  > => {
    if (!isSupported()) return null;
    const registration = await navigator.serviceWorker.getRegistration("/sw.js");
    return registration ? registration.pushManager.getSubscription() : null;
  }, []);

  const enable = useCallback(async (): Promise<void> => {
    if (!isAdmin || !token || !isSupported()) return;

    setLoading(true);
    setError(null);
    try {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        setError(
          "Permiso de notificaciones denegado. Actívalo desde los ajustes del navegador."
        );
        return;
      }

      const vapidKey = getVapidPublicKey();
      if (!vapidKey) {
        setError(
          "VAPID public key no configurada. Contacta al administrador."
        );
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      const existing = await registration.pushManager.getSubscription();
      const subscription =
        existing ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKey as unknown as BufferSource,
        }));

      const p256dh = subscription.getKey("p256dh");
      const auth = subscription.getKey("auth");
      if (!p256dh || !auth) {
        setError("La suscripción no contiene las claves necesarias.");
        return;
      }

      const toBase64 = (buffer: ArrayBuffer): string =>
        btoa(String.fromCharCode(...new Uint8Array(buffer)));

      const ok = await subscribePush(token, {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: toBase64(p256dh),
          auth: toBase64(auth),
        },
      });
      if (!ok) {
        setError("No se pudo guardar la suscripción en el servidor.");
        return;
      }

      setSubscribed(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al activar notificaciones."
      );
    } finally {
      setLoading(false);
    }
  }, [isAdmin, token]);

  const disable = useCallback(async (): Promise<void> => {
    if (!token || !isSupported()) return;

    setLoading(true);
    setError(null);
    try {
      const existing = await getExistingSubscription();
      if (existing) {
        await unsubscribePush(token, existing.endpoint);
        await existing.unsubscribe();
      }
      setSubscribed(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al desactivar notificaciones."
      );
    } finally {
      setLoading(false);
    }
  }, [token, getExistingSubscription]);

  return { support, permission, subscribed, loading, error, enable, disable };
};
