"use client";

import { useEffect } from "react";
import { dirFor, type Locale } from "@/i18n/config";

/** Sets <html lang> and <html dir> to match the active locale on the client.
 *  Keeps a single root <html> (Next 16) while still supporting RTL for Arabic. */
export function HtmlLangDir({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dirFor(locale);
  }, [locale]);
  return null;
}
