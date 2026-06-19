# Portfolio — Progress & Resume Checkpoint

> **Last updated:** 2026-05-28
> **Status:** ⏸ PAUSED — blocked on host disk space (`C:` was at 0 GB free).
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
- [ ] **▶ NEXT — Task 1b: Complete `npm install`** (see resume command above)
- [ ] **Task 2: Install design + content dependencies**
  ```powershell
  cd D:\Pro\portfolio
  npm install framer-motion lucide-react cmdk next-mdx-remote gray-matter rehype-pretty-code shiki class-variance-authority clsx tailwind-merge geist
  npm install -D @types/mdx
  ```
- [ ] **Task 3: Configure design tokens**
  - Edit `src/app/globals.css` — replace default tokens with the palette in `docs/PLAN.md`
    (Task B → Design system → Tokens section).
  - Dark-first. Indigo `#6366F1` accent, amber `#F59E0B` warm, base `#0A0A0B`.
  - Add Tailwind theme extension via `@theme inline` block for color tokens.
- [ ] **Task 4: Build app shell**
  - `src/components/site/Nav.tsx`, `Footer.tsx`, `ThemeProvider.tsx`.
  - Update `src/app/layout.tsx` to wrap children in Nav + Footer + ThemeProvider.
  - Routes in nav: Home (`/`), Work (`/work`), About (`/about`), Now (`/now`), Contact (`/contact`).
- [ ] **Task 5: Build homepage** (`src/app/page.tsx`)
  - Hero with CSS radial-gradient glow orb + headline + 2 CTAs.
  - 6-cell asymmetric bento grid: Lucy 2×2, EasyBela 1×2, Stats 1×1, E-Commerce 1×1, Now 1×1.
  - Skills marquee (CSS keyframes, pauses on hover).
  - Bottom CTA section ("Want to build something together?").
- [ ] **Task 6: Set up MDX content pipeline**
  - `content/projects/*.mdx` with frontmatter: slug, title, pitch, year, role, stack, status, cover, gallery, github?
  - `src/lib/projects.ts` — load + parse projects via `gray-matter`.
  - `src/app/work/page.tsx` — grid with category chips.
  - `src/app/work/[slug]/page.tsx` — case-study template (sticky sidebar + sections).
- [ ] **Task 7: Author first case study + supporting pages**
  - Write `content/projects/lucy.mdx` per the case-study template in `docs/PLAN.md`.
  - Stub `src/app/about/page.tsx`, `src/app/now/page.tsx`, `src/app/contact/page.tsx`
    (placeholder content; flesh out in Sprint 2).
- [ ] **Task 8: Verify dev server runs**
  - `npm run dev` → http://localhost:3000.
  - Every nav route resolves without errors.
  - Homepage renders hero + bento + marquee.

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

- **2026-05-28** — Initial planning session. Architecture interview completed. Plan
  approved. `create-next-app` ran successfully. `npm install` failed with `ENOSPC` due
  to `C:` drive being completely full. Resume state captured in this file.
