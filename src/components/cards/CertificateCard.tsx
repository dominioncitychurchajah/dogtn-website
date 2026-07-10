"use client";

import { Award, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function CertificateCard({
  title,
  issuedOn,
  verifyId,
}: {
  title: string;
  issuedOn: string;
  verifyId: string;
}) {
  const { toast } = useToast();
  return (
    <div className="flex flex-col rounded-[var(--radius-l)] border-2 border-gold-600/30 bg-gradient-to-br from-paper-0 to-gold-600/5 p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-600 text-ink-900">
          <Award className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-body-l font-semibold text-ink-900">{title}</h3>
          <p className="text-caption text-ink-500">Issued {issuedOn}</p>
        </div>
      </div>
      <div className="mt-auto flex gap-2">
        <Button size="s" variant="secondary" onClick={() => toast("Certificate downloaded")}>
          <Download className="h-4 w-4" /> Download
        </Button>
        <Button size="s" variant="ghost" onClick={() => toast("Verification link copied", "info")}>
          <Share2 className="h-4 w-4" /> Share
        </Button>
        <a href={`/verify?id=${encodeURIComponent(verifyId)}`} className="ms-auto self-center text-caption text-gold-hover underline">
          Verify
        </a>
      </div>
    </div>
  );
}
