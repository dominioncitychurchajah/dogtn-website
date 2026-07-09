"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Compass,
  ClipboardCheck,
  Users,
  CalendarDays,
  HandHeart,
  MapPin,
  Shield,
  Menu,
  X,
  Search,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  segment: string; // "" = dashboard root
  icon: React.ComponentType<{ className?: string }>;
}

const NAV: NavItem[] = [
  { label: "Dashboard", segment: "", icon: LayoutDashboard },
  { label: "Content Studio", segment: "content", icon: FileText },
  { label: "Journeys & Curriculum", segment: "journeys", icon: Compass },
  { label: "Assessment Manager", segment: "assessment", icon: ClipboardCheck },
  { label: "Applications", segment: "applications", icon: Users },
  { label: "Events Manager", segment: "events", icon: CalendarDays },
  { label: "Giving", segment: "giving", icon: HandHeart },
  { label: "Chapters", segment: "chapters", icon: MapPin },
  { label: "Users & Roles", segment: "users", icon: Shield },
];

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

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
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
        <NavLinks />
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
            <NavLinks onNavigate={() => setMobileOpen(false)} />
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

          <div className="ms-auto flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-ink-100 bg-paper-50 px-3 py-1.5 sm:flex">
              <Search className="h-4 w-4 text-ink-300" />
              <input
                type="search"
                placeholder="Search…"
                className="w-32 bg-transparent text-body-s text-ink-900 placeholder:text-ink-300 focus:outline-none lg:w-48"
              />
            </div>
            <button
              aria-label="Notifications"
              className="relative rounded-full p-2 text-ink-500 hover:bg-paper-50 hover:text-ink-900"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute end-1.5 top-1.5 h-2 w-2 rounded-full bg-flame-600" />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-600/15 text-body-s font-semibold text-gold-hover">
                AO
              </span>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="text-body-s font-semibold text-ink-900">Ada Obi</span>
                <span className="text-caption text-ink-500">Program Admin</span>
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
