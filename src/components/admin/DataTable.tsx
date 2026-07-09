"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<Row> {
  key: keyof Row & string;
  header: string;
  /** Optional custom cell renderer. */
  render?: (row: Row) => React.ReactNode;
  /** Value used for sorting; defaults to the raw field value. */
  sortValue?: (row: Row) => string | number;
  /** Disable sorting for this column. */
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<Row> {
  columns: Column<Row>[];
  rows: Row[];
  /** Field used as the React key + mobile-card heading. */
  caption?: string;
  className?: string;
  emptyMessage?: string;
}

type SortDir = "asc" | "desc";

export function DataTable<Row extends Record<string, unknown>>({
  columns,
  rows,
  className,
  emptyMessage = "No records yet.",
}: DataTableProps<Row>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");

  const sorted = React.useMemo(() => {
    if (!sortKey) return rows;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return rows;
    const val = (row: Row): string | number =>
      col.sortValue ? col.sortValue(row) : (row[sortKey] as string | number);
    return [...rows].sort((a, b) => {
      const va = val(a);
      const vb = val(b);
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, columns, sortKey, sortDir]);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-[var(--radius-l)] border border-dashed border-ink-100 bg-paper-50 p-12 text-center text-body-m text-ink-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Table (md and up) */}
      <div className="hidden overflow-x-auto rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 md:block">
        <table className="w-full border-collapse text-start">
          <thead>
            <tr className="border-b border-ink-100 bg-paper-50">
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                const sortable = col.sortable !== false;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={cn(
                      "px-4 py-3 text-start text-caption font-semibold uppercase tracking-wider text-ink-500",
                      col.className,
                    )}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col.key)}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-900"
                      >
                        {col.header}
                        {isSorted ? (
                          sortDir === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )
                        ) : (
                          <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={i}
                className="border-b border-ink-100 last:border-0 transition-colors hover:bg-paper-50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("px-4 py-3 text-body-s text-ink-700", col.className)}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked cards (below md) */}
      <div className="flex flex-col gap-3 md:hidden">
        {sorted.map((row, i) => (
          <div
            key={i}
            className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-4 shadow-elev-1"
          >
            <dl className="flex flex-col gap-2">
              {columns.map((col) => (
                <div key={col.key} className="flex items-start justify-between gap-3">
                  <dt className="text-caption font-semibold uppercase tracking-wider text-ink-500">
                    {col.header}
                  </dt>
                  <dd className="text-end text-body-s text-ink-900">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
