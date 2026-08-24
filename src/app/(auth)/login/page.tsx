import { GuestGuard } from "@/modules/shared/components/GuestGuard";
import { Login } from "@/modules/auth/components";

export default function LoginPage() {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}
