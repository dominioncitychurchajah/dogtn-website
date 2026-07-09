"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, LineChart, HandHeart } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function MobileBottomBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const p = (path: string) => `/${locale}${path}`;
  const items = [
    { href: p(""), label: "Home", icon: Home },
    { href: p("/library"), label: "Search", icon: Search },
    { href: p("/my-journey"), label: "My Journey", icon: LineChart },
    { href: p("/give"), label: "Give", icon: HandHeart },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[85] grid grid-cols-4 border-t border-ink-100 bg-paper-0/95 backdrop-blur-md md:hidden">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== p("") && pathname.startsWith(href));
        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "flex min-h-[56px] flex-col items-center justify-center gap-0.5 py-2 text-caption",
              active ? "text-gold-hover" : "text-ink-500",
            )}
          >
            <Icon className={cn("h-5 w-5", active && "fill-gold-600/20")} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
