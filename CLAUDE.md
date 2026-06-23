# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint via next lint
npm run start    # Serve production build
```

No test suite is configured.

## Architecture

Next.js 14 App Router site (TypeScript). All routes live under `app/`.

**Pages:** `app/page.tsx` (home), `app/menu/`, `app/about/`, `app/events/`, `app/gallery/`, `app/contact/` — each is a standalone page that imports `<Header />` and `<Footer />` directly.

**Home page composition** (`app/page.tsx`): assembles server components in order — `Header → Hero → About → ImageStrip → Dishes → Experience → Testimonials → ReservationCTA → Footer`.

**Shared components** (`app/components/`): `Header.tsx` and `Footer.tsx` are used by every page. All other components in this folder are home-page-only sections.

**Styling approach — two parallel systems exist:**
1. **Tailwind v4** — used heavily in components, especially Hero, Header, Footer. Configured in `tailwind.config.js` with custom color aliases (`orange`, `cream`, `dark`, `brown`, `yellow`, `gold`). Globals imported via `@import "tailwindcss"` in `app/styles/globals.css`.
2. **Legacy CSS classes** — `globals.css` also defines `.container`, `.section`, `.btn`, `.hero`, `.card-grid`, etc. used by secondary pages. Per-page CSS Modules (e.g. `app/contact/page.module.css`) are used alongside Tailwind on inner pages.

**Fonts:** Anton (display/headings, CSS var `--font-display`) and Montserrat (body, `--font-body`) loaded via `next/font/google` in `app/layout.tsx`. Headings use `font-serif` in Tailwind (mapped to Anton).

**Icons:** Font Awesome 6 loaded from jsDelivr CDN in `app/layout.tsx` `<head>`. Use `fa-solid fa-*` / `fa-brands fa-*` class strings.

**Images:** External images only from `images.unsplash.com` (allowed in `next.config.js`). Logo and favicon are local in `public/`.

**Animations:** Framer Motion used in Hero and some home-page components. Components with animations are marked `'use client'`.

**Contact/reservation flow:** Forms on `/contact` open WhatsApp (`wa.me/85578938333`) with pre-filled message text. No backend — all submissions go to WhatsApp.

## Key data to keep in sync

Business info is hardcoded in multiple files — update all of them when it changes:

- **Phone numbers:** `app/components/Footer.tsx` (`contactLinks` array) and `app/contact/page.tsx` (`CONTACT_METHODS` array)
- **Opening hours:** `app/components/Footer.tsx` (`hours` array) and `app/contact/page.tsx` (`HOURS` array)
- **WhatsApp/Telegram URLs:** constants at the top of `app/contact/page.tsx` and `app/components/Footer.tsx`
