/**
 * Spotlight content for the Marvira bento card. Marvira is a bilingual (AR + EN)
 * tiered e-commerce storefront platform, so the card's empty middle holds a
 * stylized mini-storefront window — a browser chrome with an EN · ع language
 * toggle over a small product grid. It reads instantly as "storefront", stays
 * on the gold palette, and scales cleanly on mobile and large screens.
 */
const PRODUCTS = [
  { price: "$48", thumb: "from-accent/30 to-warm/10" },
  { price: "$62", thumb: "from-warm/25 to-accent/10" },
  { price: "$24", thumb: "from-accent/20 to-warm/15" },
] as const;

export function MarviraSpotlight() {
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
            marvira.store
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

        {/* product grid */}
        <div className="grid grid-cols-3 gap-2.5 p-3 sm:gap-3 sm:p-4">
          {PRODUCTS.map((p, i) => (
            <div
              key={i}
              className="marvira-tile rounded-md border border-border-subtle/50 bg-surface/60 p-1.5"
              style={{ animationDelay: `${180 + i * 110}ms` }}
            >
              <div
                className={`aspect-square rounded bg-gradient-to-br ${p.thumb}`}
              />
              <div className="mt-2 h-1.5 w-3/4 rounded-full bg-fg/15" />
              <div className="mt-2 flex items-center justify-between gap-1">
                <span className="font-mono text-[11px] text-accent">
                  {p.price}
                </span>
                <span
                  aria-hidden
                  className="grid size-4 shrink-0 place-items-center rounded-full bg-warm text-[11px] font-medium leading-none text-canvas"
                >
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
