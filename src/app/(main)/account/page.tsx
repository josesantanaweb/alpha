import { Account } from "@/modules/account";
import { AuthGuard } from "@/components/shared/AuthGuard";

export default function AccountPage() {
  return (
    <AuthGuard>
      <Account />
    </AuthGuard>
  );
}