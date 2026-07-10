import { MessageCircle, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/i18n/pages/home";
import { Section, Container } from "@/components/layout/Section";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterCapture({
  locale,
  copy,
}: {
  locale: Locale;
  copy: HomeCopy["newsletter"];
}) {
  return (
    <Section surface="dark">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-heading-1 text-paper-0">{copy.title}</h2>
            <p className="measure mt-4 text-body-l text-ink-300">{copy.body}</p>
          </div>

          <div className="space-y-6">
            <NewsletterForm
              emailPlaceholder={copy.emailPlaceholder}
              subscribeLabel={copy.subscribe}
              successToast={copy.successToast}
            />

            <div className="flex flex-col gap-3 border-t border-paper-0/10 pt-6 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-body-s text-ink-300">{copy.whatsappPrompt}</span>
              <a
                href="mailto:support@davidogbueli.org?subject=WhatsApp%20Broadcast%20Request"
                className="inline-flex items-center gap-2 text-body-m font-semibold text-gold-400 transition-colors hover:text-gold-hover"
              >
                <MessageCircle className="h-5 w-5" />
                {copy.whatsappCta}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
