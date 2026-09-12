import type { ReactNode } from "react";
import { AdminNavbar, AdminSidebar } from "@/modules/admin/components";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full min-h-screen w-full">
      <AdminSidebar />
      <div className="bg-web-bg flex min-h-0 flex-1 flex-col gap-4 p-5">
        <AdminNavbar />
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}