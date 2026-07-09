"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { Section, Container } from "@/components/layout/Section";
import { QuizEngine } from "@/components/forms/QuizEngine";

export default function AssessmentQuestionPage() {
  const params = useParams();
  const locale = (params?.locale as string | undefined) ?? "en";

  return (
    <Section surface="alt">
      <Container>
        <QuizEngine locale={locale as Locale} />
      </Container>
    </Section>
  );
}
