import { Register } from "@/modules/auth/components/register-form";
import { GuestGuard } from "@/modules/shared/components/GuestGuard";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}