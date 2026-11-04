/**
 * Who is ministering at Next Level. Shared by the conference page and the
 * homepage countdown band so the two can never drift apart.
 *
 * `image` is a file in /public/images/ministers; a minister without one is
 * drawn from their initials until a portrait is added.
 */
export interface Minister {
  name: string;
  role: string;
  image?: string;
}

export const HOST: Minister = {
  name: "Dr. David Ogbueli",
  role: "Host",
  image: "david-ogbueli",
};

export const LINEUP: Minister[] = [
  { name: "Bishop Titus Masika", role: "Guest speaker", image: "titus-masika" },
  { name: "Dr. Chiefo Ejioforbiri", role: "Guest speaker", image: "chiefo-ejioforbiri" },
  { name: "Dr. Niyi Adesanya", role: "Guest speaker", image: "niyi-adesanya" },
  { name: "Dr. David Sseppuuya", role: "Guest speaker", image: "david-sseppuuya" },
  { name: "Dr. David Ogunshola", role: "Guest speaker" },
  { name: "Apostle Charles Osazuwa", role: "Guest speaker", image: "charles-osazuwa" },
  { name: "Peterson Okopi", role: "Music minister" },
  { name: "Anthony Kani", role: "Music minister", image: "anthony-kani" },
  { name: "David Nkennor", role: "Music minister", image: "david-nkennor" },
  { name: "Min. Rhema Onuoha", role: "Music minister", image: "rhema-onuoha" },
];

/** Initials for a minister with no portrait, titles stripped. */
export function initials(name: string): string {
  return name
    .replace(/^(Dr\.|Bishop|Apostle|Apst\.|Rev\.|Min\.|Pastor)\s+/, "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}
