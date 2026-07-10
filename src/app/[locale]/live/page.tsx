import type { Metadata } from "next";
import { ArrowRight, PlayCircle, Radio } from "lucide-react";
import { Container, Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Watch Live",
  description: "Watch Dominion City messages and live services through the official Dominion City YouTube channel.",
};

export default function LivePage() {
  return (
    <>
      <section className="bg-ink-900 text-paper-0">
        <Container className="py-24 text-center lg:py-32">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/35 bg-gold-400/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
            <Radio className="h-4 w-4" aria-hidden />
            Watch Live
          </span>
          <h1 className="mx-auto max-w-4xl text-display-l text-paper-0">Messages that help you grow and lead.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-300">
            Watch live services, recent messages, worship moments, and teaching series through the official Dominion City channel.
          </p>
        </Container>
      </section>

      <Section surface="paper">
        <Container>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-xl)] border border-ink-100 bg-ink-900 shadow-elev-3">
            <div className="flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(201,169,98,0.22),_rgba(15,23,41,1)_58%)] p-8 text-center text-paper-0">
              <div>
                <PlayCircle className="mx-auto mb-5 h-16 w-16 text-gold-400" aria-hidden />
                <h2 className="text-heading-2 text-paper-0">Open the official channel</h2>
                <p className="mx-auto mt-3 max-w-xl text-body-m text-ink-300">
                  We are linking directly to the verified Dominion City YouTube presence instead of sending visitors to search results.
                </p>
                <a
                  href="https://www.youtube.com/@DominionCity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-m)] bg-gold-600 px-8 text-body-l font-semibold text-ink-900 hover:bg-gold-hover"
                >
                  Watch on YouTube
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
