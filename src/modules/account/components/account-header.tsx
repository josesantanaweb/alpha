import type { ReactElement } from "react";
import { useAuth } from "@/modules/auth/store";
import { Avatar } from "@/modules/shared/components";

export const AccountHeader = (): ReactElement => {
  const user = useAuth((s) => s.user);

  if (!user) return <></>;

  const name = user.name || "Usuario";
  const memberSince = user.createdAt
    ? new Date(user.createdAt).getFullYear()
    : null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Avatar src={user.avatar} name={name} size={64} />
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
        {memberSince && (
          <p className="text-body text-xs">Miembro desde {memberSince}</p>
        )}
      </div>
    </div>
  );
};