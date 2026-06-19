import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Ahmed is actively building right now.",
};

export default function NowPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
        Now
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        Currently building
      </h1>
      <p className="mt-6 text-muted">
        Lucy — the desktop coding agent — and EasyBela&apos;s catalog and
        orders flow. This page becomes an MDX file in Sprint 2 and updates
        as work moves.
      </p>
    </div>
  );
}
