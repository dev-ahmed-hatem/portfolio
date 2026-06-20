"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A self-typing "deploy" terminal. The command types character-by-character,
 * then the build output streams line-by-line, finishing on a blinking prompt.
 *
 * - Always dark (a console surface) with brand gold — does not invert by theme.
 * - Starts when scrolled into view; honors prefers-reduced-motion (shows the
 *   full log instantly).
 */

type Step =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "arrow"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "progress"; text: string }
  | { kind: "prompt" };

const SCRIPT: Step[] = [
  { kind: "cmd", text: "git push origin main" },
  { kind: "out", text: "Enumerating objects: 84, done." },
  { kind: "arrow", text: "Vercel — building ahmedhelal.dev" },
  { kind: "ok", text: "Compiled successfully" },
  { kind: "ok", text: "Linting & type-checking — passed" },
  { kind: "ok", text: "Generating static pages" },
  { kind: "ok", text: "Prerendered every case study" },
  { kind: "progress", text: "Uploading build outputs" },
  { kind: "ok", text: "Deployment ready — dev-ahmed-helal" },
  { kind: "prompt" },
];

const GOLD = "#e4ba60";
const OK = "#34d399";
const DIM = "#8a8170";
const TXT = "#e9e2d2";

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-[#e4ba60]"
      style={{ animation: "term-blink 1s steps(1) infinite" }}
    />
  );
}

function ProgressLine({ animate }: { animate: boolean }) {
  return (
    <div>
      <span style={{ color: GOLD }}>→ </span>
      <span style={{ color: TXT }}>Uploading build outputs</span>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="h-1.5 w-44 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full"
            style={{
              background: GOLD,
              width: animate ? undefined : "100%",
              animation: animate
                ? "term-fill 0.9s var(--ease-emphasized) forwards"
                : undefined,
            }}
          />
        </div>
        <span style={{ color: DIM }}>100%</span>
      </div>
    </div>
  );
}

function Line({
  step,
  typed,
  reduced,
}: {
  step: Step;
  typed?: string;
  reduced: boolean;
}) {
  switch (step.kind) {
    case "cmd":
      return (
        <div>
          <span style={{ color: GOLD }}>$ </span>
          <span style={{ color: TXT }}>{typed ?? step.text}</span>
          {typed !== undefined ? <Caret /> : null}
        </div>
      );
    case "out":
      return <div style={{ color: DIM }}>{step.text}</div>;
    case "arrow":
      return (
        <div>
          <span style={{ color: GOLD }}>→ </span>
          <span style={{ color: TXT }}>{step.text}</span>
        </div>
      );
    case "ok":
      return (
        <div>
          <span style={{ color: OK }}>✓ </span>
          <span style={{ color: TXT }}>{step.text}</span>
        </div>
      );
    case "progress":
      return <ProgressLine animate={!reduced} />;
    case "prompt":
      return (
        <div>
          <span style={{ color: GOLD }}>$ </span>
          <Caret />
        </div>
      );
  }
}

export function TerminalBuildLog() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);
  const [typed, setTyped] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(isReduced);

    if (isReduced) {
      setVisible(SCRIPT.length);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((r) => timers.push(setTimeout(r, ms)));

    async function run() {
      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return;
        const s = SCRIPT[i];
        if (s.kind === "cmd") {
          for (let c = 1; c <= s.text.length; c++) {
            if (cancelled) return;
            setVisible(i);
            setTyped(s.text.slice(0, c));
            await wait(34 + Math.random() * 46);
          }
          setTyped(null);
          setVisible(i + 1);
          await wait(440);
        } else {
          setVisible(i + 1);
          await wait(s.kind === "progress" ? 1000 : s.kind === "ok" ? 230 : 200);
        }
      }
    }

    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0b08] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.8)]"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#e4ba60]/90" />
        <span className="size-3 rounded-full bg-white/15" />
        <span className="size-3 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[11px] uppercase tracking-widest text-white/40">
          deploy — ahmedhelal.dev
        </span>
      </div>

      {/* body */}
      <div className="space-y-1 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        {SCRIPT.map((step, i) => {
          if (i < visible) return <Line key={i} step={step} reduced={reduced} />;
          if (i === visible && step.kind === "cmd" && typed !== null)
            return <Line key={i} step={step} typed={typed} reduced={reduced} />;
          return null;
        })}
      </div>
    </div>
  );
}
