import { AuthGuard } from "@/modules/shared/components/auth-guard";
import { OrdersPage } from "@/modules/orders/components";

export default function OrdersPageRoute() {
  return (
    <AuthGuard>
      <OrdersPage />
    </AuthGuard>
  );
}