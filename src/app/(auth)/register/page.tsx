import { GuestGuard } from "@/modules/shared/components/GuestGuard";
import { Register } from "@/modules/auth/components";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}
