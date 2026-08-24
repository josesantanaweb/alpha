import type { ReactElement } from "react";
import { AuthGuard } from "@/modules/shared/components/AuthGuard";
import { Favorites } from "@/modules/favorites/components";

export default function FavoritesPage(): ReactElement {
  return (
    <AuthGuard>
      <Favorites />
    </AuthGuard>
  );
}
