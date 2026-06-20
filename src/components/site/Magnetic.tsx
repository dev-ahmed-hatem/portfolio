"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps an interactive element and gives it a quiet magnetic pull toward the
 * cursor on hover, easing back on leave. Deliberately restrained (small `max`
 * offset) to stay professional rather than playful.
 *
 * Only active on fine pointers with motion allowed — touch devices and
 * reduced-motion users get the element with no movement at all.
 */
export function Magnetic({
  children,
  className,
  strength = 0.2,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of cursor-to-center distance applied as offset. */
  strength?: number;
  /** Maximum offset in px, in each axis. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef<boolean | null>(null);

  function isEnabled() {
    if (enabled.current === null) {
      enabled.current =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: fine)").matches &&
        window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    }
    return enabled.current;
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isEnabled()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = clamp((e.clientX - (r.left + r.width / 2)) * strength, max);
    const dy = clamp((e.clientY - (r.top + r.height / 2)) * strength, max);
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transition: "transform 250ms var(--ease-emphasized)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

function clamp(v: number, max: number) {
  return Math.max(-max, Math.min(max, v));
}
