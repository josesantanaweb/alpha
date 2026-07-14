import { Login } from "@/modules/auth/login";
import { GuestGuard } from "@/components/shared/GuestGuard";

export default function LoginPage() {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}