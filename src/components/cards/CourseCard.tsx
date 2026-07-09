import { CalendarDays } from "lucide-react";
import type { Course } from "@/data/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export function CourseCard({ course, ctaHref }: { course: Course; ctaHref: string }) {
  return (
    <div className="card-lift flex flex-col rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
      <div className="mb-3 flex items-center justify-between">
        <Badge tone="ink">{course.level}</Badge>
        <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-gold-hover">
          <CalendarDays className="h-4 w-4" /> {formatDate(course.cohortDate)}
        </span>
      </div>
      <h3 className="text-heading-3 text-ink-900">{course.title}</h3>
      <p className="mt-1 text-caption uppercase tracking-wider text-ink-500">
        {course.institution} · {course.durationWeeks} weeks
      </p>
      <p className="mt-3 flex-1 text-body-s text-ink-500">{course.description}</p>
      <Button href={ctaHref} size="s" className="mt-5 self-start">
        Enroll
      </Button>
    </div>
  );
}
