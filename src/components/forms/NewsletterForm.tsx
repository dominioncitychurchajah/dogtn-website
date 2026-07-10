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
  const [error, setError] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    toast(successToast);
    setEmail("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <Input
          type="email"
          name="newsletter-email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder={emailPlaceholder}
          aria-label={emailPlaceholder}
          error={error}
          className="border-paper-0/20 bg-paper-0/10 text-paper-0 placeholder:text-ink-300"
        />
      </div>
      <Button type="submit" size="l">
        {subscribeLabel}
      </Button>
    </form>
  );
}
