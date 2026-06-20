"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const COLS = 24;
const ROWS = 7;

/** Deterministic PRNG so server and client render the same grid (no hydration drift). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function levelClass(level: number) {
  switch (level) {
    case 4:
      return "bg-accent shadow-[0_0_10px_-1px_var(--accent-primary-soft)]";
    case 3:
      return "bg-accent/80";
    case 2:
      return "bg-accent/55";
    case 1:
      return "bg-accent/30";
    default:
      return "bg-accent/10";
  }
}

type Stat = { label: string; target: number; suffix?: string; hint: string };

export function IgniteGrid({ yearsBuilding }: { yearsBuilding: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ignited, setIgnited] = useState(false);

  const levels = useMemo(() => {
    const rand = mulberry32(0x9e3779b9);
    return Array.from({ length: COLS * ROWS }, () => {
      const r = rand();
      if (r < 0.46) return 0;
      if (r < 0.66) return 1;
      if (r < 0.83) return 2;
      if (r < 0.93) return 3;
      return 4;
    });
  }, []);

  const stats: Stat[] = useMemo(
    () => [
      { label: "Platforms", target: 4, hint: "web · mobile · desktop · AI" },
      { label: "Languages", target: 5, suffix: "+", hint: "Python · TS · Dart · SQL · C++" },
      { label: "Years building", target: yearsBuilding, suffix: "+", hint: "since 2020" },
    ],
    [yearsBuilding],
  );

  const [vals, setVals] = useState<number[]>(() => stats.map(() => 0));

  // ignite once when scrolled into view (or immediately for reduced-motion)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setIgnited(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIgnited(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // count the stats up once ignited
  useEffect(() => {
    if (!ignited) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = stats.map((s) => s.target);
    if (reduced) {
      setVals(targets);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVals(targets.map((tv) => Math.round(e * tv)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ignited, stats]);

  return (
    <div
      ref={wrapRef}
      className="grid gap-8 rounded-xl border border-border-subtle/70 bg-surface p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center"
    >
      {/* heatmap */}
      <div>
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          aria-hidden
        >
          {levels.map((lvl, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            return (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-[2px] transition-all duration-500 ease-[var(--ease-emphasized)]",
                  ignited
                    ? cn(levelClass(lvl), "scale-100 opacity-100")
                    : "scale-[0.82] bg-border-subtle/25 opacity-40",
                )}
                style={{
                  transitionDelay: ignited ? `${col * 18 + row * 8}ms` : "0ms",
                }}
              />
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={cn("size-2.5 rounded-[2px]", levelClass(l))} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="rounded-lg border border-border-subtle/60 bg-elevated/40 p-4"
          >
            <div className="font-display text-3xl font-semibold tabular-nums tracking-tight text-accent sm:text-4xl">
              {vals[i]}
              {s.suffix ?? ""}
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-fg">
              {s.label}
            </div>
            <div className="mt-1 text-[11px] leading-snug text-muted">{s.hint}</div>
          </div>
        ))}
        <div className="rounded-lg border border-border-subtle/60 bg-elevated/40 p-4">
          <div className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-fg">
            <span className="inline-block size-2.5 animate-pulse rounded-full bg-ok shadow-[0_0_8px_var(--status-ok)]" />
            Shipping
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-fg">
            Status
          </div>
          <div className="mt-1 text-[11px] leading-snug text-muted">
            always building something
          </div>
        </div>
      </div>
    </div>
  );
}
