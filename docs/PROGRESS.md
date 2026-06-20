# Portfolio — Progress & Resume Checkpoint

> **Last updated:** 2026-06-20
> **Status:** ▶ ACTIVE — disk blocker resolved, `npm install` complete, Sprint 1 skeleton
> built. Now enriching with brand assets (photo + logos/icons).
> **Resume mechanism:** user types `continue` → next Claude session reads this file and
> proceeds from "▶ NEXT".

---

## ▶ NEXT — exact resume command

```powershell
# 1. Confirm disk space is healthy (need at least ~5 GB on C: for npm temp + cache).
Get-PSDrive C, D | Select-Object Name, @{N='FreeGB';E={[math]::Round($_.Free/1GB,1)}}

# 2. Move npm cache off C: drive permanently (optional but recommended — prevents recurrence).
npm config set cache "D:\npm-cache"

# 3. Clear the old C: cache (frees ~7 GB).
npm cache clean --force

# 4. Resume the install that failed last session.
cd D:\Pro\portfolio
npm install
```

If `npm install` succeeds, mark Task 1 done in the checklist below and continue with
Task 2 (Install design + content dependencies).

---

## Sprint 1 — Skeleton + design system

- [x] **Task 1: Bootstrap Next.js project**
  - `npx create-next-app@latest D:\Pro\portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack --skip-install` ran successfully.
  - Next.js **16.2.6** (NOT 15 as the plan stated — heed `AGENTS.md` Next.js-16 warning).
  - React **19.2.4**, Tailwind **v4**.
  - `--skip-install` was used; `npm install` failed afterwards due to disk-full on C:.
- [x] **Task 1b: Complete `npm install`** — done; `node_modules` present, `next build` green.
- [x] **Task 2: Install design + content dependencies**
  ```powershell
  cd D:\Pro\portfolio
  npm install framer-motion lucide-react cmdk next-mdx-remote gray-matter rehype-pretty-code shiki class-variance-authority clsx tailwind-merge geist
  npm install -D @types/mdx
  ```
- [x] **Task 3: Configure design tokens** — `globals.css` has dark-first tokens + `@theme inline`.
- [x] **Task 4: Build app shell** — `Nav`, `Footer`, `ThemeProvider`, `layout.tsx` wired.
- [x] **Task 5: Build homepage** — hero, bento grid, skills marquee, CTA all present.
- [x] **Task 6: Set up MDX content pipeline** — `src/lib/projects.ts`, `/work`, `/work/[slug]`.
- [x] **Task 7: Author case studies + supporting pages** — lucy/easybela/ecommerce prerender; about/now/contact built.
- [x] **Task 8: Verify build** — `next build` green; all 11 routes prerender.

## Brand assets pass (2026-06-20)

- [x] **Headshot inserted** — `public/portrait.jpg` (renamed from `1780601835370.jpg`,
  1080×1080). Featured in a framed, glow-backed two-column homepage hero and on `/about`.
- [x] **Brand logos/icons** — new `src/components/icons/TechIcon.tsx` with inlined Simple
  Icons paths (Python, Django, FastAPI, Postgres, Next.js, React, Redux, TS, JS, Tailwind,
  Flutter, Qt, Electron, Vite, Docker, Nginx, Ollama, GitHub). Zero new deps. Official brand
  hexes; monochrome brands (Next.js, Ollama, GitHub) use `currentColor` so they adapt to the
  theme. Used in: skills marquee (brand-colored logos + labels), `/about` skills matrix
  (5 grouped cards), footer + contact GitHub links, hero portrait caption.
- [x] **Black-and-gold restyle** — replaced the indigo/amber tokens in `globals.css` with a
  palette derived from `portrait.jpg` (warm near-black + gold), for both dark and light themes.
  Site is fully token-driven, so this cascaded with no per-component edits. **This palette is
  now locked** — all future styling must use the tokens (see memory `design-palette`).
- [x] **Visual QA** — screenshotted home/about/work in dark+light at desktop+mobile via
  Playwright-core driving system Chrome (zero console/page errors). Confirmed: bento grid
  now renders the intended 2×2 (grid-span fix works), background wash is subtle with no
  banding, brand mark reads at all scales, hero entrance + scroll-reveals leave nothing
  hidden, OG cards render on-brand. (2026-06-20)
- [x] **`/about` Sprint 2 pass** — added a **Story** section and a **vertical
  year-anchored Timeline** (`src/components/site/Timeline.tsx`) built from real
  `getAllProjects()` data + a pulsing "Now" node; kept the existing skills matrix;
  wrapped sections in `<Reveal>`; removed the "expand in Sprint 2" placeholder. Timeline
  is NOT fabricated — it's the shipped projects. Personal milestones (education/employers/
  start year) can be added later if the user supplies dates. Verified in browser (dark +
  light, no console errors), `tsc` + `next build` green. (2026-06-20)
- [x] **`/now` MDX route** — `content/now.mdx` (gray-matter `updated` frontmatter) +
  `src/lib/now.ts` loader + page rendering via `MDXRemote` with a "Last updated" date and
  `.prose` styling. Mirrors the case-study MDX pipeline. Verified in browser, build green.
  (2026-06-20)
- [x] **Magnetic cursor** — `src/components/site/Magnetic.tsx`: quiet cursor-pull wrapper,
  fine-pointer + motion-allowed only (no-op on touch/reduced-motion). Applied to home hero
  CTAs, the 5 bento cards (gentle: strength 0.12 / max 6px), home closing CTA, and `/about`
  CTAs. Verified via Playwright (transform clamps to max, resets on leave). Build green.
  (2026-06-20) — **Sprint 2 complete.**
- [x] **Project expansion (Sprint 3 content)** — surveyed `D:/Pro/work` + `D:/Pro/mobile`
  via parallel agents, curated with the user, and added **10 new case studies** (now 13
  total): frydai, aquaponics, shield-doors, goby, ece-sis, gradegain, playzo, gym-app,
  social-market, kaffo. Added `icon` (lucide) + `logo` fields to frontmatter; new
  `ProjectIcon` registry; copied 3 real brand logos to `public/projects/` (frydai, kaffo,
  shield-doors). Glyphs now show on `/work` cards, home bento, and case-study headers
  (logo when present, else glyph). Home bento expanded to a data-driven 9-cell grid
  (6 featured + At-a-glance + Now + All-work). All 13 prerender, `tsc` + build green,
  verified in browser (dark+light, no errors). (2026-06-20)
  - **Skipped** (tests/scaffolds/not-original): kids-area, sina, spotter, vidstack, web,
    abdulrhman, django_test, freelance, flutter-wonderous (gskinner demo), etc. **Almukhles**
    skipped per user (different primary committer). Many more kaffo client apps (admission,
    hrms, financial, lpc, samara…) left out to avoid dilution — available if wanted.
- [x] **Project roster revision (per user)** — dropped **goby**; renamed **E-Commerce SaaS
  → Marvira** (slug `marvira`, real `logo.svg` copied to public/projects); **Shield Doors**
  now frames both its Next.js marketing site + Electron desktop app; added 5 projects:
  **HRMS**, **Tkaful** (cooperative/takaful finance), **Samara** (security-guard ops, prod
  at samaraguards.com.sa), **ProGym** (gym management, web), and **YouTube Downloader**
  (Python+PyQt5 desktop, the one project with a public GitHub link). **Total: 17 projects.**
  New lucide glyphs registered (users, heart-handshake, shield-check, building-2, download).
  Home `featuredSlugs` updated (ecommerce→marvira). All prerender, build green, verified in
  browser (no console errors). (2026-06-20)
## Sprint 4 — Polish + ship (in progress)

- [x] **SEO pack** — `app/sitemap.ts` (static routes + all 17 projects), `app/robots.ts`
  (allow all, sitemap+host), JSON-LD `Person` schema on `/about`. Verified: /sitemap.xml
  and /robots.txt serve correctly. (2026-06-20)
- [x] **⌘K command palette** — `CommandPalette` (cmdk), global ⌘K/Ctrl-K + nav button
  (`open-command-palette` event); Pages / Projects (all 17) / Actions (email, CV, GitHub,
  toggle theme). Mounted in layout with project data. Verified in browser. (2026-06-20)
- [x] **Dynamic OG** — already satisfied by the `opengraph-image.tsx` file conventions
  (root + per-project), done in the brand/OG pass.
- [x] **Contact form** — user chose a no-backend service over Resend. Built `ContactForm`
  (client) → **Web3Forms** (free, public access key, honeypot/botcheck, success/error
  states). Reads `NEXT_PUBLIC_WEB3FORMS_KEY`; **falls back to a prefilled mailto** when
  unset (button shows "Compose email" → "Send message" once keyed). `.env.example` added.
  Contact page rebuilt with the form + direct email/GitHub. Verified both themes. (2026-06-20)
  - **USER TODO:** get a free key at web3forms.com, put it in `.env.local` as
    `NEXT_PUBLIC_WEB3FORMS_KEY=…`, rebuild.
- [ ] **▶ NEXT** — a11y/perf pass (focus rings, ARIA landmarks, keyboard nav, contrast,
  Lighthouse on mobile); then **deploy** (Vercel + domain/DNS + email routing — user ops).

## Sprint 2 — Homepage + about (after Sprint 1)

See `docs/PLAN.md` § "Build plan — 4 sprints" → Sprint 2.

## Sprint 3 — Case studies

See `docs/PLAN.md` § Sprint 3.

## Sprint 4 — Polish + ship

See `docs/PLAN.md` § Sprint 4.

---

## Known issues

- **Disk space (CRITICAL, blocking):** `C:` drive at 0 GB / 97.1 GB total on 2026-05-28.
  npm cache on `C:` was 7.3 GB. Resolution: clean `C:`, move npm cache to `D:`, then
  retry install. See "▶ NEXT" above.
- **Next.js version drift:** plan says "Next.js 15" but `create-next-app@latest` installed
  **Next.js 16.2.6**. The framework's `AGENTS.md` explicitly warns of breaking changes
  vs older versions. Before writing any non-trivial Next code, read
  `node_modules/next/dist/docs/` (will exist after `npm install` succeeds).
- **`--no-turbopack` flag used:** chose webpack at scaffold time. If Turbopack docs in
  the installed version look stable for dev, reconsider switching back in Sprint 4.
  (Note: `next build` now reports it's using Turbopack regardless — verify config in Sprint 4.)
- **lucide-react v1 dropped brand glyphs:** `Github` (and other brand logos) are no longer
  exported. Brand/tech logos come from `src/components/icons/TechIcon.tsx` (inlined Simple
  Icons); lucide is for UI glyphs only. Add new tech logos to `TechIcon`'s `TECH` registry.

---

## Decisions already locked (don't re-debate)

See `docs/CONTEXT.md` for the full interview record. Headline locks:

| Decision           | Value                                       |
|--------------------|---------------------------------------------|
| Hosting            | Vercel only (Hobby tier)                    |
| Backend            | **None** (static MDX + Edge functions)      |
| Database           | **None**                                    |
| CMS                | **None** (MDX in repo)                      |
| Locale             | English only                                |
| Scope              | Polished — 3–4 weeks                        |
| Featured order     | Lucy → EasyBela → E-Commerce                |
| Live demos         | **No live demos** (sensitive/customer code) |
| Brand assets       | None yet — build wordmark from initials AH  |
| Domain (suggested) | `ahmedhelal.dev` via Cloudflare Registrar   |

---

## Session log

- **2026-06-20** — Brand mark + full OG/social metadata. Designed an **"AH" ligature
  mark** (two H-posts bridged by an A-peak + a floating gold spark — echoes the portrait
  glow). Single geometry source in `src/lib/brand.ts`, consumed by: `app/icon.svg` (SVG
  favicon, replaces the deleted default `favicon.ico`), `app/apple-icon.tsx` (180×180 via
  next/og), the theme-aware `BrandMark` inline SVG now in the navbar, and the OG cards.
  Full OG/Twitter: shared `src/lib/og.tsx` renderer (black-and-gold 1200×630, next/og
  built-in font), root `opengraph-image.tsx`/`twitter-image.tsx`, and **per–case-study**
  `work/[slug]/opengraph-image.tsx`/`twitter-image.tsx` (dynamic title/pitch). `layout.tsx`
  gained `openGraph`, `twitter` (summary_large_image), `viewport.themeColor`, keywords,
  authors, robots. `tsc` clean, `next build` green (20 routes; all icon/OG images
  prerender as ~100 KB PNGs). **TODO for user:** Twitter `creator` handle is a placeholder
  (`@ahmedhelal`) — update in `layout.tsx`.
- **2026-06-20** — Hero + page-cohesion polish. Made the homepage hero cinematic
  with a quiet **one-shot gold light-sweep entrance** (CSS-only, no runtime JS, server
  component intact): staggered text rise, glow fade-in, portrait settle, a single gold
  light-bar sweep across the portrait, and 6 faint gold motes — all using the locked
  palette tokens, all collapsing to the rest state under `prefers-reduced-motion`.
  Added a `<Reveal>` client component (IntersectionObserver, one-shot fade-up) wired
  into the bento grid (staggered) + closing CTA. **Side fix:** grid-span classes were
  on `BentoCard`'s inner `<article>` (inside the `<Link>` grid item) so they were inert;
  moved them onto the `Reveal` wrappers, so the bento now renders as intended (Lucy 2×2,
  EasyBela 1×2). Added a `no-js` html flag + inline-script removal so reveals fail open
  without JS. `tsc` clean, `next build` green, `/` still static.
- **2026-06-20** — Disk blocker resolved (C: ~8 GB free). Confirmed `node_modules` present
  and `next build` green (Sprint 1 skeleton was already built in a prior session but boxes
  were unticked). Added user's headshot (`public/portrait.jpg`) to the hero + `/about`, and
  built a dependency-free brand-icon system (`TechIcon`, inlined Simple Icons) to enrich the
  skills marquee, `/about` skills matrix, and social links. Note: lucide-react v1 dropped
  brand glyphs (`Github`), so GitHub now comes from `TechIcon`. Build verified, type-check clean.
- **2026-05-28** — Initial planning session. Architecture interview completed. Plan
  approved. `create-next-app` ran successfully. `npm install` failed with `ENOSPC` due
  to `C:` drive being completely full. Resume state captured in this file.
