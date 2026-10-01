"use client";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/Badge";

interface UserRow extends Record<string, unknown> {
  name: string;
  email: string;
  role: string;
  login: string;
}

// Who can reach /admin today. The password login is shared; change it with
//   npx wrangler pages secret put ADMIN_PASSWORD --project-name dr-david-ogbueli
const rows: UserRow[] = [
  { name: "Admin", email: "admin", role: "Administrator", login: "Password" },
  { name: "Olayemi Segun Solomon", email: "olayemisegunsolomon@gmail.com", role: "Owner", login: "Password" },
];

const columns: Column<UserRow>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Username / email" },
  { key: "role", header: "Role" },
  { key: "login", header: "Signs in with", render: (r) => <Badge tone="verd">{r.login}</Badge> },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <p className="text-body-m text-ink-500">
        People who can open this admin. Everyone signs in with the shared admin password (username{" "}
        <code className="rounded bg-paper-50 px-1">admin</code>).
      </p>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
