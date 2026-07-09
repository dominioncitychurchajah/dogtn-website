import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "s" | "m" | "l";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-[var(--radius-m)] transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-gold-600 text-ink-900 hover:bg-gold-hover shadow-elev-1",
  secondary: "border border-ink-100 bg-paper-0 text-ink-900 hover:bg-paper-50",
  ghost: "text-ink-700 hover:bg-paper-50",
  destructive: "bg-error-600 text-paper-0 hover:opacity-90",
};

const sizes: Record<Size, string> = {
  s: "h-9 px-4 text-body-s",
  m: "h-11 px-6 text-body-m",
  l: "h-14 px-8 text-body-l",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >;

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "primary", size = "m", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
