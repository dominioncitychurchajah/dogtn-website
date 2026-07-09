import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-body-s text-ink-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-ink-900 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-900 font-medium">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && (
              <ChevronRight className="h-4 w-4 text-ink-300 rtl:rotate-180" aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
