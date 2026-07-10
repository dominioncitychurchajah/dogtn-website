import Image from "next/image";
import Link from "next/link";
import { MapPin, Globe } from "lucide-react";
import type { EventItem } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { dateParts } from "@/lib/utils";

export function EventCard({ event, locale }: { event: EventItem; locale: Locale }) {
  const { day, month } = dateParts(event.date);

  return (
    <div className="card-lift group flex flex-col overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-0">
      <div className="relative h-48 overflow-hidden bg-ink-900">
        <Image src={event.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-[var(--radius-s)] bg-paper-0/95 px-3 py-2 text-center shadow-elev-1">
          <span className="block font-display text-heading-2 leading-none text-ink-900">{day}</span>
          <span className="text-caption font-bold uppercase text-ink-500">{month}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge tone="gold">{event.type}</Badge>
          <span className="inline-flex items-center gap-1 text-caption text-ink-500">
            {event.online ? <Globe className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
            {event.online ? "Online" : event.location}
          </span>
        </div>
        <h3 className="text-heading-3 leading-tight text-ink-900">{event.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-body-s text-ink-500">{event.summary}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-body-s font-semibold text-ink-900">Free</span>
          <Button href={`/${locale}/events/${event.slug}`} size="s" variant="secondary">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
