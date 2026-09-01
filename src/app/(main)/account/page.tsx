import { AuthGuard } from "@/modules/shared/components/auth-guard";
import { Account } from "@/modules/account/components";

export default function AccountPage() {
  return (
    <AuthGuard>
      <Account />
    </AuthGuard>
  );
}
