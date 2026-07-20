import { Register } from "@/modules/auth/components/RegisterForm";
import { GuestGuard } from "@/modules/shared/components/GuestGuard";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}