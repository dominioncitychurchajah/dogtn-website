import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { mentorshipCopy } from "@/i18n/pages/mentorship";
import { MENTORSHIP_LOGIN_URL, MENTORSHIP_REGISTER_URL } from "@/lib/site";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/registration";
import { cn } from "@/lib/utils";

/**
 * The two doors into the mentorship app: log in for students who already have
 * an account, register for everyone else, and a line of help for the ones who
 * cannot get in. Built for a dark surface, and used both on the mentorship
 * lander and on the homepage so a returning student never has to go looking.
 */
export function PortalDoors({ locale, className }: { locale: Locale; className?: string }) {
  const c = mentorshipCopy[locale];

  const doors = [
    {
      href: MENTORSHIP_LOGIN_URL,
      icon: LogIn,
      title: c.portalReturningTitle,
      body: c.portalReturningBody,
      cta: c.portalLoginCta,
      primary: true,
    },
    {
      href: MENTORSHIP_REGISTER_URL,
      icon: UserPlus,
      title: c.portalNewTitle,
      body: c.portalNewBody,
      cta: c.portalRegisterCta,
      primary: false,
    },
  ];

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {doors.map(({ href, icon: Icon, title, body, cta, primary }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex flex-col rounded-[var(--radius-l)] border p-6 text-start transition-colors sm:p-7",
            primary
              ? "border-gold-600/40 bg-gold-600/10 hover:border-gold-600 hover:bg-gold-600/15"
              : "border-paper-0/15 bg-paper-0/5 hover:border-paper-0/35 hover:bg-paper-0/10",
          )}
        >
          <span
            className={cn(
              "grid h-11 w-11 place-items-center rounded-[var(--radius-m)]",
              primary ? "bg-gold-600 text-ink-900" : "bg-paper-0/10 text-gold-600",
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="mt-5 font-display text-heading-3 text-paper-0">{title}</h3>
          <p className="mt-2 text-body-m leading-relaxed text-ink-300">{body}</p>
          <span
            className={cn(
              "mt-6 inline-flex items-center gap-2 text-body-m font-bold",
              primary ? "text-gold-600" : "text-paper-0",
            )}
          >
            {cta}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
              aria-hidden
            />
          </span>
        </a>
      ))}

      <p className="text-body-s leading-relaxed text-ink-300 sm:col-span-2">
        {c.portalHelpBody}{" "}
        <a href={`tel:${CONTACT_PHONE}`} className="font-semibold text-gold-600 hover:text-gold-hover">
          {CONTACT_PHONE_DISPLAY}
        </a>
      </p>
    </div>
  );
}
