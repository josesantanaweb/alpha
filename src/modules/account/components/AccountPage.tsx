"use client";

import type { ReactElement } from "react";
import { logout } from "@/lib/api/auth";
import { Button } from "@/modules/shared/components/ui";
import { useAuth } from "@/modules/auth/store";

export const Account = (): ReactElement => {
  const user = useAuth((s) => s.user);

  return (
    <div className="flex flex-col gap-6 p-5 pb-25">
      <div className="flex flex-col items-start gap-1">
        <h5 className="text-lg font-semibold text-white">Mi cuenta</h5>
        <p className="text-body text-sm">
          Bienvenido, {user?.name ?? user?.email}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-surface flex flex-col gap-3 rounded-lg p-4">
          <span className="text-body text-xs uppercase">Nombre</span>
          <span className="text-white">{user?.name ?? "—"}</span>
        </div>
        <div className="bg-surface flex flex-col gap-3 rounded-lg p-4">
          <span className="text-body text-xs uppercase">Email</span>
          <span className="text-white">{user?.email}</span>
        </div>
      </div>

      <Button variant="outline" onClick={logout}>
        Cerrar sesión
      </Button>
    </div>
  );
};
