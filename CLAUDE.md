# Кухни 30 — Project Anchor

> **STOP. Read PROJECT_STATE.md before doing anything.**

Production landing for «Кухни 30» — sells SURA-factory kitchens directly (Moscow
region). Built on `nextjs-boilerplate` (App Router, SCSS modules) using the
**furniture design system** (walnut + terracotta + cream) with content, SEO and
legal copy from the `kitchens/handoff` package.

PROJECT_STATE.md is the single source of truth: design tokens, source handoffs,
routes, component registry, decisions, and the client-placeholder checklist.

## Rules for this project
1. Read PROJECT_STATE.md first; update component status there after each change.
2. Design values come from the furniture design system tokens — never hard-code a
   hex; reference the CSS variables in `src/shared/styles/global.scss`.
3. All contact/requisite placeholders live in `src/shared/data/site.ts` — one edit.
4. Images: put raw sources in `/raw-assets`, run `yarn images:optimize` → WebP in
   `public/images`; render via `next/image`.
5. Keep `yarn run check` (prettier + eslint + stylelint) and `yarn build` green.
