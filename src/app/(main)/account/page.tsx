import { AuthGuard } from "@/modules/shared/components/AuthGuard";
import { Account } from "@/modules/account/components";

export default function AccountPage() {
  return (
    <AuthGuard>
      <Account />
    </AuthGuard>
  );
}
