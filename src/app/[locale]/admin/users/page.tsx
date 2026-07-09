"use client";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/Badge";

interface UserRow extends Record<string, unknown> {
  name: string;
  email: string;
  role: string;
  status: string;
}

const rows: UserRow[] = [
  { name: "Ada Obi", email: "ada@dogtn.org", role: "Program Admin", status: "Active" },
  { name: "Emeka Uche", email: "emeka@dogtn.org", role: "Content Editor", status: "Active" },
  { name: "Grace Mensah", email: "grace@dogtn.org", role: "Reviewer", status: "Invited" },
  { name: "Samuel Kimani", email: "samuel@dogtn.org", role: "Chapter Lead", status: "Active" },
  { name: "Ruth Eze", email: "ruth@dogtn.org", role: "Finance", status: "Suspended" },
];

const columns: Column<UserRow>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  {
    key: "status",
    header: "Status",
    render: (r) => (
      <Badge tone={r.status === "Active" ? "verd" : r.status === "Invited" ? "info" : "flame"}>{r.status}</Badge>
    ),
  },
];

export default function AdminUsersPage() {
  return (
    <div>
      <p className="mb-6 text-body-m text-ink-500">Team members and their access levels.</p>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
