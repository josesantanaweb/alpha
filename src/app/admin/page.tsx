import { AdminPerfumesTable } from "@/modules/admin/components";
import { ADMIN_PERFUMES } from "@/modules/admin/data";

export default function AdminPage() {
  return <AdminPerfumesTable perfumes={ADMIN_PERFUMES} />;
}