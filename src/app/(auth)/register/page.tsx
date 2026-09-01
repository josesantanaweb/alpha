import { GuestGuard } from "@/modules/shared/components/guest-guard";
import { Register } from "@/modules/auth/components";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}
