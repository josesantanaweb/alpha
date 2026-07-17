import { Account } from "@/modules/account";
import { AuthGuard } from "@/modules/shared/components/AuthGuard";

export default function AccountPage() {
  return (
    <AuthGuard>
      <Account />
    </AuthGuard>
  );
}