"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function NewsletterForm({
  emailPlaceholder,
  subscribeLabel,
  successToast,
}: {
  emailPlaceholder: string;
  subscribeLabel: string;
  successToast: string;
}) {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast(successToast);
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <Input
          type="email"
          name="newsletter-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          aria-label={emailPlaceholder}
          className="border-paper-0/20 bg-paper-0/10 text-paper-0 placeholder:text-ink-300"
        />
      </div>
      <Button type="submit" size="l">
        {subscribeLabel}
      </Button>
    </form>
  );
}
