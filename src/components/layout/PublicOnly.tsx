"use client";

import { usePathname } from "next/navigation";

/** Renders the public site chrome (header, footer, chat…) everywhere except /admin. */
export function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return /^\/[^/]+\/admin(\/|$)/.test(pathname ?? "") ? null : children;
}
