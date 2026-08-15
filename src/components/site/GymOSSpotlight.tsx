/**
 * Spotlight content for the GymOS bento card. GymOS is a bilingual (AR + EN)
 * gym operating system, so the card's empty middle holds a stylized mini
 * dashboard window — browser chrome with an EN · ع toggle over two KPI tiles
 * and a live-occupancy bar that fills in once. It reads instantly as "live
 * management dashboard", stays on the gold palette, and mirrors the framing of
 * the Marvira spotlight so the two co-flagship cards feel like a pair.
 */
const STATS = [
  { label: "Members", value: "428" },
  { label: "Check-ins", value: "96" },
] as const;

export function GymOSSpotlight() {
  return (
    <div className="flex h-full flex-col justify-end">
      <div className="overflow-hidden rounded-lg border border-border-subtle/70 bg-canvas/40 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-border-subtle/60 bg-elevated/40 px-3 py-2">
          <span aria-hidden className="flex gap-1">
            <i className="size-2 rounded-full bg-border-subtle" />
            <i className="size-2 rounded-full bg-border-subtle" />
            <i className="size-2 rounded-full bg-border-subtle" />
          </span>
          <span className="ml-1 min-w-0 flex-1 truncate rounded-full bg-canvas/70 px-2.5 py-0.5 font-mono text-[10px] text-muted">
            gymmos.vercel.app
          </span>
          {/* bilingual toggle */}
          <span className="flex shrink-0 items-center rounded-full border border-border-subtle/70 bg-canvas/60 p-0.5 font-mono text-[10px] leading-none">
            <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-fg">
              EN
            </span>
            <span className="px-1.5 py-0.5 text-base leading-none text-muted">
              ع
            </span>
          </span>
        </div>

        {/* dashboard body */}
        <div className="space-y-3 p-3 sm:p-4">
          {/* KPI tiles */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="gymos-tile rounded-md border border-border-subtle/50 bg-surface/60 p-2.5"
                style={{ animationDelay: `${180 + i * 110}ms` }}
              >
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted">
                  {s.label}
                </div>
                <div className="mt-1 font-mono text-xl text-fg">{s.value}</div>
              </div>
            ))}
          </div>

          {/* live occupancy bar */}
          <div className="gymos-tile rounded-md border border-border-subtle/50 bg-surface/60 p-2.5" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                Live occupancy
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[9px] text-accent">
                <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent" />
                62%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-fg/10">
              <div className="gymos-bar h-full w-[62%] rounded-full bg-gradient-to-r from-accent to-warm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
