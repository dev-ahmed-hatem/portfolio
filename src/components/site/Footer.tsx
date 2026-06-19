import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border-subtle/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Ahmed Hatem Helal
          </p>
          <p>Full-stack developer. Cairo, Egypt.</p>
        </div>
        <nav aria-label="External links" className="flex flex-wrap gap-5">
          <Link
            href="mailto:helal@187n.ai"
            className="transition-colors hover:text-fg"
          >
            Email
          </Link>
          <Link
            href="https://github.com/dev-ahmed-hatem"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-fg"
          >
            GitHub
          </Link>
          <Link
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-fg"
          >
            CV
          </Link>
        </nav>
      </div>
    </footer>
  );
}
