import type { ReactElement } from "react";
import { AuthGuard } from "@/modules/shared/components/auth-guard";
import { Favorites } from "@/modules/favorites/components";

export default function FavoritesPage(): ReactElement {
  return (
    <AuthGuard>
      <Favorites />
    </AuthGuard>
  );
}
