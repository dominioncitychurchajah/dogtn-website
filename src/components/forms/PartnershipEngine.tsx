"use client";

import * as React from "react";
import { ArrowRight, ArrowLeft, Lock, Heart, CheckCircle2, ShieldCheck, Mail, User, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

// Form steps definition
type FormStep = "amount" | "personal" | "payment" | "success";

const SUGGESTED_AMOUNTS = [50, 100, 150, 250, 500];

const IMPACT_ANCHORS: Record<number, string> = {
  50: "Trains 1 leader/month for a lifetime of impact.",
  100: "Trains 2 leaders/month & equips local community mentors.",
  150: "Funds 1 entire community mentorship hub every quarter.",
  250: "Funds a mentorship hub & supports digital teachings digitization.",
  500: "Sponsors national transformation initiatives and local conferences.",
};

export function PartnershipEngine() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  // States
  const [step, setStep] = React.useState<FormStep>("amount");
  const [frequency, setFrequency] = React.useState<"monthly" | "one-time">("monthly");
  const [selectedAmount, setSelectedAmount] = React.useState<number>(150);
  const [customAmount, setCustomAmount] = React.useState<string>("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [prayerRequest, setPrayerRequest] = React.useState("");
  
  // Payment states
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExp, setCardExp] = React.useState("");
  const [cardCvv, setCardCvv] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "apple-pay" | "google-pay">("card");
  
  // Processing & Loading States
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [validationError, setValidationError] = React.useState("");

  // Read URL search params for pre-selected tier
  React.useEffect(() => {
    const tier = searchParams?.get("tier");
    if (tier === "seed") {
      setSelectedAmount(50);
      setCustomAmount("");
    } else if (tier === "harvest") {
      setSelectedAmount(150);
      setCustomAmount("");
    } else if (tier === "kingdom") {
      setSelectedAmount(500);
      setCustomAmount("");
    }
  }, [searchParams]);

  // Derived values
  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  // Real-time dynamic explanation text based on amount
  const getImpactExplanation = () => {
    if (currentAmount <= 0) return "Choose an amount to see how you can raise leaders.";
    if (IMPACT_ANCHORS[currentAmount]) return IMPACT_ANCHORS[currentAmount];
    if (currentAmount < 50) return "Supports printing curriculum and study guides for local cells.";
    if (currentAmount < 150) return `Trains ${Math.floor(currentAmount / 50)} leaders per month for a lifetime of impact.`;
    if (currentAmount < 500) return "Funds a mentorship hub and accelerates teachings distribution.";
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

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "card") {
      if (!cardNumber.replace(/\s/g, "") || cardNumber.length < 16) {
        setValidationError("Please enter a valid 16-digit card number.");
        return;
      }
      if (!cardExp || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardExp)) {
        setValidationError("Expiry date must be MM/YY.");
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        setValidationError("CVV must be 3 or 4 digits.");
        return;
      }
    }

    setValidationError("");
    setIsProcessing(true);

    // Mock processing loader (1.5 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      toast("Partnership set up successfully! Thank you.");
    }, 1800);
  };

  const handleWalletPay = (method: "apple-pay" | "google-pay") => {
    setPaymentMethod(method);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      toast("Partnership set up successfully via mobile wallet! Thank you.");
    }, 1500);
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
          <h3 className="text-body-l font-bold text-paper-0 mb-4">Choose Your Gift</h3>
          
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
            {SUGGESTED_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount("");
                  setValidationError("");
                }}
                className={cn(
                  "py-3.5 text-body-m font-bold border rounded-[var(--radius-s)] transition-all cursor-pointer",
                  selectedAmount === amt && !customAmount
                    ? "bg-gold-600 border-gold-600 text-ink-900 shadow-elev-2 scale-102"
                    : "bg-white/5 border-white/10 text-paper-0 hover:bg-white/10 hover:border-white/20"
                )}
              >
                ${amt}
              </button>
            ))}
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-body-m text-white/40">$</span>
              <input
                type="number"
                placeholder="Other"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
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

      {/* STEP 3: SECURE PAYMENT DETAILS */}
      {step === "payment" && (
        <form onSubmit={handlePay} className="animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-body-l font-bold text-paper-0">Choose Payment Method</h3>
            <button
              type="button"
              onClick={() => setStep("personal")}
              className="text-caption text-white/60 hover:text-gold-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          {/* Quick Pay / Wallet Pay */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <button
              type="button"
              onClick={() => handleWalletPay("apple-pay")}
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 py-3 bg-black hover:bg-black/90 border border-white/10 text-white rounded-[var(--radius-s)] font-semibold transition-all cursor-pointer"
            >
               Pay
            </button>
            <button
              type="button"
              onClick={() => handleWalletPay("google-pay")}
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 py-3 bg-[#f8f9fa] hover:bg-[#e9ecef] border border-white/10 text-ink-900 rounded-[var(--radius-s)] font-semibold transition-all cursor-pointer"
            >
              Google Pay
            </button>
          </div>

          <div className="relative flex py-3 items-center mb-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-caption uppercase tracking-wider text-white/40">Or Pay with Card</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Credit Card inputs */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="cc-number" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                Card Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-white/40"><CreditCard className="w-5 h-5" /></span>
                <input
                  id="cc-number"
                  type="text"
                  placeholder="4111 2222 3333 4444"
                  value={cardNumber}
                  onChange={(e) => {
                    // Format spaces
                    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                    const formatted = val.replace(/(.{4})/g, "$1 ").trim();
                    setCardNumber(formatted);
                    setValidationError("");
                  }}
                  autoComplete="cc-number"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-s)] pl-11 pr-4 py-3 text-body-m text-paper-0 outline-none focus:border-gold-600 placeholder:text-white/30"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cc-exp" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                  Expiry Date
                </label>
                <input
                  id="cc-exp"
                  type="text"
                  placeholder="MM/YY"
                  value={cardExp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                    const formatted = val.length >= 2 ? `${val.slice(0, 2)}/${val.slice(2)}` : val;
                    setCardExp(formatted);
                    setValidationError("");
                  }}
                  autoComplete="cc-exp"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-s)] px-4 py-3 text-body-m text-paper-0 outline-none focus:border-gold-600 placeholder:text-white/30 text-center"
                  style={{ fontSize: "16px" }}
                />
              </div>

              <div>
                <label htmlFor="cc-csc" className="block text-caption font-semibold uppercase tracking-wider text-white/60 mb-2">
                  CVV / CVC
                </label>
                <input
                  id="cc-csc"
                  type="password"
                  placeholder="***"
                  value={cardCvv}
                  onChange={(e) => {
                    setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
                    setValidationError("");
                  }}
                  autoComplete="cc-csc"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-s)] px-4 py-3 text-body-m text-paper-0 outline-none focus:border-gold-600 placeholder:text-white/30 text-center"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full group flex items-center justify-center gap-2 py-4.5 rounded-[var(--radius-s)] bg-gold-600 hover:bg-gold-hover text-body-m font-bold text-ink-900 transition-all cursor-pointer hover:shadow-elev-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-ink-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Securing Your Partnership...
              </span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Partner ${currentAmount}/{frequency === "monthly" ? "mo" : "one-time"}
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-white/40 tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>256-Bit SSL Encrypted Connection</span>
          </div>
        </form>
      )}

      {/* STEP 4: THANK YOU & ONBOARDING */}
      {step === "success" && (
        <div className="text-center py-6 animate-success flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gold-600/10 border border-gold-600/30 flex items-center justify-center text-gold-400 mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h3 className="text-heading-2 font-display text-paper-0 mb-3">Welcome to the family!</h3>
          <p className="text-body-m text-white/70 max-w-sm mx-auto mb-8 leading-relaxed">
            Your recurring seed of <span className="text-gold-400 font-bold">${currentAmount}</span> has been set up. Together, we are raising leaders who transform nations.
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
          </div>

          <button
            type="button"
            onClick={() => {
              setStep("amount");
              setName("");
              setEmail("");
              setCardNumber("");
              setCardExp("");
              setCardCvv("");
              setCustomAmount("");
              setPrayerRequest("");
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
