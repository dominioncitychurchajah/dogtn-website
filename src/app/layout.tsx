import type { Metadata } from "next";
// Self-hosted fonts (no build-time network fetch).
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/inter/wght-italic.css";
import "@fontsource-variable/playfair-display/index.css";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "David Ogbueli · Global Transformation Network",
    template: "%s · David Ogbueli",
  },
  description:
    "A global network dedicated to purpose, discipleship, leadership, mentorship, and the strategic building of institutions and nations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col bg-paper-0 text-ink-900">{children}</body>
    </html>
  );
}
