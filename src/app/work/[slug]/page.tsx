import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { ArrowLeft, Code, ExternalLink } from "lucide-react";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects";
import { ProjectIcon } from "@/components/icons/ProjectIcon";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.pitch,
  };
}

const statusLabel: Record<string, string> = {
  shipping: "Shipping",
  "in-progress": "In progress",
  archived: "Archived",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === project.slug);
  const next = all[idx + 1] ?? all[0];

  return (
    <article className="mx-auto max-w-6xl px-6 pt-12 pb-16 sm:pt-16">
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft size={14} />
        All work
      </Link>

      <header className="mt-10 border-b border-border-subtle/60 pb-12">
        {project.logo ? (
          <div className="mb-6 flex h-12 w-fit items-center rounded-lg border border-border-subtle/70 bg-surface px-4">
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              width={200}
              height={40}
              className="h-7 w-auto object-contain"
            />
          </div>
        ) : (
          <span className="mb-6 inline-grid size-12 place-items-center rounded-lg border border-border-subtle/70 bg-elevated/50 text-accent">
            <ProjectIcon name={project.icon} size={24} />
          </span>
        )}
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          {project.category} · {project.year}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] text-fg sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.pitch}</p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[18rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="space-y-6 text-sm">
            <Spec label="Role" value={project.role} />
            <Spec label="Year" value={String(project.year)} />
            <Spec label="Status" value={statusLabel[project.status] ?? project.status} />
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Stack
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle/80 bg-elevated/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
            {project.link ? (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Live
                </dt>
                <dd className="mt-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex h-11 items-center gap-2 rounded-md bg-warm px-5 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5"
                  >
                    <ExternalLink size={15} />
                    Visit site
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </dd>
              </div>
            ) : null}
            {project.github ? (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Source
                </dt>
                <dd className="mt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-fg hover:text-accent"
                  >
                    <Code size={14} />
                    GitHub
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </aside>

        <div className="prose prose-invert max-w-none">
          <MDXRemote source={project.body} />
        </div>
      </div>

      {next && next.slug !== project.slug ? (
        <nav
          aria-label="Next project"
          className="mt-24 border-t border-border-subtle/60 pt-8"
        >
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-lg border border-border-subtle/70 bg-surface p-6 transition-colors hover:border-accent/60 hover:bg-elevated"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Next case study
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-fg">
                {next.title}
              </p>
            </div>
            <span className="text-muted transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-fg">{value}</dd>
    </div>
  );
}
