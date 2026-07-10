"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function CertVerifier() {
  const router = useRouter();
  const [value, setValue] = React.useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = value.trim();
    if (!id) return;
    router.push(`/verify?id=${encodeURIComponent(id)}`);
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Input
            id="cert-id"
            name="cert-id"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter certificate ID (e.g. DLI-2026-0891)"
            aria-label="Certificate ID"
          />
        </div>
        <Button type="submit" size="m" className="shrink-0">
          Verify
        </Button>
      </div>
      <p className="mt-3 flex items-center gap-2 text-caption text-ink-300">
        <ShieldCheck className="h-4 w-4 text-gold-400" aria-hidden />
        Secured verification of every DLI credential we issue.
      </p>
    </form>
  );
}

export default CertVerifier;
