export function StatCard({
  value,
  label,
  dark = false,
}: {
  value: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center sm:text-start">
      <div className={dark ? "font-display text-display-l text-gold-400" : "font-display text-display-l text-gold-600"}>
        {value}
      </div>
      <div className={dark ? "mt-1 text-caption uppercase tracking-widest text-ink-300" : "mt-1 text-caption uppercase tracking-widest text-ink-500"}>
        {label}
      </div>
    </div>
  );
}
