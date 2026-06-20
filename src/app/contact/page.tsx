import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { TechIcon } from "@/components/icons/TechIcon";
import { ContactForm } from "@/components/site/ContactForm";
import { TechGalaxy } from "@/components/site/TechGalaxy";

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
        Have a project, a role, or an idea worth building? Send a note — or
        reach me directly.
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border-subtle/60 pt-8">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Or directly
        </span>
        <Link
          href="mailto:helal@187n.ai"
          className="inline-flex h-9 items-center gap-2 rounded-md border border-border-subtle/80 px-3.5 text-sm font-medium text-fg transition-colors hover:bg-elevated/60"
        >
          <Mail size={15} />
          helal@187n.ai
        </Link>
        <Link
          href="https://github.com/dev-ahmed-hatem"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-md border border-border-subtle/80 px-3.5 text-sm font-medium text-fg transition-colors hover:bg-elevated/60"
        >
          <TechIcon name="github" size={15} />
          GitHub
        </Link>
      </div>

      <section
        aria-label="The stack I build with"
        className="mt-20 border-t border-border-subtle/60 pt-12"
      >
        <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted">
          The stack I build with
        </p>
        <p className="mx-auto mt-3 max-w-sm text-center text-sm text-muted">
          Hover to pause and explore — every tool I reach for, in orbit.
        </p>
        <div className="mt-8">
          <TechGalaxy />
        </div>
      </section>
    </div>
  );
}
