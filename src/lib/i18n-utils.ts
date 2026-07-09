import { type Locale, defaultLocale } from "@/i18n/config";
import en from "@/i18n/messages/en.json";
import fr from "@/i18n/messages/fr.json";
import pt from "@/i18n/messages/pt.json";
import sw from "@/i18n/messages/sw.json";
import ar from "@/i18n/messages/ar.json";

type Dict = Record<string, unknown>;

const raw: Record<Locale, Dict> = { en, fr, pt, sw, ar };

/** Deep-merge a locale dictionary over the English base so any missing key
 *  falls back to English automatically. */
function deepMerge(base: Dict, override: Dict): Dict {
  const out: Dict = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    if (b && o && typeof b === "object" && typeof o === "object" && !Array.isArray(b)) {
      out[key] = deepMerge(b as Dict, o as Dict);
    } else {
      out[key] = o;
    }
  }
  return out;
}

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  const merged = deepMerge(raw[defaultLocale], raw[locale] ?? {});
  return merged as unknown as Dictionary;
}

/** Resolve a dot-path (e.g. "nav.startHere") against a dictionary. */
export function t(dict: Dictionary, path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>((acc, key) => (acc && typeof acc === "object" ? (acc as Dict)[key] : undefined), dict);
  return typeof value === "string" ? value : path;
}
