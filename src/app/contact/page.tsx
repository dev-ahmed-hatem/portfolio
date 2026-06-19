import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { TechIcon } from "@/components/icons/TechIcon";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ahmed Hatem Helal.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
        Contact
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        Let&apos;s talk
      </h1>
      <p className="mt-6 max-w-xl text-muted">
        The form lands in Sprint 4 (Resend + Turnstile). Until then, email is
        the fastest path.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="mailto:helal@187n.ai"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-warm px-5 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5"
        >
          <Mail size={16} />
          helal@187n.ai
        </Link>
        <Link
          href="https://github.com/dev-ahmed-hatem"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-border-subtle/80 px-5 text-sm font-medium text-fg transition-colors hover:bg-elevated/60"
        >
          <TechIcon name="github" size={16} />
          GitHub
        </Link>
      </div>
    </div>
  );
}
