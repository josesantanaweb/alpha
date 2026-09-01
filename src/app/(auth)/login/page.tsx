import { GuestGuard } from "@/modules/shared/components/guest-guard";
import { Login } from "@/modules/auth/components";

export default function LoginPage() {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}
