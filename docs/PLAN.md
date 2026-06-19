# Architectural Review & UI/UX Plan — Ahmed Hatem Helal Portfolio

> Approved by the user on 2026-05-28. Locked. **Do not re-plan.** This file is the
> authoritative spec for the build. For state/progress, see `PROGRESS.md`.

## Context

You're a full-stack developer (Python/Django, Next.js/TS, Qt, Flutter) replacing a legacy
PythonAnywhere portfolio (ahmedhatemhelal.pythonanywhere.com) with a production-grade
personal site. Aesthetic target: AI-product sleekness (jarvis.cx) blended with
corporate-tech polish (qt.io). Constraint: solo build, Vercel deploy, free-tier-friendly,
3–4 week timeline.

Decisions confirmed in the interview:
- **Architecture:** Static MDX on Vercel. No PythonAnywhere, no DRF, no DB.
- **Content cadence:** Ship once, edit quarterly → MDX in repo (no CMS).
- **Locale:** English only.
- **Scope:** Polished, 3–4 weeks.
- **Featured projects (in order):** Lucy → EasyBela → E-Commerce.
- **Demos:** No live demo links — projects are sensitive or customer-hosted.
  Each project page is a rich case study (story + architecture + screenshots), not a
  playground.
- **Brand assets on hand:** none. Domain, logo, headshot, and CV are all to be created.

Inventory of showcase candidates from `D:/Pro` (Tier 1):
- **Lucy** (`agent/`) — Electron + React + Vite + Tailwind front, FastAPI + Python back,
  PyInstaller. Local LLM coding agent, 7-step setup wizard, Ollama + Groq/OpenRouter
  fallbacks.
- **EasyBela** (`easybela/`) — Django + DRF, Next.js + Flutter, multi-merchant
  marketplace, bilingual AR+EN, Paymob + COD.
- **E-Commerce** (`e-commerce/`) — Django 5 + DRF, Next.js 15 App Router + TS + Tailwind
  + Ant Design, tiered SaaS storefront.

---

## Task A — Tech Stack (locked)

### Final stack

| Layer        | Choice                                                                  |
|--------------|-------------------------------------------------------------------------|
| Framework    | Next.js (App Router, React Server Components, TypeScript, strict). create-next-app installed **16.2.6** — see PROGRESS.md "Known issues". |
| Styling      | Tailwind v4 + shadcn/ui primitives                                      |
| Content      | MDX via `next-mdx-remote` + `gray-matter` (frontmatter + components)    |
| Motion       | Framer Motion (+ Lenis for smooth scroll, optional)                     |
| Icons        | Lucide                                                                  |
| Fonts        | Geist Sans + Geist Mono (self-hosted via `next/font`)                   |
| Contact      | Vercel Edge Function → Resend (free tier, 3k/month) + Turnstile         |
| OG images    | Next.js `ImageResponse` API at `/api/og`                                |
| Analytics    | Vercel Analytics (free)                                                 |
| Hosting      | Vercel (hobby tier)                                                     |
| Domain       | **TBD** — recommended: Cloudflare Registrar `ahmedhelal.dev` (~$10/yr)  |
| Email        | Custom address via Cloudflare Email Routing → your Gmail (free)         |

### Why this stack vs the user's original proposal (Next.js + DRF on PythonAnywhere)

PythonAnywhere free tier would add 300–1200 ms of latency per API call, fail to support
a custom domain, and force a CORS surface for zero portfolio benefit. The content is
intrinsically static (bio, projects, skills); a backend would solve a problem we don't
have. Serverless `route.ts` handlers cover every dynamic need (contact form, view
counter if desired, OG image gen) without a long-running server.

If the user later wants to *demonstrate* Django specifically, do it as a separate
showcased artifact (a read-only Railway/Fly demo linked from `/work/easybela`) — not as
the portfolio's backbone. Explicitly out of V1 scope per the "no demo links" decision.

---

## Task B — UI/UX & Visual Strategy

### Design system

**Aesthetic.** Dark-first canvas with restrained glow. Take jarvis.cx's softness (orb
glow, generous whitespace, mono-display pairings, scroll choreography) but cap motion
intensity and adopt qt.io's information density inside content sections — descriptive
cards, mono spec lists, clear hierarchy. Glow is a seasoning, not the meal.

**Tokens.**

```
Color
  bg.canvas        #0A0A0B
  bg.surface       #16181D
  bg.elevated      #1C1F26
  border.subtle    #22252C
  text.primary     #E7E9EE
  text.muted       #9099A8
  accent.primary   #6366F1   (electric indigo)
  accent.warm      #F59E0B   (amber, sparing — for hero CTAs only)
  status.ok        #22C55E
Typography
  display          Geist Sans 700–800, tight tracking (-0.02em)
  body             Geist Sans 400–500
  mono             Geist Mono 500 (for stat labels, code, "engineering" tone)
Spacing            4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
Radius             sm 6  md 12  lg 20  full 9999
Motion             ease cubic-bezier(0.16, 1, 0.3, 1); 150–400ms
                   prefers-reduced-motion → disable all transform/opacity transitions
Glow recipe        radial-gradient blurred orb, blur(80px), opacity 0.25–0.35
                   ≤ 2 glows per viewport; never on text
```

### Site map

```
/                      Hero + featured-3 bento + skills marquee + /now teaser + footer
/work                  All-projects grid with chips: Web | Mobile | Desktop | AI
/work/[slug]           Case study (one MDX file per project)
/about                 Story + timeline + skills matrix + CV download
/now                   Single MDX file — what you're building right now
/contact               Form (Resend) + socials + email
/api/contact           Edge handler → Resend
/api/og                Dynamic OG image per route
```

No blog in V1 (quarterly content cadence does not justify the IA cost). Reserve
`/notes` as a future route.

### Homepage layout (concrete)

```
┌────────────────────────────────────────────────────────────────┐
│  NAV    Home  Work  About  Now  Contact            [☾]  ⌘K     │
├────────────────────────────────────────────────────────────────┤
│  HERO                                                          │
│   Full-stack developer building cross-platform AI products.    │
│   I ship desktop, mobile, and web — from Python backends       │
│   to React front-ends.                                          │
│   [ See my work → ]  [ Get in touch ]                          │
│   ◯ soft indigo glow orb, slowly drifting                      │
├────────────────────────────────────────────────────────────────┤
│  FEATURED BENTO (6-cell asymmetric)                            │
│   ┌──────────────┐  ┌─────────┐  ┌─────────┐                  │
│   │   LUCY       │  │ EASYBELA│  │ STATS   │  ← stats card    │
│   │   2x2 cell   │  │  1x2    │  │ "3 plat │     mono digits  │
│   │   spotlight  │  │         │  │  forms, │                  │
│   │              │  │         │  │  4 lang"│                  │
│   ├──────────────┤  ├─────────┤  └─────────┘                  │
│   │  E-COMMERCE  │  │ NOW     │                                │
│   │  1x1         │  │ live    │  ← currently-building card   │
│   └──────────────┘  └─────────┘                                │
├────────────────────────────────────────────────────────────────┤
│  SKILLS MARQUEE   Python · Django · DRF · Next.js · TS · React │
│                   Tailwind · Flutter · Qt · FastAPI · Postgres │
│  (slow horizontal scroll, pauses on hover)                     │
├────────────────────────────────────────────────────────────────┤
│  CALL-TO-ACTION    Want to build something together?           │
│                    [ Email me ]                                │
└────────────────────────────────────────────────────────────────┘
```

### Project case-study template (since no live demos)

Each `/work/[slug]` MDX file follows this structure — the *narrative* IS the demo.

```
┌────────────────────────────────────────────────────────────────┐
│  COVER                                                         │
│   Designed cover image (1600×900) — not a raw screenshot       │
│   Project name · one-line pitch · year · role · status badge   │
├──────────────────────────┬─────────────────────────────────────┤
│  AT A GLANCE  (sticky)   │  PROBLEM                            │
│  Stack badges            │  What needed to exist and why.      │
│  Role                    │                                     │
│  Timeline                │  ARCHITECTURE                       │
│  Status                  │  Diagram (Mermaid → SVG at build).  │
│  Links: GitHub (if pub)  │  Component breakdown + data flow.   │
│                          │                                     │
│                          │  KEY DECISIONS                      │
│                          │  3–5 cards: "We chose X over Y      │
│                          │   because Z." (qt.io spec-list      │
│                          │   density, mono labels)             │
│                          │                                     │
│                          │  SCREENSHOTS                        │
│                          │  Lightboxed gallery, 4–8 images,    │
│                          │   captioned, lazy-loaded.           │
│                          │                                     │
│                          │  CODE EXCERPTS                      │
│                          │  2–3 MDX <CodeBlock> showing the    │
│                          │   technically interesting bits.     │
│                          │                                     │
│                          │  OUTCOME                            │
│                          │  What shipped, what was learned,    │
│                          │   what's next.                      │
└──────────────────────────┴─────────────────────────────────────┘
```

The sticky "At a glance" sidebar plus the qt.io-style key-decision cards do the
visual heavy lifting where you'd otherwise have a live demo button. Mono-set spec
labels (`STACK / ROLE / TIMELINE`) read as "engineering" without screaming.

### Representing each project class without demos

| Class                  | Visual treatment                                                 |
|------------------------|------------------------------------------------------------------|
| Lucy (Electron+FastAPI)| macOS window chrome around static screenshots, architecture SVG, code excerpts of the agent loop, screenshot of the wizard's 7 steps as a vertical scroll narrative |
| EasyBela (Django + Flutter + Next.js) | Side-by-side iPhone + browser device frames with stills, ERD diagram, multi-merchant moderation flow as an annotated SVG  |
| E-Commerce (Django + Next.js) | Tier comparison table, dashboard screenshots, bilingual screenshot pair |
| Qt projects (off-disk) | Skill badge + linked external write-up; deprioritized in V1 since no local source. Include in `/about` skills matrix only. |

### Interactive flourishes (picked — 2 of 4)

1. **Magnetic cursor** on CTAs and project cards. Cheap (≈80 lines of code), reads as
   premium, no perf cost.
2. **Command palette `⌘K`** for navigation (cmdk library). Linear-style. Signals "I
   build product" and helps power users.

Skipped: WebGL orb (use a CSS radial-gradient blur instead — 90% of the impact, 0% of
the bundle), Lenis scroll-pinning (over budget for V1).

---

## Task C — Interview answers (consolidated)

Locked in from the user's responses on 2026-05-28:

| Question                  | Answer                                                       |
|---------------------------|--------------------------------------------------------------|
| Architecture              | Static MDX + Vercel only                                     |
| Content cadence           | Ship once, edit quarterly (MDX in repo)                      |
| Locale                    | English only                                                 |
| Scope / timeline          | Polished, 3–4 weeks                                          |
| Featured order            | Lucy → EasyBela → E-Commerce                                 |
| Demo strategy             | No live demos — rich case-study narrative                    |
| Brand assets on hand      | Nothing — domain, logo, headshot, CV all to be created       |

---

## Phase 0 — Pre-flight (parallel to coding, do not block on it)

| Asset       | Recommendation                                                       |
|-------------|----------------------------------------------------------------------|
| Domain      | `ahmedhelal.dev` via Cloudflare Registrar (~$10/yr, no markup, instant DNS). Fallback: `ahmedhatemhelal.com`. |
| Logo / mark | Skip a graphic logo for V1. Use a typographic wordmark — your initials `AH` in Geist 700 with the indigo accent color. This is *better* than a mediocre commissioned logo and matches the AI-product aesthetic. |
| Headshot    | Single high-quality smartphone photo against a plain dark wall, edited with Photoshop / a free tool. Aim for a 1:1 crop, ~1200×1200. The /about page needs exactly one. |
| Resume PDF  | Build in parallel using a clean LaTeX template (e.g., **Awesome-CV** or **resume.tex**) or Notion → PDF. Host at `/cv.pdf`. Link from `/about`. |
| Email       | `me@ahmedhelal.dev` via Cloudflare Email Routing → your Gmail (free). |

---

## Build plan — 4 sprints

### Sprint 1 (Week 1) — Skeleton + design system

- Bootstrap Next.js with TypeScript strict, Tailwind v4, ESLint, Prettier.
- Configure `next/font` for Geist Sans + Mono.
- Build the design-token layer (CSS variables in `globals.css`, Tailwind theme extension).
- Set up MDX pipeline (`next-mdx-remote` + `gray-matter`) with a `Project` schema
  (frontmatter: slug, title, pitch, year, role, stack, status, cover, gallery, github?).
- shadcn/ui install: Button, Card, Badge, Dialog, Tooltip, Sheet, Tabs.
- Layout shell (Nav, Footer, theme provider, dark/light toggle).
- Deploy to Vercel on day 1; preview every push.

### Sprint 2 (Week 2) — Homepage + about

- Hero with CSS-only glow orb + headline + CTAs.
- Featured bento grid (6 cells, asymmetric, responsive collapse to single column on
  mobile).
- Skills marquee (CSS keyframes, pauses on hover).
- `/about` page: story, timeline (vertical, year-anchored), skills matrix, CV download.
- Magnetic cursor implementation for CTAs and bento cards.
- `/now` MDX route — single page rendering one MDX file.

### Sprint 3 (Week 3) — Case studies

- `/work` grid with category chips (filter via URL search params).
- `/work/[slug]` template per the layout above: sticky "At a glance" sidebar,
  Mermaid → SVG architecture diagrams, lightboxed screenshot gallery, MDX code blocks
  with `rehype-pretty-code` syntax highlighting.
- Author all 3 case-study MDX files: `lucy.mdx`, `easybela.mdx`, `ecommerce.mdx`.
- Add 2–4 supporting projects (lighter case studies, no diagrams required) — e.g.,
  `typescript/`, `work/kidsarea/`, one selected `work/` client project.
- Cover-image generation: design 3 hero covers in Figma (or use simple gradient +
  wordmark) at 1600×900.

### Sprint 4 (Week 4) — Polish + ship

- Command palette `⌘K` (cmdk) with all routes + actions ("email me", "download CV",
  "view GitHub").
- Contact form: Edge route `/api/contact` → Resend; Turnstile or honeypot for spam;
  success/error states.
- Dynamic OG images at `/api/og` (route-specific titles + accent gradient).
- SEO pass: per-route `metadata` exports, sitemap.xml, robots.txt, JSON-LD Person
  schema on `/about`.
- Accessibility audit: focus rings, ARIA landmarks, keyboard nav, contrast against
  glow gradients, prefers-reduced-motion.
- Lighthouse + Vercel Speed Insights pass on mobile.
- Domain + Cloudflare DNS + Email Routing setup.
- Submit to Google Search Console; verify OG previews on Twitter, LinkedIn, WhatsApp.

---

## Verification

- **Performance:** Lighthouse mobile ≥ 95 / 100 / 100 / 100; Vercel Speed Insights
  green core web vitals on `/`, `/work`, `/work/[slug]`, `/about`.
- **Accessibility:** axe DevTools clean; keyboard-only nav reaches every interactive
  element; prefers-reduced-motion disables all transform/opacity animations.
- **SEO:** sitemap.xml resolves; each route has unique `<title>` + `<meta description>`;
  per-route OG image renders in the OpenGraph debugger; JSON-LD validates.
- **Contact form:** sends a real message end-to-end via Resend in production; spam
  protection blocks a known bot pattern; rate limit prevents flood.
- **Build hygiene:** `next build` succeeds with zero TypeScript errors, no `any` leaks,
  no hydration warnings; no Tailwind unused classes shipped (purge verified).
- **Cross-browser:** Chrome / Safari / Firefox desktop + iOS Safari + Android Chrome —
  visual smoke pass.
- **Content audit:** every project page has at minimum a problem, an architecture
  diagram, three screenshots, three key-decision cards, and an outcome — no empty
  sections.

---

## What this plan deliberately is NOT

- It is not a Django/DRF backend project. Defer that until the static site can't meet
  the need.
- It is not bilingual in V1. Add `/ar` later only if the audience demands it.
- It is not an interactive demo platform. The projects are sensitive — narrative
  beats playgrounds here.
- It is not a blog. Quarterly content cadence does not justify the IA cost.

If any of these change later, the static MDX foundation accommodates each addition
without rewriting the core (add `next-intl` for i18n, a `/blog` route for posts,
a Railway-hosted Django demo for an interactive widget).
