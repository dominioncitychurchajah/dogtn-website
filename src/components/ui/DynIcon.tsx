import { icons, type LucideProps, HelpCircle } from "lucide-react";

/** Render a lucide icon by kebab-case or PascalCase name (from data). */
export function DynIcon({ name, ...props }: { name: string } & LucideProps) {
  const pascal = name
    .split(/[-_ ]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  const Icon = (icons as Record<string, React.ComponentType<LucideProps>>)[pascal] ?? HelpCircle;
  return <Icon {...props} />;
}
