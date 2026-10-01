"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Inbox,
  CalendarDays,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  segment: string; // "" = dashboard root
  icon: React.ComponentType<{ className?: string }>;
}

const NAV: NavItem[] = [
  { label: "Dashboard", segment: "", icon: LayoutDashboard },
  { label: "Sign-ups", segment: "submissions", icon: Inbox },
  { label: "Events Manager", segment: "events", icon: CalendarDays },
  { label: "Assessment Manager", segment: "assessment", icon: ClipboardCheck },
  { label: "Users & Roles", segment: "users", icon: Shield },
];

function NavLinks({
  base,
  isActive,
  onNavigate,
}: {
  base: string;
  isActive: (segment: string) => boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV.map((item) => {
        const href = item.segment ? `${base}/${item.segment}` : base;
        const active = isActive(item.segment);
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-[var(--radius-m)] px-3 py-2.5 text-body-s font-medium transition-colors",
              active
                ? "bg-ink-900 text-paper-0"
                : "text-ink-500 hover:bg-paper-50 hover:text-ink-900",
            )}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const base = `/${locale}/admin`;

  function isActive(segment: string) {
    const href = segment ? `${base}/${segment}` : base;
    if (segment === "") return pathname === base || pathname === `${base}/`;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const activeItem = NAV.find((n) => isActive(n.segment));
  const title = activeItem?.label ?? "Admin";

  return (
    <div className="min-h-dvh bg-paper-50 text-ink-900 lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-e border-ink-100 bg-paper-0 py-5 lg:flex">
        <div className="px-5 pb-6">
          <Link href={base} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-m)] bg-ink-900 text-caption font-bold uppercase tracking-widest text-gold-400">
              DO
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-body-s font-semibold text-ink-900">DOGTN Admin</span>
              <span className="text-caption text-ink-500">Console</span>
            </span>
          </Link>
        </div>
        <NavLinks base={base} isActive={isActive} />
        <div className="mt-auto px-5 pt-5">
          <p className="text-caption text-ink-300">v0.1 · Internal preview</p>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-ink-900/40"
          />
          <div className="absolute inset-y-0 start-0 flex w-72 max-w-[80%] flex-col bg-paper-0 py-5 shadow-elev-4">
            <div className="flex items-center justify-between px-5 pb-6">
              <span className="text-body-s font-semibold">DOGTN Admin</span>
              <button
                aria-label="Close"
                onClick={() => setMobileOpen(false)}
                className="rounded-[var(--radius-m)] p-1.5 text-ink-500 hover:bg-paper-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks base={base} isActive={isActive} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-ink-100 bg-paper-0/90 px-4 backdrop-blur-md lg:px-8">
          <button
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
            className="rounded-[var(--radius-m)] p-1.5 text-ink-700 hover:bg-paper-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-heading-3 font-semibold text-ink-900">{title}</h1>

          <span className="ms-auto rounded-full bg-gold-600/15 px-3 py-1 text-caption font-semibold text-gold-hover">
            Signed in as admin
          </span>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
