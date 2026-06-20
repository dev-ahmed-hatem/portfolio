"use client";

import { useEffect, useRef } from "react";
import { TechIcon, TECH, type TechName } from "@/components/icons/TechIcon";
import { BrandMark } from "./BrandMark";

const BASE = 420; // design coordinate space (px); scaled to fit the container

type Ring = {
  radius: number;
  duration: number; // seconds per rotation — slow & quiet
  dir: 1 | -1;
  size: number;
  items: TechName[];
};

const RINGS: Ring[] = [
  {
    radius: 66,
    duration: 48,
    dir: 1,
    size: 22,
    items: ["react", "nextjs", "typescript", "tailwind", "redux"],
  },
  {
    radius: 122,
    duration: 74,
    dir: -1,
    size: 20,
    items: ["python", "django", "fastapi", "postgres", "docker", "nginx"],
  },
  {
    radius: 160,
    duration: 104,
    dir: 1,
    size: 18,
    items: ["flutter", "qt", "electron", "vite", "ollama", "javascript", "github"],
  },
];

function TechChip({ name, size }: { name: TechName; size: number }) {
  const tile = size + 18;
  return (
    <div
      className="group/chip relative grid place-items-center rounded-full border border-border-subtle/70 bg-elevated/70 text-muted backdrop-blur-sm transition-all duration-300 ease-[var(--ease-emphasized)] hover:scale-125 hover:border-accent/70 hover:bg-elevated hover:text-accent hover:shadow-[0_0_14px_-2px_var(--accent-primary-soft)]"
      style={{ width: tile, height: tile }}
    >
      <TechIcon name={name} size={size} aria-hidden />
      <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-canvas/90 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg opacity-0 shadow-sm transition-opacity duration-200 group-hover/chip:opacity-100">
        {TECH[name].label}
      </span>
    </div>
  );
}

export function TechGalaxy() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);

  useEffect(() => {
    const wrap = wrapRef.current;
    const galaxy = galaxyRef.current;
    if (!wrap || !galaxy) return;

    const apply = (dx: number, dy: number) => {
      galaxy.style.transform = `translate(-50%, -50%) scale(${scaleRef.current}) translate(${dx}px, ${dy}px)`;
    };

    // scale the fixed design space down to fit the container
    const ro = new ResizeObserver(() => {
      scaleRef.current = Math.min(1, wrap.clientWidth / BASE);
      apply(0, 0);
    });
    ro.observe(wrap);
    apply(0, 0);

    // quiet cursor parallax (skip for reduced motion)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let onMove: ((e: PointerEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;
    if (!reduced) {
      onMove = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        apply(dx * 18, dy * 18);
      };
      onLeave = () => apply(0, 0);
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
    }

    return () => {
      ro.disconnect();
      if (onMove) wrap.removeEventListener("pointermove", onMove);
      if (onLeave) wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-square w-full max-w-[420px] select-none overflow-hidden"
    >
      <div
        ref={galaxyRef}
        className="group absolute left-1/2 top-1/2 transition-transform duration-300 ease-out"
        style={{
          width: BASE,
          height: BASE,
          transformOrigin: "center",
          transform: "translate(-50%, -50%) scale(1)",
        }}
      >
        {/* faint orbit rings */}
        {RINGS.map((r) => (
          <span
            key={`orbit-${r.radius}`}
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-subtle/40"
            style={{ width: r.radius * 2, height: r.radius * 2 }}
          />
        ))}

        {/* rotating rings of tech icons — pause on hover so they can be read */}
        {RINGS.map((r) => (
          <div
            key={`ring-${r.radius}`}
            className="absolute left-1/2 top-1/2 size-0 group-hover:[animation-play-state:paused]"
            style={{
              animation: `galaxy-spin ${r.duration}s linear infinite ${r.dir === 1 ? "" : "reverse"}`,
            }}
          >
            {r.items.map((name, idx) => {
              const angle = (360 / r.items.length) * idx;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * r.radius;
              const y = Math.sin(rad) * r.radius;
              return (
                <div
                  key={name}
                  className="absolute left-0 top-0"
                  style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
                >
                  {/* counter-rotate so the icon stays upright */}
                  <div
                    className="inline-flex group-hover:[animation-play-state:paused]"
                    style={{
                      animation: `galaxy-spin ${r.duration}s linear infinite ${r.dir === 1 ? "reverse" : ""}`,
                    }}
                  >
                    <TechChip name={name} size={r.size} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* glowing core */}
        <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
          <div
            aria-hidden
            className="absolute size-28 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, var(--accent-primary-soft), transparent 70%)",
            }}
          />
          <div className="relative grid size-16 place-items-center rounded-full border border-accent/40 bg-canvas/80 shadow-[0_0_24px_-4px_var(--accent-primary-soft)] backdrop-blur">
            <BrandMark className="size-8 text-accent drop-shadow-[0_0_8px_var(--accent-primary-soft)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
