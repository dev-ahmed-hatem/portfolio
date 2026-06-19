import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ahmed Hatem Helal — full-stack developer based in Cairo, building cross-platform AI products.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
        About
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        Ahmed Hatem Helal
      </h1>
      <p className="mt-6 text-lg text-muted">
        Full-stack developer based in Cairo. I build cross-platform AI
        products — desktop, mobile, and web — most often with Python or
        TypeScript on both ends of the stack.
      </p>
      <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
        Full /about page lands in Sprint 2 — timeline, skills matrix, CV
        download.
      </p>
    </div>
  );
}
