import {Login} from "@/modules/auth/components";
import { GuestGuard } from "@/modules/shared/components/GuestGuard";

export default function LoginPage() {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}
