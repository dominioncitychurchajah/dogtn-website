import type { Metadata } from "next";
// Self-hosted fonts (no build-time network fetch).
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/playfair-display/index.css";
// These two faces render the above-fold heading and body. Fonts are reached
// via CSS, so the browser only discovers them after the stylesheet parses;
// importing them here makes Next emit a <link rel="preload"> with the hashed
// build URL, removing that hop. The webfont swap was what repainted the hero
// heading and re-fired LCP.
import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2";
import playfairLatin from "@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2";
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
      {/* Both faces render above the fold. Referencing the imported (hashed)
          URL in a link is what emits the preload — a bare import emits nothing.
          Next also tracks the import, so each tag appears twice in the HTML;
          same URL and `as`, so the browser still fetches once. */}
      <link rel="preload" href={interLatin} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={playfairLatin} as="font" type="font/woff2" crossOrigin="anonymous" />
      {/* Cross-origin requests the homepage makes on load. */}
      <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.radioking.io" crossOrigin="anonymous" />
      <body className="min-h-dvh flex flex-col bg-paper-0 text-ink-900">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
