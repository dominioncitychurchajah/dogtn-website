import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

// Statically exported, so every admin route is publicly reachable.
// robots.txt disallows them; this is the belt to that pair of braces.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AdminShell locale={locale}>{children}</AdminShell>;
}
