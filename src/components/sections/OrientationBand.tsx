import Link from "next/link";
import { Route, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { CONTACT_PHONE } from "@/lib/registration";

interface Props {
  locale: Locale;
  title: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

/**
 * The assessment shown as a stack of question cards, built from divs rather
 * than shipped as an image: it stays crisp at any size, costs no bytes, and
 * cannot drift out of date the way a screenshot of the real UI would.
 */
function AssessmentMock() {
  return (
    <div aria-hidden className="relative mx-auto h-[210px] w-full max-w-[320px] sm:h-[300px] sm:max-w-[420px]">
      {/* Card behind */}
      <div className="absolute right-[4%] top-7 w-[74%] rotate-[5deg] rounded-2xl bg-white/70 p-4 shadow-xl sm:top-8 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="h-1.5 w-16 rounded-full bg-[#C9A227]/60" />
          <span className="text-[11px] font-semibold text-[#94A3B8]">4 / 10</span>
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`mb-1.5 h-6 rounded-lg sm:mb-2 sm:h-7 ${i === 1 ? "bg-[#C9A227]/25" : "bg-[#F1F5F9]"}`} />
        ))}
      </div>

      {/* Card in front */}
      <div className="absolute left-[3%] top-0 w-[82%] -rotate-[4deg] rounded-2xl bg-white p-4 shadow-2xl sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="h-1.5 w-20 rounded-full bg-[#C9A227]" />
          <span className="text-[11px] font-semibold text-[#94A3B8]">3 / 10</span>
        </div>
        <div className="mb-1.5 h-2.5 w-3/4 rounded-full bg-[#0A192F]" />
        <div className="mb-4 h-2.5 w-1/2 rounded-full bg-[#CBD5E1]" />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`mb-1.5 flex items-center gap-3 rounded-lg px-3 py-2 sm:mb-2 sm:py-2.5 ${
              i === 1 ? "bg-[#C9A227]/15 ring-1 ring-[#C9A227]/50" : "bg-[#F8FAFC]"
            }`}
          >
            <span
              className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                i === 1 ? "border-[#C9A227] bg-[#C9A227]" : "border-[#CBD5E1]"
              }`}
            />
            <span className={`h-2 rounded-full ${i === 1 ? "w-2/3 bg-[#C9A227]/70" : "w-1/2 bg-[#E2E8F0]"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrientationBand({ locale, title, body, ctaPrimary, ctaSecondary }: Props) {
  return (
    <section className="bg-white px-5 py-10 sm:py-12 lg:px-16">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[24px] bg-[#0A192F] bg-[radial-gradient(ellipse_at_75%_50%,rgba(30,64,124,0.55),transparent_60%)]">
        <div className="grid items-center gap-8 px-6 py-10 sm:gap-10 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div className="min-w-0">
            <h2 className="max-w-[16ch] font-serif text-[32px] font-bold leading-[1.1] tracking-tight text-white sm:text-[40px]">
              {title}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-[#CBD5E1]">
              {body}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                href={`/${locale}/leadership/assessment`}
                className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-[10px] bg-[#C9A227] px-7 text-base font-semibold text-[#0A192F] transition-colors hover:bg-[#D9B23A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Route className="h-[18px] w-[18px]" aria-hidden />
                {ctaPrimary}
              </Link>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-[10px] border-2 border-white/90 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Phone className="h-[18px] w-[18px]" aria-hidden />
                {ctaSecondary}
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <AssessmentMock />
          </div>
        </div>
      </div>
    </section>
  );
}
