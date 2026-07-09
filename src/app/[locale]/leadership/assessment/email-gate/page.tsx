"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Section, Container } from "@/components/layout/Section";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useQuizStore } from "@/lib/quiz-store";

export default function EmailGatePage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string | undefined) ?? "en";
  const setEmail = useQuizStore((s) => s.setEmail);

  const [value, setValue] = React.useState("");

  const resultsHref = `/${locale}/leadership/assessment/results`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const email = value.trim();
    if (email) setEmail(email);
    router.push(resultsHref);
  }

  return (
    <Section surface="dark">
      <Container>
        <div className="mx-auto max-w-lg">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
              Assessment complete
            </span>
            <h1 className="text-display-l text-paper-0">
              Where should we send your results?
            </h1>
            <p className="mt-4 text-body-l text-ink-300">
              Your leadership profile is ready. Leave an email and we&apos;ll send
              your full roadmap — or skip straight to your results.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="name@organisation.com"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-paper-0"
            />

            <Button type="submit" size="l" className="w-full">
              View my results
              <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
            </Button>

            <div className="text-center">
              <Button
                href={resultsHref}
                variant="ghost"
                size="s"
                className="text-ink-300 hover:bg-transparent hover:text-paper-0"
              >
                Skip for now
              </Button>
            </div>
          </form>

          <p className="mt-10 flex items-start gap-3 border-t border-ink-700 pt-6 text-caption text-ink-300">
            <ShieldCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
              aria-hidden
            />
            We respect your privacy. Your email is only used to send your assessment
            results and leadership insights.
          </p>
        </div>
      </Container>
    </Section>
  );
}
