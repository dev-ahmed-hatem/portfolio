"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Cursor-reactive gold particle field. Nodes drift and connect with thin lines
 * that brighten by proximity; the cursor acts as a node (connects + gently
 * repels nearby particles). Self-contained canvas — no deps.
 *
 * - Reads `--accent-primary` at runtime, re-reading on theme change.
 * - Honors prefers-reduced-motion (draws a single static frame, no loop).
 * - Pauses when off-screen via IntersectionObserver.
 */
export function NeuralConstellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let accent = "#cba34e";
    const readAccent = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-primary")
        .trim();
      if (v) accent = v;
    };
    readAccent();

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];

    const LINK_DIST = 132; // px within which two nodes connect
    const CURSOR_DIST = 168; // cursor influence radius
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(26, Math.min(92, Math.round((w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.4 + 0.9,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // links between nodes
      ctx.strokeStyle = accent;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > LINK_DIST) continue;
          let alpha = (1 - d / LINK_DIST) * 0.26;
          // brighten links whose midpoint is near the cursor
          if (pointer.active) {
            const mx = (a.x + b.x) / 2 - pointer.x;
            const my = (a.y + b.y) / 2 - pointer.y;
            const md = Math.hypot(mx, my);
            if (md < CURSOR_DIST) alpha += (1 - md / CURSOR_DIST) * 0.5;
          }
          ctx.globalAlpha = Math.min(alpha, 0.85);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // links from cursor to nearby nodes — the cursor becomes a node
      if (pointer.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d > CURSOR_DIST) continue;
          ctx.globalAlpha = (1 - d / CURSOR_DIST) * 0.6;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // node dots — faint halo + solid core (cheap glow, no shadowBlur)
      ctx.fillStyle = accent;
      for (const n of nodes) {
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // gentle cursor repulsion for interactivity
        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < CURSOR_DIST && d > 0.01) {
            const force = (1 - d / CURSOR_DIST) * 0.6;
            n.x += (dx / d) * force;
            n.y += (dy / d) * force;
          }
        }

        // wrap around edges for a seamless field
        if (n.x < -10) n.x = w + 10;
        else if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        else if (n.y > h + 10) n.y = -10;
      }
      draw();
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      step();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // pointer
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    // resize
    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(wrap);

    // theme change → re-read accent
    const mo = new MutationObserver(readAccent);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // only animate while visible
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    build();
    draw(); // first paint (also the static frame for reduced-motion)

    return () => {
      stop();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative isolate flex min-h-[28rem] items-center justify-center overflow-hidden sm:min-h-[34rem]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 -z-10 size-full"
      />
      {/* fade the field into the page above and below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-canvas via-transparent to-canvas"
      />
      <div className="pointer-events-none mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          One developer · every layer
        </p>
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.02em] text-fg sm:text-6xl">
          Built to <span className="text-accent">ship</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
          Web, mobile, desktop, and AI — designed, built, and deployed as one
          connected system. Move your cursor through the field.
        </p>
      </div>
    </div>
  );
}
