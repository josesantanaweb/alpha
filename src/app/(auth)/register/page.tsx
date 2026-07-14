import { Register } from "@/modules/auth/register";
import { GuestGuard } from "@/components/shared/GuestGuard";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}