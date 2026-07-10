import Image from "next/image";
import { Quote } from "lucide-react";
import type { Testimony } from "@/data/types";

export function TestimonyCard({ testimony }: { testimony: Testimony }) {
  return (
    <figure className="flex flex-col items-center gap-6 text-center md:flex-row md:text-start">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-gold-600/20 md:h-40 md:w-40">
        <Image src={testimony.portrait} alt={testimony.name} fill sizes="160px" className="object-cover" />
      </div>
      <div className="max-w-2xl">
        <Quote className="mx-auto mb-3 h-8 w-8 text-gold-600 md:mx-0" />
        <blockquote className="font-display text-heading-2 italic leading-snug text-ink-900">
          “{testimony.quote}”
        </blockquote>
        <figcaption className="mt-5 flex flex-col items-center gap-2 md:flex-row">
          <span className="text-body-m font-semibold text-ink-900">{testimony.name}</span>
          <span className="hidden text-ink-300 md:inline">,</span>
          <span className="text-body-s text-ink-500">
            {testimony.role}, {testimony.stage}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
