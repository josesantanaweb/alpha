import type { ReactElement } from "react";
import {Favorites} from "@/modules/favorites/components";
import { AuthGuard } from "@/modules/shared/components/AuthGuard";

export default function FavoritesPage(): ReactElement {
  return (
    <AuthGuard>
      <Favorites />
    </AuthGuard>
  );
}