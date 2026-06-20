import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects, type ProjectCategory } from "@/lib/projects";
import { ProjectIcon } from "@/components/icons/ProjectIcon";
import { TerminalBuildLog } from "@/components/site/TerminalBuildLog";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects — full case studies for each, with architecture, decisions, and outcomes.",
};

const categories: (ProjectCategory | "All")[] = [
  "All",
  "Web",
  "Mobile",
  "Desktop",
  "AI",
];

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const projects = getAllProjects();
  const active = (category ?? "All") as ProjectCategory | "All";
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 sm:pt-20">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Selected work
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Things I&apos;ve built
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Each project is a full narrative — problem, architecture, decisions,
          outcome. No live demos: the code is either sensitive or
          customer-hosted, so the story is the demo.
        </p>
      </header>

      <nav aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => {
          const isActive = active === c;
          const href = c === "All" ? "/work" : `/work?category=${c}`;
          return (
            <Link
              key={c}
              href={href}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                isActive
                  ? "border-accent bg-accent-soft text-fg"
                  : "border-border-subtle/80 text-muted hover:border-accent/60 hover:text-fg",
              )}
            >
              {c}
            </Link>
          );
        })}
      </nav>

      {filtered.length === 0 ? (
        <p className="text-muted">No projects in this category yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group block h-full rounded-lg border border-border-subtle/70 bg-surface p-6 transition-colors hover:border-accent/60 hover:bg-elevated"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border-subtle/70 bg-elevated/50 text-accent transition-colors group-hover:border-accent/50">
                      <ProjectIcon name={p.icon} size={16} />
                    </span>
                    <h2 className="font-display text-xl font-semibold tracking-tight text-fg">
                      {p.title}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-muted">{p.year}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{p.pitch}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border-subtle/80 bg-elevated/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <section aria-label="How it ships" className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Ship log
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Every project here ends the same way — committed, type-checked, and
          deployed.
        </p>
        <div className="mt-8">
          <TerminalBuildLog />
        </div>
      </section>
    </div>
  );
}
