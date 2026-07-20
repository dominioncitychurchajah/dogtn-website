"use client";

import * as React from "react";
import { ArrowRight, ArrowLeft, Lock, Heart, CheckCircle2, ShieldCheck, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

// Form steps definition
type FormStep = "amount" | "personal" | "payment" | "success";
type Currency = "USD" | "NGN";

// Card entry itself happens inside Paystack's own hosted popup — never in this
// component's state — so this integration never touches raw card data (PCI scope
// stays with Paystack). Only the public key + subaccount code are safe to ship
// in the frontend bundle; the secret key lives server-side in the Cloudflare
// Pages Function at functions/api/paystack-verify.js.
const PAYSTACK_PUBLIC_KEY = "pk_test_85c8b2a338ef533c919945b708420b840c5c2815";
const PAYSTACK_SUBACCOUNT = "ACCT_1pp70z6brk7nvtr";

const SUGGESTED_AMOUNTS: Record<Currency, number[]> = {
  USD: [50, 100, 150, 250, 500],
  // Round Naira giving tiers rather than a live-converted figure.
  NGN: [75000, 150000, 225000, 375000, 750000],
};

const CURRENCY_SYMBOL: Record<Currency, string> = { USD: "$", NGN: "₦" };

// Approximate NGN/USD rate used only to pick the right impact-tier message for
// custom amounts — never shown to the user as a live conversion.
const NGN_PER_USD = 1500;

const IMPACT_ANCHORS_BY_TIER = [
  "Trains 1 leader/month for a lifetime of impact.",
  "Trains 2 leaders/month & equips local community mentors.",
  "Funds 1 entire community mentorship hub every quarter.",
  "Funds a mentorship hub & supports digital teachings digitization.",
  "Sponsors national transformation initiatives and local conferences.",
];

type PaystackHandler = { openIframe: () => void };
type PaystackSetupOptions = {
  key: string;
  email: string;
  amount: number;
  currency: Currency;
  ref: string;
  subaccount?: string;
  metadata?: Record<string, unknown>;
  callback: (response: { reference: string }) => void;
  onClose: () => void;
};

declare global {
  interface Window {
    PaystackPop?: { setup: (options: PaystackSetupOptions) => PaystackHandler };
  }
}

const PAYSTACK_SCRIPT_SRC = "https://js.paystack.co/v1/inline.js";

export function PartnershipEngine() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // States
  const [step, setStep] = React.useState<FormStep>("amount");
  const [frequency, setFrequency] = React.useState<"monthly" | "one-time">("monthly");
  const [currency, setCurrency] = React.useState<Currency>("USD");
  const [selectedTierIndex, setSelectedTierIndex] = React.useState<number | null>(2);
  const [customAmount, setCustomAmount] = React.useState<string>("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [prayerRequest, setPrayerRequest] = React.useState("");

  // Processing & Loading States
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [validationError, setValidationError] = React.useState("");
  const [paystackReady, setPaystackReady] = React.useState(false);
  const [paystackReference, setPaystackReference] = React.useState<string | null>(null);

  // Load the Paystack inline-checkout script once.
  React.useEffect(() => {
    if (window.PaystackPop) {
      setPaystackReady(true);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${PAYSTACK_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => setPaystackReady(true));
      return;
    }
    const script = document.createElement("script");
    script.src = PAYSTACK_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setPaystackReady(true);
    document.body.appendChild(script);
  }, []);

  // Read URL search params for pre-selected tier
  React.useEffect(() => {
    const tier = searchParams?.get("tier");
    if (tier === "seed") setSelectedTierIndex(0);
    else if (tier === "harvest") setSelectedTierIndex(1);
    else if (tier === "kingdom") setSelectedTierIndex(4);
    if (tier) setCustomAmount("");
  }, [searchParams]);

  const suggestedAmounts = SUGGESTED_AMOUNTS[currency];
  const selectedAmount = selectedTierIndex !== null ? suggestedAmounts[selectedTierIndex] : 0;
  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  // Real-time dynamic explanation text based on amount
  const getImpactExplanation = () => {
    if (currentAmount <= 0) return "Choose an amount to see how you can raise leaders.";
    if (selectedTierIndex !== null && !customAmount) return IMPACT_ANCHORS_BY_TIER[selectedTierIndex];
    const usdEquivalent = currency === "NGN" ? currentAmount / NGN_PER_USD : currentAmount;
    if (usdEquivalent < 50) return "Supports printing curriculum and study guides for local cells.";
    if (usdEquivalent < 150) return `Trains ${Math.max(1, Math.floor(usdEquivalent / 50))} leaders per month for a lifetime of impact.`;
    if (usdEquivalent < 500) return "Funds a mentorship hub and accelerates teachings distribution.";
    return "Sponsors multiple regional mentorship hubs and national leadership training.";
  };

  // Navigations
  const handleNextFromAmount = () => {
    if (currentAmount <= 0) {
      setValidationError("Please select or enter a valid amount.");
      return;
    }
    setValidationError("");
    setStep("personal");
  };

  const handleNextFromPersonal = () => {
    if (!name.trim()) {
      setValidationError("Full name is required.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    setValidationError("");
    setStep("payment");
  };

  const handlePaystackPay = () => {
    if (!paystackReady || !window.PaystackPop) {
      setValidationError("Payment system is still loading — please try again in a moment.");
      return;
    }
    setValidationError("");
    setIsProcessing(true);

    const reference = `dogtn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(currentAmount * 100), // Paystack expects the smallest currency unit (cents/kobo).
      currency,
      ref: reference,
      subaccount: PAYSTACK_SUBACCOUNT,
      metadata: {
        full_name: name,
        frequency,
        prayer_request: prayerRequest,
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: name },
          { display_name: "Frequency", variable_name: "frequency", value: frequency },
        ],
      },
      callback: (response) => {
        void verifyAndFinish(response.reference);
      },
      onClose: () => {
        setIsProcessing(false);
      },
    });

    handler.openIframe();
  };

  const verifyAndFinish = async (reference: string) => {
    try {
      const res = await fetch("/api/paystack-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        setPaystackReference(reference);
        setIsProcessing(false);
        setStep("success");
        toast("Partnership set up successfully! Thank you.");
      } else {
        setIsProcessing(false);
        setValidationError("We couldn't verify that payment. If you were charged, please contact us and we'll sort it out.");
      }
    } catch {
      setIsProcessing(false);
      setValidationError("We couldn't confirm your payment with our server. If you were charged, please contact us and we'll sort it out.");
    }
  };

  const getStepProgress = () => {
    switch (step) {
      case "amount": return 25;
      case "personal": return 50;
      case "payment": return 75;
      case "success": return 100;
    }
  };

  return (
    <div className="rounded-[var(--radius-l)] border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes successPop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-success {
          animation: successPop 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Progress tracker */}
      {step !== "success" && (
        <div className="mb-6">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/55 mb-2">
            <span>Step {step === "amount" ? "1" : step === "personal" ? "2" : "3"} of 3</span>
            <span>{getStepProgress()}% Complete</span>
          </div>
          <div className="h-1 bg-white/10 w-full rounded overflow-hidden">
            <div
              className="h-full bg-gold-600 transition-all duration-300"
              style={{ width: `${getStepProgress()}%` }}
            />
          </div>
        </div>
      )}

      {validationError && (
        <div className="mb-4 p-3 bg-error-600/20 border border-error-600/30 text-white text-body-s rounded-[var(--radius-s)]">
          {validationError}
        </div>
      )}

      {/* STEP 1: AMOUNT & FREQUENCY */}
      {step === "amount" && (
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-body-l font-bold text-paper-0">Choose Your Gift</h3>
            <div className="flex gap-1 p-0.5 bg-white/5 rounded-full border border-white/10">
              {(["USD", "NGN"] as const).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => {
                    setCurrency(cur);
                    setCustomAmount("");
                  }}
                  className={cn(
                    "px-3 py-1.5 text-caption font-bold rounded-full transition-all cursor-pointer",
                    currency === cur ? "bg-gold-600 text-ink-900" : "text-white/60 hover:text-paper-0"
                  )}
                >
                  {cur === "USD" ? "$ USD" : "₦ NGN"}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency Toggle */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-[var(--radius-s)] border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => setFrequency("monthly")}
              className={cn(
                "flex-1 py-2.5 text-caption font-bold uppercase tracking-wider rounded-[var(--radius-s)] transition-all cursor-pointer",
                frequency === "monthly" ? "bg-gold-600 text-ink-900 shadow-elev-1" : "text-white/60 hover:text-paper-0"
              )}
            >
              Monthly Partner
            </button>
            <button
              type="button"
              onClick={() => setFrequency("one-time")}
              className={cn(
                "flex-1 py-2.5 text-caption font-bold uppercase tracking-wider rounded-[var(--radius-s)] transition-all cursor-pointer",
                frequency === "one-time" ? "bg-gold-600 text-ink-900 shadow-elev-1" : "text-white/60 hover:text-paper-0"
              )}
            >
              One-Time Gift
            </button>
          </div>

          {/* Suggested Amounts Grid */}
          <label className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-3">
            Select Amount
          </label>
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {suggestedAmounts.map((amt, idx) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setSelectedTierIndex(idx);
                  setCustomAmount("");
                  setValidationError("");
                }}
                className={cn(
                  "py-3.5 text-body-m font-bold border rounded-[var(--radius-s)] transition-all cursor-pointer",
                  selectedTierIndex === idx && !customAmount
                    ? "bg-gold-600 border-gold-600 text-ink-900 shadow-elev-2 scale-102"
                    : "bg-white/5 border-white/10 text-paper-0 hover:bg-white/10 hover:border-white/20"
                )}
              >
                {CURRENCY_SYMBOL[currency]}{amt.toLocaleString()}
              </button>
            ))}
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-body-m text-white/40">{CURRENCY_SYMBOL[currency]}</span>
              <input
                type="number"
                placeholder="Other"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedTierIndex(null);
                  setValidationError("");
                }}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-[var(--radius-s)] pl-7 pr-3 py-3.5 text-body-m text-paper-0 outline-none focus:border-gold-600 font-bold placeholder:text-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ fontSize: "16px" }} // Prevent iOS Zoom
              />
            </div>
          </div>

          {/* Real-time Impact Anchor Box */}
          <div className="bg-gold-600/10 border border-gold-600/25 rounded-[var(--radius-s)] p-4 mb-8">
            <div className="flex gap-2.5 items-start">
              <Heart className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-body-s font-bold text-gold-400 block mb-0.5">Your Impact:</span>
                <p className="text-body-s text-white/80 leading-relaxed">{getImpactExplanation()}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNextFromAmount}
            className="w-full group flex items-center justify-center gap-2 py-4.5 rounded-[var(--radius-s)] bg-gold-600 hover:bg-gold-hover text-body-m font-bold text-ink-900 transition-all cursor-pointer hover:shadow-elev-2"
          >
            Continue to Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}

      {/* STEP 2: PERSONAL DETAILS & PRAYER REQUEST */}
      {step === "personal" && (
        <div className="animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-body-l font-bold text-paper-0">Your Details</h3>
            <button
              onClick={() => setStep("amount")}
              className="text-caption text-white/60 hover:text-gold-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          <div className="space-y-5 mb-8">
            <div className="relative">
              <label htmlFor="fullname" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-white/40"><User className="w-5 h-5" /></span>
                <input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setValidationError("");
                  }}
                  autoComplete="name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-s)] pl-11 pr-4 py-3 text-body-m text-paper-0 outline-none focus:border-gold-600 placeholder:text-white/30"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="email" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-white/40"><Mail className="w-5 h-5" /></span>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValidationError("");
                  }}
                  autoComplete="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-s)] pl-11 pr-4 py-3 text-body-m text-paper-0 outline-none focus:border-gold-600 placeholder:text-white/30"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="prayer" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                Prayer Requests (Optional)
              </label>
              <textarea
                id="prayer"
                rows={3}
                placeholder="Let us know how Dr. Ogbueli and the ministry partners can pray for you..."
                value={prayerRequest}
                onChange={(e) => setPrayerRequest(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-s)] px-4 py-3 text-body-m text-paper-0 outline-none focus:border-gold-600 resize-none placeholder:text-white/30"
                style={{ fontSize: "16px" }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleNextFromPersonal}
            className="w-full group flex items-center justify-center gap-2 py-4.5 rounded-[var(--radius-s)] bg-gold-600 hover:bg-gold-hover text-body-m font-bold text-ink-900 transition-all cursor-pointer hover:shadow-elev-2"
          >
            Continue to Payment
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}

      {/* STEP 3: PAYMENT — hands off to Paystack's own secure checkout */}
      {step === "payment" && (
        <div className="animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-body-l font-bold text-paper-0">Confirm & Pay</h3>
            <button
              type="button"
              onClick={() => setStep("personal")}
              className="text-caption text-white/60 hover:text-gold-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[var(--radius-s)] p-5 mb-6 space-y-2.5">
            <div className="flex justify-between text-body-s text-white/70">
              <span>Gift</span>
              <span className="font-bold text-paper-0">{CURRENCY_SYMBOL[currency]}{currentAmount.toLocaleString()} {frequency === "monthly" ? "/ mo" : "one-time"}</span>
            </div>
            <div className="flex justify-between text-body-s text-white/70">
              <span>Name</span>
              <span className="text-paper-0">{name}</span>
            </div>
            <div className="flex justify-between text-body-s text-white/70">
              <span>Email</span>
              <span className="text-paper-0">{email}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePaystackPay}
            disabled={isProcessing}
            className="w-full group flex items-center justify-center gap-2 py-4.5 rounded-[var(--radius-s)] bg-gold-600 hover:bg-gold-hover text-body-m font-bold text-ink-900 transition-all cursor-pointer hover:shadow-elev-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-ink-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Confirming Your Partnership...
              </span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Pay {CURRENCY_SYMBOL[currency]}{currentAmount.toLocaleString()} with Paystack
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-white/40 tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>Secured &amp; Verified by Paystack</span>
          </div>

          {frequency === "monthly" && (
            <p className="mt-4 text-center text-[11px] text-white/40 leading-relaxed">
              This confirms your first monthly gift now. Our team will follow up to set up automatic recurring billing.
            </p>
          )}
        </div>
      )}

      {/* STEP 4: THANK YOU & ONBOARDING */}
      {step === "success" && (
        <div className="text-center py-6 animate-success flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gold-600/10 border border-gold-600/30 flex items-center justify-center text-gold-400 mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h3 className="text-heading-2 font-display text-paper-0 mb-3">Welcome to the family!</h3>
          <p className="text-body-m text-white/70 max-w-sm mx-auto mb-8 leading-relaxed">
            Your gift of <span className="text-gold-400 font-bold">{CURRENCY_SYMBOL[currency]}{currentAmount.toLocaleString()}</span> has been confirmed. Together, we are raising leaders who transform nations.
          </p>

          <div className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-s)] p-5 text-left mb-8">
            <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest block mb-3">What's Next:</span>
            <ul className="space-y-3.5 text-body-s text-white/80">
              <li className="flex gap-2.5 items-start">
                <span className="text-gold-400 select-none">•</span>
                <span>An official tax receipt has been sent to <span className="font-semibold">{email}</span>.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-gold-400 select-none">•</span>
                <span>You will receive your welcome package and access credentials to the Teachings Vault within 5 minutes.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-gold-400 select-none">•</span>
                <span>Our leadership coordination team will contact you to align your preferred prayer updates.</span>
              </li>
            </ul>
            {paystackReference && (
              <p className="mt-4 pt-4 border-t border-white/10 text-caption text-white/40">
                Reference: <span className="text-white/60">{paystackReference}</span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setStep("amount");
              setName("");
              setEmail("");
              setCustomAmount("");
              setSelectedTierIndex(2);
              setPrayerRequest("");
              setPaystackReference(null);
            }}
            className="px-6 py-2.5 border border-white/20 hover:border-gold-400 text-body-s text-white hover:text-gold-400 rounded-[var(--radius-s)] transition-colors cursor-pointer"
          >
            Manage Giving or Enter New Partner
          </button>
        </div>
      )}
    </div>
  );
}
