# Claude Code Master Prompt — qurany.me

> Copy everything below the line into Claude Code as your initial prompt.
> Make sure you have the 6 archetype images ready in an `/assets/images/` folder.

---

# PROJECT BRIEF — qurany.me

You are building **qurany.me**, the personal website for Ahmed Qurany — Senior Product Designer & Brand Strategist with 11 years of experience and 500+ projects shipped. This site is both a portfolio AND a positioning statement for the "Ultimate Designer" concept.

The site must feel **bold, cinematic, premium, and inevitable** — like the Nothing Phone of designer portfolios. Confident without being arrogant. Mysterious without being hostile.

---

## 1. CORE CONCEPT (CRITICAL — read carefully)

The hero is built around a **shapeshifting visual identity**:

- A central cinematic image of Ahmed (silhouette, face in shadow, multi-color rainbow gradient aura backlight) is displayed prominently.
- **6 floating "archetype cards"** are positioned around the image.
- When the user **clicks/taps any card**, three things happen simultaneously with smooth transitions:
  1. The **hero image swaps** to a new archetype image (different clothing, pose, atmosphere).
  2. The **headline word changes** (e.g., "I'm The Magician." → "I'm The Architect.") with color shift.
  3. The **subtitle copy changes** to describe that archetype.
- The cards themselves stay in the same position with the same styling — they are **navigation controls**, not content.
- An **auto-rotation** happens every 5 seconds if the user doesn't interact, switching through all 6 archetypes.
- A small "TAP A CARD TO REVEAL" hint pulses at the bottom.

This concept proves the "Ultimate Designer" claim **visually** — same person, 6 mastered disciplines.

### The 6 Archetypes

| # | Card Glyph | Discipline | Headline Word | Color Hint |
|---|-----------|-----------|---------------|------------|
| 01 | M | Branding | "The Magician" | #FF6B9D (magenta) |
| 02 | A | Systems | "The Architect" | #00F0FF (cyan) |
| 03 | N | Product / UX | "The Navigator" | #00C896 (emerald) |
| 04 | S | Strategy | "The Strategist" | #FF3D33 (red) |
| 05 | T | Presentation | "The Storyteller" | #FFB800 (gold) |
| 06 | B | WordPress / Dev | "The Builder" | #7B5EFF (violet) |

### Subtitle Copy for Each

- **Magician (Branding):** I shape perception. Brands become unforgettable not because they look right — but because they feel inevitable.
- **Architect (Systems):** I build design systems that survive growth — not pretty token libraries, but living infrastructure teams actually use.
- **Navigator (Product/UX):** I chart the path users walk before they know they're walking. Flows, screens, decisions — designed end to end.
- **Strategist (Strategy):** Before the pixels, the plan. I read the board, find the gap, and design the game you're actually playing.
- **Storyteller (Presentation):** Decks that move rooms, not just slides that fill them. I turn data into arguments people can't ignore.
- **Builder (WordPress/Dev):** Strategy means nothing if it doesn't ship. I close the loop — from idea to live site — without handoff loss.

### Image Filenames (place in /public/images/ or /assets/)
- `archetype-magician.png` (the base image — colorful aura, arms open palms-up)
- `archetype-architect.png` (long coat, reaching forward, cyan/blue dominant)
- `archetype-navigator.png` (jacket, arms inward arranging screens, rainbow)
- `archetype-strategist.png` (long overcoat, hand in pocket, deep red, constellation dots)
- `archetype-storyteller.png` (sharp blazer, one hand presenting, gold/magenta)
- `archetype-builder.png` (utility jacket, grounded stance, purple/indigo)

---

## 2. TECH STACK

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3.4 with custom design tokens
- **Animations:** Framer Motion (restrained use only)
- **Fonts:** Archivo (display) + JetBrains Mono (labels/code) via Google Fonts — load with `next/font`
- **Internationalization:** next-intl for EN/AR toggle with full RTL support
- **Theme:** next-themes for dark/light toggle (dark is default and primary)
- **Deployment:** Vercel
- **Images:** Next.js Image component with priority loading on hero

---

## 3. DESIGN SYSTEM

### Colors

```css
/* Dark mode (DEFAULT) */
--bg: #0A0A0A;
--surface: #141414;
--surface-elevated: #1C1C1C;
--border: #2A2A2A;
--text-primary: #FFFFFF;
--text-secondary: #A1A1A1;
--text-tertiary: #6B6B6B;

/* Light mode */
--bg-light: #FAFAFA;
--surface-light: #F0F0F0;
--surface-elevated-light: #E8E8E8;
--border-light: #D4D4D4;
--text-primary-light: #0A0A0A;
--text-secondary-light: #525252;
--text-tertiary-light: #8B8B8B;

/* Dynamic accent — changes per archetype */
--accent: var(--archetype-color); /* set via JS */
```

### Typography

- **Display headlines:** Archivo, weights 700-900, line-height 1.02, letter-spacing -0.03em
- **Body:** Archivo, weight 400-500, line-height 1.55
- **Labels/Code/Numbers:** JetBrains Mono, weight 500, letter-spacing 0.15em-0.25em, UPPERCASE
- **Hero h1:** `clamp(40px, 5.5vw, 88px)` — fluid scaling
- **Section headers:** `clamp(36px, 4vw, 64px)`
- **Body lg:** 17-19px

### Spacing

- Base unit: 4px
- Section vertical padding: 128px desktop / 80px mobile
- Container max-width: 1440px
- Container horizontal padding: 32px desktop / 20px mobile
- Grid gap default: 24px

### Visual Language

- **Sharp corners only** (border-radius: 0 to 6px max)
- **Hairline borders** (1px solid var(--border))
- **Generous whitespace** — Nothing principle
- **Numbered sections** (01 / 02 / 03 with monospace numerals)
- **Dot matrix background** on body (`radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 24px 24px`) — fixed position, z-index 1

### Components

- **Primary button:** background accent, sharp corners, padding 14px 28px, monospace label, hover translateY(-2px)
- **Ghost button:** transparent with 1px border, monospace label, hover invert colors
- **Card:** surface bg, 1px border, sharp corners, padding 32px

---

## 4. PAGES TO BUILD

### Required (5 pages)

1. **/** — Home (the shapeshifting hero is here, plus the rest of the homepage sections below)
2. **/work** — Case studies index
3. **/process** — The 4-step methodology
4. **/services** — 3 pricing tiers
5. **/manifesto** — 10 principles for Ultimate Designers

### Homepage Sections (in order)

1. **Sticky Nav** — Logo "AQ." | Work | Process | About | Manifesto | EN/AR toggle | Theme toggle | "Book a call" CTA
2. **Hero with Shapeshifting Cards** (the main feature — described above)
3. **Proof Strip** — marquee scrolling client names in monospace: IT-RANKS · Solean · Galaxy Racer · GOSHEN · Sajilni · UDL · Appetito · Eventafy
4. **The Problem Section** — Label "02 / THE PROBLEM" + H2 "You've worked with designers before. Some were fast. Some were pretty. None of them asked you why." + 3-column comparison grid
5. **The Method Section** — Label "03 / THE METHOD" + 4 numbered cards: SEE / SOLVE / SYSTEMIZE / SCALE
6. **Featured Work** — Label "04 / SELECTED WORK" + 3 case study cards
7. **The Numbers** — Mono typography huge: 11 years / 500+ projects / 6 founding members / 1 obsession
8. **Manifesto Teaser** — Pull quote: "Designers who refuse to be replaced don't fear AI. They become un-replaceable by being ultimate." + CTA to /manifesto
9. **CTA Section** — "Not every founder is a fit. Let's find out." + book a call button
10. **Footer** — Email, LinkedIn, Behance, UDL, Instagram + © 2026 Built obsessively in Cairo

---

## 5. HERO COMPONENT — DETAILED SPECS

```
Layout: Two-column grid on desktop (copy left, visual stage right)
Stack vertically on mobile (visual first, copy below)

LEFT (copy):
- Eyebrow label: "001 / ULTIMATE DESIGNER" (mono, uppercase, with pulsing accent dot)
- H1: "I'm not one designer.\nI'm <span class='role'>The Magician.</span>"
  - The .role span is the dynamic text, colored with current archetype hint
- Subtitle paragraph (dynamic, changes per archetype)
- Two CTAs: "See how I think →" (primary) + "Book a call ↗" (ghost)

RIGHT (visual stage):
- Main hero image (aspect-ratio 16:9, fills width up to ~600px)
- 6 floating cards positioned around the image:
  - Card 1: top-left, rotated -18deg
  - Card 2: top-center-left, rotated -8deg
  - Card 3: top-center-right, rotated 8deg
  - Card 4: top-right, rotated 18deg
  - Card 5: bottom-left, rotated -22deg
  - Card 6: bottom-right, rotated 22deg
- Each card: ~80px wide, aspect 5:7, dark glass background with backdrop-blur
- Card content: small "0X" number top-left, large glyph letter centered, small label bottom
- Cards float gently with CSS animation (6s ease-in-out infinite, vertical 8px oscillation)
- Cards have staggered animation-delay so they don't move in sync

INTERACTIONS:
- Hover on card: lift -6px + scale 1.08 + glow with archetype color
- Click on card: 
  1. Stop auto-rotation
  2. Add .active class to clicked card (highlighted with color)
  3. Fade out hero image (300ms), swap src, fade in
  4. Fade out role text, swap text + color, fade in
  5. Fade out subtitle, swap text, fade in
  6. Update --archetype-color CSS variable globally
- Auto-rotation: every 5000ms, cycle to next archetype if no user interaction
- A progress bar at top of viewport (2px high) fills over 5s showing time to next auto-switch
- Hint at bottom of viewport: "TAP A CARD TO REVEAL" with pulsing dot (mono, uppercase, tracked)
```

---

## 6. INTERNATIONALIZATION (i18n)

- Use **next-intl** with locales `en` and `ar`
- Full RTL support when Arabic is active (direction switches, layout mirrors)
- Toggle in nav switches locale without page reload
- Locale persists across pages (localStorage)
- Arabic font: TWK Lausanne AR or IBM Plex Arabic (fallback)
- Provide structure for translations but include only English copy for now — Ahmed will add Arabic later
- Create `/messages/en.json` with all strings

---

## 7. ANIMATIONS — RESTRAINED

Use Framer Motion ONLY for:
- Fade-up on scroll for section headers (once per session, not on every scroll)
- Marquee scroll for proof strip (CSS animation is also fine)
- Subtle hover scale on case study cards (1.02)
- Smooth page transitions (200ms fade)
- The hero interactions described above

DO NOT add:
- Parallax effects
- Cursor followers
- Excessive scroll-jacking
- Loading animations longer than 200ms
- Page-load animations on every render

---

## 8. SEO & METADATA

- Title: "Ahmed Qurany — Ultimate Designer | Senior Product Designer & Brand Strategist"
- Description: "Senior Product Designer & Brand Strategist. 11 years. 500+ projects. For founders who refuse to settle for execution-only design."
- Open Graph image: use the magician archetype image
- Favicon: a minimal "AQ." mark
- Robots: index, follow
- Schema.org Person markup

---

## 9. DELIVERABLES IN ORDER

Build in this exact sequence and stop after each step to confirm:

1. **Setup:** Initialize Next.js 14 project with TypeScript, Tailwind, all dependencies (next-themes, next-intl, framer-motion, lucide-react for icons)
2. **Design tokens:** Set up `tailwind.config.ts` with all colors, fonts, spacing from above
3. **Fonts:** Load Archivo + JetBrains Mono via `next/font/google`
4. **Layout:** Create root layout with theme provider, i18n provider, dot matrix background
5. **Nav + Footer components:** Build sticky nav with all links, footer with social links
6. **Hero component:** Build the full shapeshifting hero with all 6 archetypes — this is the centerpiece
7. **Home page sections:** Build sections 3-10 in order (Proof Strip → Footer)
8. **Other pages:** Create placeholder pages for /work, /process, /services, /manifesto with at minimum a hero section each
9. **SEO:** Add metadata, Open Graph, favicons
10. **Polish:** Mobile responsiveness check, accessibility (alt tags, aria-labels, keyboard nav for cards), Lighthouse audit

---

## 10. SUCCESS CRITERIA

When done, the site must:

- **Feel like a statement, not a portfolio.** Bold, confident, premium.
- **Work flawlessly on mobile.** The hero cards must be tappable and the image swap must work smoothly on touch.
- **Run at 90+ Lighthouse score** across Performance, Accessibility, Best Practices, SEO.
- **Load the hero image in under 1.5s** on a fast connection.
- **Be obviously different** from every other designer portfolio out there.

---

## 11. AHMED'S VOICE — WHEN WRITING ANY COPY

- Sentences are short. Cut every wasted word.
- Use specific numbers (11 years, 500+ projects, 6 founding members).
- Make claims that polarize. Skip safe positioning.
- Bilingual context: this is for international + Arab clients. English is primary, Arabic version comes later.
- No emojis. No exclamation marks. No "I love design."
- Read every sentence aloud — if it sounds like marketing AI, rewrite it.

---

## CONFIRM BEFORE STARTING

Before writing any code, confirm:
1. You understand the shapeshifting hero concept (the single biggest UX feature)
2. The 6 image files will be placed in `/public/images/` with the exact filenames above
3. The site is bilingual-ready but starts in English only

Then start with Step 1 (Setup) and proceed in order.
