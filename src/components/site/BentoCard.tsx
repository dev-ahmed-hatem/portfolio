import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  href?: string;
  title: string;
  pitch?: string;
  stack?: string[];
  tone?: "spotlight" | "default" | "stat";
  className?: string;
  children?: React.ReactNode;
  external?: boolean;
  /** Small glyph (project icon) shown beside the title. */
  glyph?: React.ReactNode;
};

export function BentoCard({
  href,
  title,
  pitch,
  stack,
  tone = "default",
  className,
  children,
  external = false,
  glyph,
}: Props) {
  const inner = (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle/70 bg-surface p-6 transition-colors",
        href && "hover:border-accent/60 hover:bg-elevated",
        tone === "spotlight" && "min-h-[20rem] sm:min-h-[24rem]",
        className,
      )}
    >
      {tone === "spotlight" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, var(--accent-primary) 0%, transparent 70%)",
            filter: "blur(60px)",
            opacity: 0.4,
          }}
        />
      ) : null}

      <header className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {glyph ? (
            <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border-subtle/70 bg-elevated/50 text-accent">
              {glyph}
            </span>
          ) : null}
          <h3 className="font-display text-lg font-semibold tracking-tight text-fg sm:text-xl">
            {title}
          </h3>
        </div>
        {href ? (
          <ArrowUpRight
            size={18}
            className="text-muted transition-colors group-hover:text-fg"
          />
        ) : null}
      </header>

      {pitch ? (
        <p className="relative mt-2 text-sm text-muted">{pitch}</p>
      ) : null}

      {children ? <div className="relative mt-4 flex-1">{children}</div> : null}

      {stack && stack.length > 0 ? (
        <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-4">
          {stack.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border-subtle/80 bg-elevated/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );

  if (!href) return inner;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  );
}
