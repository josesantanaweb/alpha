import type { ReactNode } from "react";
import { AdminNavbar, AdminSidebar } from "@/modules/admin/components";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-canvas flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar />
        <div className="min-h-0 flex-1 px-5 py-6 lg:px-6">{children}</div>
      </main>
    </div>
  );
}
