import {Register} from "@/modules/auth/components";
import { GuestGuard } from "@/modules/shared/components/GuestGuard";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}
