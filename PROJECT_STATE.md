# Project State: Кухни 30

## Meta
- **Type**: production landing (no Figma file — built from two handoffs)
- **Boilerplate**: https://github.com/pandaprofit/nextjs-boilerplate (Next 14, App Router, SCSS modules, Jotai)
- **Started**: 2026-07-10
- **Overall status**: ✅ Build green (14 routes), pending real client data

## Source handoffs (reconciled)
| Source | Used for |
|--------|----------|
| `d:/projects/kitchens/handoff` | content, section structure, 6 cases, SEO, legal, copy |
| `d:/projects/figmaToReact/furniture-handoff` | **all visuals**: palette, type, spacing, radii, breakpoints, component specs |
| user decision | stack = nextjs-boilerplate; **design handoff wins** over the ТЗ's dark-theme/Vite/Phosphor/GH-Pages notes |

Kitchens ТЗ assumed a React+Vite dark-theme repo — that stack/theme was intentionally
**ignored**. We use the light walnut/terracotta furniture theme on Next.js.

---

## Design Tokens (furniture system) — `src/shared/styles/global.scss`
- **Brand / Walnut** `--brand-main #40312A` (+ 800…100 alphas) — dark bands, headings, strokes.
- **Accent / Terracotta** `--accent-main #C06E45`, `--accent-active #A85B34` — primary CTA only.
- **Sage** `--sage-main` — eco/soft badges (icons on light cards).
- **Neutrals** cream page bg `--light-main #F5F0E8`; body `--dark-main #261F1A`; sand card `--surface-card #EDE6DB`; `--white-100 #FAF7F2`.
- **Semantic aliases**: `--bg-page`, `--bg-surface`, `--text-primary/heading/muted/on-dark/accent/cta`.
- **Spacing** x1…x10 = 4·6·8·12·16·24·32·48·64·88.
- **Radii**: input 8, button 12, chip 100, card 24, panel 48.
- **Layout**: content 1312, container max 1440 (border-box) + gutters 64→24→12; via `@include container`.
- **Breakpoints** (`variables.scss`): tablet ≤900, mobile ≤560. Section rhythm 88→56→40 (`@include section-block`).
- **Motion**: `$transition 0.16s ease`; modal `$transition-modal 0.28s cubic-bezier(.22,1,.36,1)`; `prefers-reduced-motion` handled globally.

## Fonts — `src/app/layout.tsx` (next/font/google)
- **Inter Tight** 400/500/600/700 → `--font-inter-tight` → `--font-ui` (body, headings, UI).
- **Playfair Display** 400/500/600 → `--font-playfair` → `--font-display` (hero, logo, big numerals).
- Cyrillic subset enabled. Never redefine the raw font vars in `:root`.

## Scaling note
Boilerplate `useScaling` was replaced: `src/service/provider` now renders children
SSR-first (no gating) and only detects device + sets `--vh` (no font-size scaling) —
the design is fixed-px with media-query breakpoints.

---

## Routes
| Path | Render | File |
|------|--------|------|
| `/` | Static | `app/page.tsx` → `views/home` (Hero→Process→Catalog→Novelties→Sura→Pricing→Contacts) |
| `/cases/[slug]` | SSG (6, `dynamicParams=false`) | `app/cases/[slug]/page.tsx` → `views/case` (gallery+lightbox) |
| `/policy` | Static, noindex | `app/policy/page.tsx` → `views/policy` |
| 404 / unknown slug | Static | `app/not-found.tsx` → `views/not-found` |
| `/api/lead` | Dynamic stub | logs payload; TODO real channel |
| `/sitemap.xml`, `/robots.txt` | generated | `app/sitemap.ts`, `app/robots.ts` |

## Component Registry (status ✅ Done)
| Layer | Components |
|-------|-----------|
| ui | Button (primary/outline/ghost-dark), Input, Textarea, Checkbox, Dropdown (custom), Chip, Heading, Container, Logo |
| components | Modal, LeadButton, LeadForm, LeadModal, SuccessScreen, CookieBanner, SectionHead, CaseCard, JsonLd |
| modules | Header (sticky, burger ≤900, CTA), SiteFooter (mobile reflow) |
| views | home + 7 sections, case, policy, not-found |
| service | Provider (device+`--vh`), Portal, `#modal-root` |
| data | `site.ts` (company/nav/channels), `cases.ts` (6 + CASE_COMMON), `novelties.ts`, `faq.ts`, `policy.ts` |
| lib | `jsonLd.ts` (FurnitureStore, FAQPage, Article+BreadcrumbList) |

## Lead flow
`LeadButton`/hero scenarios → `openLeadAtom` → `LeadModal` (audit|new) → `LeadForm` →
`submitLead()` → `POST /api/lead`. Contacts section uses `LeadForm` inline (mode `contact`).
Modal: focus-lock, scroll-lock, Esc/backdrop/×, entrance anim, success screen (no `alert`).

## Assets
Raw JPEGs in `/raw-assets` (gitignored). `yarn images:optimize` (sharp) → WebP in
`public/images/{cases,kitchens,og}` (−69%, ~3.1 MB total, max 1600w q78). og-image
1200×630 + apple-touch-icon generated. Case numbers are **demonstrative** (disclaimers present).

## ⏳ Client placeholders (edit only in `src/shared/data/site.ts`)
Domain, phone, e-mail, Telegram, WhatsApp, showroom address, hours, legal entity/ИНН,
copyright year, lead channel, analytics. JSON-LD omits placeholder contact fields until real.

## Verification
- `yarn build` ✓ (14 routes) · `yarn run check` ✓ (prettier+eslint+stylelint).
- Runtime: `/` 200 (SSR h1 + FurnitureStore/FAQPage JSON-LD), case 200, `/policy` noindex,
  unknown slug → 404, robots/sitemap 200, `<html lang="ru">`, Inter Tight applied.
- TODO before launch: real client data, replace demo case numbers if real ones appear,
  connect `/api/lead` backend, Lighthouse pass, branded favicon/og.
