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

// Runs before first paint so the chosen theme never flashes.
const themeInit = `(function(){try{var p=localStorage.getItem('dogtn-theme');var d=p==='dark'||((!p||p==='system')&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col bg-paper-0 text-ink-900">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
