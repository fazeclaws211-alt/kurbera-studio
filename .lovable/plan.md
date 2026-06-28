
# Kubera Studio India LLP — Website Plan

A premium, editorial fabric-studio website built around the existing Kubera brand identity. No SaaS templates, no AI slop. Cream paper base, poppy red wordmark anchor, moss/olive structure, blush highlights, ink black text.

## Design system (src/styles.css)

Replace the default shadcn palette with brand tokens:

- `--paper` warm cream `#FBF6E9` (background)
- `--paper-deep` `#F4ECD6` (panel base)
- `--kubera-red` `#E2382D` (primary)
- `--moss` `#3F5A3A` (secondary/nav surfaces)
- `--olive` `#8A9A3F` (accents, thread lines)
- `--blush` `#F4A6B3` (highlights)
- `--cream-warm` `#FFF2E2`
- `--ink` `#1A1A1A`
- `--gold` `#B8924A` (tiny details only)

Typography via `<link>` in `__root.tsx`:
- Display: **Yellowtail** or **Allura** (script) for the "Kubera" wordmark — italic, weighty, red
- Headings: **Fraunces** (semi-bold, slight optical italic) for editorial titles
- Body: **Inter** for clean readability
- Mono micro-labels: tracked-uppercase Inter at 11px

Build `<KuberaWordmark size="nav|hero|footer" />` so the script logo stays consistent everywhere (nav, hero, footer). Below it: small uppercase "STUDIO INDIA LLP" with letter-spacing.

## Route structure

Single-page site at `src/routes/index.tsx` with anchored sections (Collections, Sample Desk, Lookbook, Contact). Smooth scroll between sections. Components live in `src/components/kubera/`.

## Sections

**1. Nav (sticky, cream with thin moss bottom border)**
Left: red script `Kubera` wordmark + "STUDIO INDIA LLP" microtext. Center: Collections · Sample Desk · Lookbook · Contact. Right: pill capsule in moss green — "Quick fabric request" + small "Open" button that scrolls to Sample Desk.

**2. Hero (two-column editorial)**
Left col: oversized red script `Kubera`, Fraunces H1 "The House of Fashion & Fabric", supporting paragraph, two CTAs (filled red "Explore Collections", outline moss "Request Samples"). Small olive thread-line SVG draws in on mount.
Right col: a *designed* fabric catalogue card — layered paper card with a "FEATURED FABRIC STORY" micro-label, a generated fabric-roll image, a row of 5 fabric swatch chips (blush, moss, olive, red, cream), and a tiny gold "Edition 01" detail. Subtle tilt on hover.

**3. Marquee strip**
Full-width red bar, cream Fraunces italic text: `CUSTOM FABRICS • PRINTS • FASHION TEXTILES • STUDIO SAMPLING • KUBERA`. CSS marquee, slow (~40s loop), pause on hover.

**4. Fabric Collections — "Pick a fabric direction"**
Grid of 6 catalogue-style cards: Cotton, Linen, Prints, Embroidery, Blends, Custom. Each card = paper texture, fabric thumbnail, swatch row, micro-label, fabric name in Fraunces, one-line descriptor. Hover: subtle cloth ripple (CSS transform skew + shadow shift), 2deg tilt. Clicking a card updates the Sample Desk panel state (shared via component state / context).

**5. Sample Desk (interactive)**
Moss-green panel on cream. Three tab options: Collection samples · Custom print · Bulk order. Selecting one renders a clear output card with the exact info Kubera needs:
- Collection samples → "Share collection name, preferred fabric bases, target swatch count, and dispatch city."
- Custom print → "Share artwork, colour palette, quantity, fabric base preference, and timeline."
- Bulk order → "Share fabric type, total metres, width, GSM, deadline, and delivery location."
Also reflects whichever Collection card was last clicked ("Currently focused on: Linen").
Primary CTA: simple rounded "Request on WhatsApp" — clean filled red, no stitched-sticker effect.

**6. Lookbook Wall**
Filter chips: All · Dailywear · Festive · Boutique · Custom (client-side filter on a `useState`). Masonry-ish grid of editorial cards with fabric close-ups and catalogue-style crops. Each card: paper border, micro-label ("LB / 04 — FESTIVE"), Fraunces caption. Hover: gentle zoom + reveal of fabric category line.

**7. Contact / Enquiry**
Heading "Send a clean fabric enquiry." in Fraunces. Form fields: Name, Brand/company, Fabric need (select), Approximate quantity, Message (with the specified placeholder). Three actions:
- "Send enquiry" — `mailto:` fallback
- "Request on WhatsApp" — opens `wa.me` link with message generated from form values
- "Copy WhatsApp message" — copies the formatted message to clipboard, toast confirmation

**8. Footer**
Moss-green band. Left: small Kubera wordmark + Studio India LLP. Right: thin nav, IG handle, year. Single olive thread line across the top.

## Animations (tasteful only)

- IntersectionObserver-based reveal (translateY 16px → 0, fade) on section enter
- SVG thread/vine line drawing in hero (`stroke-dasharray` animation)
- Cloth ripple on collection-card hover (transform + shadow)
- Marquee strip (pure CSS)
- Soft parallax on the hero catalogue card (mouse-based tilt)
- Micro press states on buttons

Explicitly avoided: cursor trails, loaders, floating flowers, blob animations, glassmorphism.

## Images

Generate 6–8 fabric/lookbook images via imagegen (premium quality not required — fast tier, close-up fabric/textile macro shots). Saved to `src/assets/` and imported. No stock-photo fashion models.

## Technical notes

- TanStack Start route with proper `head()` meta (title "Kubera Studio India LLP — The House of Fashion & Fabric", description, og tags).
- All sections in one route — anchored navigation. If user later wants separate routes, easy to split.
- No backend yet; WhatsApp link uses a placeholder number constant `+91XXXXXXXXXX` at the top of contact component, easy to swap.
- Fully responsive: hero becomes single column under 900px; nav collapses to wordmark + menu sheet on mobile; collection grid 1/2/3 cols.

## File touch list

- `src/styles.css` — full token rewrite for Kubera palette
- `src/routes/__root.tsx` — font `<link>` tags, updated meta defaults
- `src/routes/index.tsx` — assemble sections
- `src/components/kubera/Wordmark.tsx`
- `src/components/kubera/Nav.tsx`
- `src/components/kubera/Hero.tsx`
- `src/components/kubera/Marquee.tsx`
- `src/components/kubera/Collections.tsx`
- `src/components/kubera/SampleDesk.tsx` (owns shared focus state, passed from Collections via context or lifted state in index)
- `src/components/kubera/Lookbook.tsx`
- `src/components/kubera/Contact.tsx`
- `src/components/kubera/Footer.tsx`
- `src/components/kubera/Reveal.tsx` (IntersectionObserver wrapper)
- `src/assets/fabric-*.jpg` (generated)
