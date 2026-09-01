"use client";

import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { BellRing } from "lucide-react";
import { useAuth } from "@/modules/auth/store";
import { Button } from "@/modules/shared/components";
import { usePushSubscription } from "../hooks/use-push-subscription";

export const PushNotificationManager = (): ReactElement | null => {
  const user = useAuth((s) => s.user);
  const { support, subscribed, loading, error, enable } =
    usePushSubscription();
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (isAdmin && support && typeof navigator !== "undefined") {
      void navigator.serviceWorker.register("/sw.js", { scope: "/" });
    }
  }, [isAdmin, support]);

  if (!isAdmin || !support || subscribed) return null;

  const handleEnable = async () => {
    setActionMessage(null);
    await enable();
    if (error) setActionMessage(error);
  };

  return (
    <div className="fixed right-3 bottom-24 z-50 flex flex-col items-end gap-1">
      {actionMessage && (
        <p className="bg-surface text-body border-stroke max-w-52 rounded-lg border px-2 py-1 text-[10px]">
          {actionMessage}
        </p>
      )}
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={handleEnable}
        disabled={loading}
        className="w-auto rounded-full"
      >
        <BellRing size={16} />
        {loading ? "…" : "Activar notificaciones"}
      </Button>
    </div>
  );
};
