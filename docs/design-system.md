# Design System

Brand direction: **"Institutional Gravity"** — a personal-legacy identity for a
global apostolic leader. Serious, warm, editorial. Navy authority, gold accent,
cream ground.

## Color

| Token | Hex | Use |
|---|---|---|
| Navy (ink) | `#0A192F` | Primary text, dark sections, purchase bars, active dots |
| Navy hover | `#112a4f` | Hover state for navy buttons |
| Gold | `#C9A227` | Accent — eyebrows, CTAs, category badges, focus rings |
| Gold (text on light) | `#927016` | Gold text that needs contrast on light grounds |
| Cream | `#F5F1E8` | Section backgrounds (e.g. Books carousel) |
| White | `#FFFFFF` | Cards, surfaces |

Ambient book "stage" gradient (fallback when a title has no desk render):
`radial-gradient(120% 95% at 50% 12%, #3a2c1e 0%, #241f2b 46%, #0c0d14 100%)`.

## Typography

- **Display / headings:** Playfair Display (serif). Used with restraint for headline
  gravity; apply `text-balance` on headings.
- **Body / UI:** Inter (sans). Running text, labels, buttons.
- Uppercase eyebrows: small, bold, `tracking-widest`, gold.
- Heading scale (carousel example): `text-[32px]` → `sm:text-[44px]` → `lg:text-[56px]`,
  leading ~1.12.

## Spacing & shape

- Sections: `py-20 sm:py-24`; centered headers `mb-10 sm:mb-14`.
- Cards: white, `rounded-[28px]`; inner control chips `rounded-2xl` / `rounded-full`.
- Container max widths: page `Container`; the Books showcase uses `max-w-[1400px]`.

## Motion

- **Framer Motion**, spring transitions for physical movement
  (`{ type: "spring", stiffness: 260, damping: 32 }`).
- Standard reveal: `fadeUp` (opacity 0→1, y 30→0, ease `[0.25,0.1,0.25,1]`, in-view once).
- Always gate looping/autoplay on `useReducedMotion()` and an IntersectionObserver
  in-view check.

## Component patterns

- **Buttons (primary):** navy bg, white text, hover `#112a4f`, gold `focus-visible` ring.
- **Glass controls:** `bg-white/70 backdrop-blur-md`, `border-white/60`, soft shadow;
  hover `scale-110` + invert to navy. (Carousel arrows.)
- **Category badge:** `bg-[#C9A227]/15 text-[#927016]`, rounded, uppercase.
- **Dots:** inactive `w-2.5 bg-[#0A192F]/25`; active `w-7 bg-[#0A192F]`; `aria-current`.
- **Accessibility baseline:** `focus-visible` ring (gold) on every interactive element;
  min 44px touch targets; respect reduced motion.

## Featured section: Books carousel

The homepage Books carousel is a **3-card premium showcase** (center active + prev/next
neighbors on desktop, 1 full-width card on mobile with swipe). Cards use a 3D **desk
render** per book from `public/images/books/renders/<slug>-desk.webp` (all 10 covered),
falling back to the ambient stage gradient for any title without one. Implementation
notes and the loop model are in [decisions](decisions.md#adr-002).
