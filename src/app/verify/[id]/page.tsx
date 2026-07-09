import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, Award, XCircle, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Verify Credential",
  description:
    "Public verification of credentials issued by the David Ogbueli Global Transformation Network.",
};

export const dynamicParams = true;

export function generateStaticParams() {
  return [{ id: "DOGTN-2026-0891" }];
}

/** A credential id is treated as valid unless it is empty or the sentinel "invalid". */
function isValidId(id: string) {
  const trimmed = id.trim();
  return trimmed.length > 0 && trimmed.toLowerCase() !== "invalid";
}

/** Deterministic mock holder/credential details derived from the id (no DB). */
function mockCredential(id: string) {
  const HOLDERS = [
    "Grace Adeyemi",
    "Emmanuel Okonkwo",
    "Ruth Balogun",
    "Samuel Chukwu",
    "Deborah Nwosu",
  ];
  const CREDENTIALS = [
    "Executive Leadership Certification",
    "DLI Advanced — Strategy & Governance",
    "DLI Basic — Leadership Foundations",
    "Priesthood Institute — Ministry Leaders Formation",
  ];
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return {
    holder: HOLDERS[sum % HOLDERS.length],
    credential: CREDENTIALS[sum % CREDENTIALS.length],
    issuedOn: "14 May 2026",
  };
}

function BrandBar() {
  return (
    <header className="border-b border-ink-100 bg-paper-0">
      <div className="mx-auto flex max-w-content items-center gap-2 px-5 py-4 lg:px-16">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-900 text-gold-400">
          <Landmark className="h-4 w-4" aria-hidden />
        </span>
        <span className="text-body-s font-semibold uppercase tracking-[0.18em] text-ink-900">
          David Ogbueli · Global Transformation Network
        </span>
      </div>
    </header>
  );
}

function FooterLine() {
  return (
    <footer className="border-t border-ink-100 bg-paper-0">
      <div className="mx-auto max-w-content px-5 py-6 text-caption text-ink-500 lg:px-16">
        Credential verification is provided by the David Ogbueli Global Transformation Network.
        Questions? Contact the Dominion Leadership Institute registrar.
      </div>
    </footer>
  );
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const valid = isValidId(id);
  const record = valid ? mockCredential(id) : null;

  return (
    <div className="flex min-h-dvh flex-col bg-paper-50 text-ink-900">
      <BrandBar />

      <main className="flex flex-1 items-center justify-center px-5 py-16">
        {valid && record ? (
          <div className="w-full max-w-md overflow-hidden rounded-[var(--radius-xl)] border border-ink-100 bg-paper-0 shadow-elev-3">
            {/* Gold seal header */}
            <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-gold-600/10 to-paper-0 px-8 pt-10 pb-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-600 text-ink-900 shadow-elev-2 ring-8 ring-gold-600/15">
                <Award className="h-8 w-8" aria-hidden />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-verd-600/25 bg-verd-600/12 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-verd-600">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                Verified &#10003;
              </span>
            </div>

            <div className="px-8 pb-10 text-center">
              <p className="text-caption font-semibold uppercase tracking-[0.2em] text-ink-500">
                This certifies that
              </p>
              <h1 className="mt-2 text-heading-2 text-ink-900">{record.holder}</h1>
              <p className="mt-4 text-caption font-semibold uppercase tracking-[0.2em] text-ink-500">
                has been awarded
              </p>
              <p className="mt-1 font-display text-body-l font-semibold text-ink-900">
                {record.credential}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-m)] border border-ink-100 bg-ink-100 text-start">
                <div className="bg-paper-0 p-4">
                  <dt className="text-caption uppercase tracking-wider text-ink-500">Issued</dt>
                  <dd className="mt-1 text-body-s font-semibold text-ink-900">{record.issuedOn}</dd>
                </div>
                <div className="bg-paper-0 p-4">
                  <dt className="text-caption uppercase tracking-wider text-ink-500">Credential ID</dt>
                  <dd className="mt-1 break-all font-mono text-body-s font-semibold text-ink-900">
                    {id}
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-caption text-ink-500">
                Issued by the Dominion Leadership Institute, an institution of the David Ogbueli
                Global Transformation Network.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md overflow-hidden rounded-[var(--radius-xl)] border border-ink-100 bg-paper-0 shadow-elev-3">
            <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-error-600/8 to-paper-0 px-8 pt-10 pb-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-error-600 text-paper-0 shadow-elev-2 ring-8 ring-error-600/15">
                <XCircle className="h-8 w-8" aria-hidden />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-error-600/25 bg-error-600/12 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-error-600">
                Not verified
              </span>
            </div>
            <div className="px-8 pb-10 text-center">
              <h1 className="text-heading-2 text-ink-900">Credential not found</h1>
              <p className="mt-3 text-body-s text-ink-500">
                We could not verify a credential
                {id.trim() ? (
                  <>
                    {" "}with the ID{" "}
                    <span className="break-all font-mono font-semibold text-ink-900">{id}</span>
                  </>
                ) : (
                  " for that request"
                )}
                . Please check the identifier and try again, or contact the registrar.
              </p>
              <Link
                href="/en/my-journey"
                className="mt-6 inline-flex text-body-s font-semibold text-gold-hover underline"
              >
                Return to your journey
              </Link>
            </div>
          </div>
        )}
      </main>

      <FooterLine />
    </div>
  );
}
