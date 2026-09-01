"use client";

import type { ReactElement } from "react";
import { ACCOUNT_HELP_MENU, ACCOUNT_MANAGER_MENU } from "@/constants";
import { logout } from "@/lib/api/auth";
import { SocialLinks } from "@/modules/shared/components";
import { AccountHeader } from "./account-header";
import { AccountMenuItem } from "./account-menu-item";
import { AccountMenuSection } from "./account-menu-section";

export const Account = (): ReactElement => {
  const handleLogout = () => {
    void logout();
  };

  return (
    <div className="flex flex-col gap-10 p-5 pb-25">
      <AccountHeader />

      <AccountMenuSection title="Administrar">
        {ACCOUNT_MANAGER_MENU.map((item) => (
          <AccountMenuItem key={item.key} item={item} />
        ))}
      </AccountMenuSection>

      <AccountMenuSection title="Ayuda">
        {ACCOUNT_HELP_MENU.map((item) => (
          <AccountMenuItem
            key={item.key}
            item={item}
            onClick={item.danger ? handleLogout : undefined}
          />
        ))}
      </AccountMenuSection>

      <div className="flex flex-col items-center justify-center gap-2">
        <SocialLinks />
        <p className="text-body text-xs">
          {new Date().getFullYear()} AURA Perfumes Todos los derechos
          reservados.
        </p>
      </div>
    </div>
  );
};
