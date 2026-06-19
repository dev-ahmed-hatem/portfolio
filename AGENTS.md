<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Resume protocol — read this first

This is **Ahmed Hatem Helal's personal portfolio**, paused mid-bootstrap due to a host
disk-space issue (C: was at 0 GB free). The next session must NOT restart planning. The
plan is locked, the project is scaffolded, and there is a precise checkpoint to resume
from.

## When the user types `continue` (or any resumption signal), do this in order:

1. **Read `docs/PROGRESS.md`** — single source of truth for current state, what's done,
   what's pending, what's blocked, and the exact next command. Treat it as authoritative.
2. **Skim `docs/PLAN.md`** — the approved 4-sprint plan. Don't re-plan; execute.
3. **Skim `docs/CONTEXT.md`** — original user request + locked decisions from the
   interview. Reference if there's ambiguity about a design choice.
4. **Verify disk space is no longer blocking** — run
   `Get-PSDrive C, D | Select Name, Free` and confirm both have at least 5 GB free. If
   not, stop and tell the user.
5. **Resume from the task marked "▶ NEXT" in `docs/PROGRESS.md`** — typically this means
   running `npm install` to complete bootstrap, then moving through Sprint 1 tasks.

## Do NOT:
- Re-run the architecture interview — all decisions are locked in `docs/CONTEXT.md`.
- Re-bootstrap the Next.js project — it already exists; the blocker was `npm install`.
- Switch the tech stack (no Django, no PythonAnywhere, no CMS — see `docs/CONTEXT.md`).
- Create extra `.md` planning files — keep state in the three existing `docs/*.md` files.

## Do:
- Update `docs/PROGRESS.md` after each task completes (move "▶ NEXT" forward, check the
  done box, append a one-line note to "Session log" with the date).
- Append disk-space or environment surprises to "Known issues" in `docs/PROGRESS.md`.
- Prefer `npm` (already chosen) over yarn/pnpm to keep the lockfile consistent.
