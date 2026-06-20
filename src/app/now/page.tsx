import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getNow } from "@/lib/now";

export const metadata: Metadata = {
  title: "Now",
  description: "What Ahmed Helal is actively building right now.",
};

export default function NowPage() {
  const { updated, body } = getNow();
  const updatedLabel = updated
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(updated))
    : null;

  return (
    <div className="mx-auto max-w-3xl px-6 pt-12 pb-20 sm:pt-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
        Now
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        Currently building
      </h1>
      {updatedLabel ? (
        <p className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_var(--accent-primary)]" />
          Last updated {updatedLabel}
        </p>
      ) : null}

      <div className="prose mt-10 max-w-none">
        <MDXRemote source={body} />
      </div>
    </div>
  );
}
