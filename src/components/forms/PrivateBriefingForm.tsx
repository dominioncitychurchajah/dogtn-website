"use client";

import * as React from "react";
import { Lock, Mail, User, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function PrivateBriefingForm() {
  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [org, setOrg] = React.useState("");
  const [context, setContext] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast("Name and email are required.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      toast("Request received. Our leadership coordination team will contact you shortly.");
    }, 1200);
  }

  if (success) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-[12px] p-6 text-center animate-[successPop_500ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes successPop {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}} />
        <div className="w-12 h-12 rounded-full bg-gold-600/10 border border-gold-600/30 flex items-center justify-center text-gold-400 mx-auto mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-body-l font-bold text-paper-0 mb-2">Briefing Request Sent</h3>
        <p className="text-body-s text-white/60 leading-relaxed max-w-sm mx-auto">
          Thank you, <span className="text-gold-400 font-semibold">{name}</span>. A private briefing liaison will contact you at <span className="font-semibold">{email}</span> within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-[12px] p-6 lg:p-8 space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pb-name" className="mb-2 block text-caption font-semibold uppercase tracking-wider text-white/60">
            Full Name
          </label>
          <div className="relative border-b border-white/20 py-2 focus-within:border-gold-600 transition-colors">
            <span className="absolute left-0 top-3 text-white/30"><User className="w-4 h-4" /></span>
            <input
              id="pb-name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full bg-transparent pl-7 pr-2 text-body-m text-paper-0 outline-none placeholder:text-white/30"
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="pb-email" className="mb-2 block text-caption font-semibold uppercase tracking-wider text-white/60">
            Email Address
          </label>
          <div className="relative border-b border-white/20 py-2 focus-within:border-gold-600 transition-colors">
            <span className="absolute left-0 top-3 text-white/30"><Mail className="w-4 h-4" /></span>
            <input
              id="pb-email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-transparent pl-7 pr-2 text-body-m text-paper-0 outline-none placeholder:text-white/30"
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="pb-org" className="mb-2 block text-caption font-semibold uppercase tracking-wider text-white/60">
          Organization / Family Office
        </label>
        <div className="relative border-b border-white/20 py-2 focus-within:border-gold-600 transition-colors">
          <input
            id="pb-org"
            type="text"
            placeholder="Organization, foundation, or family trust name"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            autoComplete="organization"
            className="w-full bg-transparent text-body-m text-paper-0 outline-none placeholder:text-white/30"
            style={{ fontSize: "16px" }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="pb-context" className="mb-2 block text-caption font-semibold uppercase tracking-wider text-white/60">
          Areas of Strategic Interest
        </label>
        <textarea
          id="pb-context"
          rows={3}
          placeholder="Briefly describe what you would like to discuss during the private briefing..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="w-full resize-none bg-white/5 border border-white/10 hover:border-white/20 rounded-[var(--radius-s)] px-4 py-3 text-body-m text-paper-0 outline-none focus:border-gold-600 placeholder:text-white/30 leading-relaxed"
          style={{ fontSize: "16px" }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-s)] bg-gold-600 hover:bg-gold-hover px-10 py-4 text-caption font-bold uppercase tracking-widest text-ink-900 transition-all cursor-pointer hover:shadow-elev-1 disabled:opacity-50"
      >
        {isSubmitting ? "Sending Request..." : "Request a Private Conversation"}
        <Lock className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
