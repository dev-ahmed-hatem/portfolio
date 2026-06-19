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
  Icons paths (Python, Django, FastAPI, Postgres, Next.js, React, TS, JS, Tailwind,
  Flutter, Qt, Electron, Vite, Ollama, GitHub). Zero new deps. Used in: skills marquee
  (brand-colored logos + labels), `/about` skills matrix (4 grouped cards), footer + contact
  GitHub links, hero portrait caption.
- [ ] **▶ NEXT** — visual QA in browser at a few breakpoints; then continue Sprint 2
  (timeline + full skills matrix on `/about`, magnetic cursor, `/now` MDX).

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

- **2026-06-20** — Disk blocker resolved (C: ~8 GB free). Confirmed `node_modules` present
  and `next build` green (Sprint 1 skeleton was already built in a prior session but boxes
  were unticked). Added user's headshot (`public/portrait.jpg`) to the hero + `/about`, and
  built a dependency-free brand-icon system (`TechIcon`, inlined Simple Icons) to enrich the
  skills marquee, `/about` skills matrix, and social links. Note: lucide-react v1 dropped
  brand glyphs (`Github`), so GitHub now comes from `TechIcon`. Build verified, type-check clean.
- **2026-05-28** — Initial planning session. Architecture interview completed. Plan
  approved. `create-next-app` ran successfully. `npm install` failed with `ENOSPC` due
  to `C:` drive being completely full. Resume state captured in this file.
