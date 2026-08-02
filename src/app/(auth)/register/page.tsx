import { Register } from "@/modules/auth";
import { GuestGuard } from "@/modules/shared/components/GuestGuard";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}
