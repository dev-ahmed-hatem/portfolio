import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type TimelineEntry = {
  year: string;
  title: string;
  role?: string;
  category?: string;
  description?: string;
  href?: string;
  /** Marks the leading "current" node (gets a pulsing accent dot). */
  current?: boolean;
};

/**
 * Vertical, year-anchored timeline. Each entry hangs off a single rail with a
 * gold node; the leading `current` entry pulses. Entries with an `href` become
 * links to their case study.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative ml-1 border-l border-border-subtle/60">
      {entries.map((e, i) => {
        const body = (
          <>
            <h3 className="flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight text-fg">
              {e.title}
              {e.href ? (
                <ArrowUpRight
                  size={16}
                  className="text-muted transition-colors group-hover:text-accent"
                />
              ) : null}
            </h3>
            {e.role ? (
              <p className="mt-0.5 text-sm text-muted">{e.role}</p>
            ) : null}
            {e.description ? (
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                {e.description}
              </p>
            ) : null}
          </>
        );

        return (
          <li key={`${e.year}-${e.title}-${i}`} className="relative pl-8 pb-10 last:pb-0">
            {/* rail node */}
            <span
              aria-hidden
              className={
                "absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-canvas " +
                (e.current ? "bg-accent" : "bg-elevated ring-1 ring-accent/50")
              }
            >
              {e.current ? (
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
              ) : null}
            </span>

            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
              {e.year}
              {e.category ? (
                <span className="text-muted">· {e.category}</span>
              ) : null}
            </p>

            {e.href ? (
              <Link
                href={e.href}
                className="group mt-2 -mx-3 block rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-border-subtle/70 hover:bg-surface"
              >
                {body}
              </Link>
            ) : (
              <div className="group mt-2">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
