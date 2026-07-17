import { AppLayout } from "@/modules/shared/components/layout";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}