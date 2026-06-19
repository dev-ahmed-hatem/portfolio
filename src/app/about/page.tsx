import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Mail, MapPin } from "lucide-react";
import { TechIcon, type TechName } from "@/components/icons/TechIcon";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ahmed Hatem Helal — full-stack developer based in Cairo, building cross-platform AI products.",
};

type Skill = { label: string; icon?: TechName };

const skillGroups: { heading: string; items: Skill[] }[] = [
  {
    heading: "Backend",
    items: [
      { label: "Python", icon: "python" },
      { label: "Django", icon: "django" },
      { label: "DRF" },
      { label: "FastAPI", icon: "fastapi" },
      { label: "PostgreSQL", icon: "postgres" },
    ],
  },
  {
    heading: "Frontend",
    items: [
      { label: "Next.js", icon: "nextjs" },
      { label: "React", icon: "react" },
      { label: "Redux", icon: "redux" },
      { label: "TypeScript", icon: "typescript" },
      { label: "JavaScript", icon: "javascript" },
      { label: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    heading: "Cross-platform",
    items: [
      { label: "Flutter", icon: "flutter" },
      { label: "Qt", icon: "qt" },
      { label: "Electron", icon: "electron" },
      { label: "Vite", icon: "vite" },
    ],
  },
  {
    heading: "DevOps & infra",
    items: [
      { label: "Docker", icon: "docker" },
      { label: "Nginx", icon: "nginx" },
    ],
  },
  {
    heading: "AI & tooling",
    items: [
      { label: "Ollama", icon: "ollama" },
      { label: "Local LLMs" },
      { label: "PyInstaller" },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
        About
      </p>

      <div className="mt-6 grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-12">
        <div className="relative mx-auto w-44 shrink-0 sm:mx-0 sm:w-52">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at center, var(--accent-primary-soft), transparent 70%)",
            }}
          />
          <div className="overflow-hidden rounded-2xl border border-border-subtle/80 bg-surface shadow-[0_18px_60px_-18px_rgba(0,0,0,0.7)]">
            <Image
              src="/portrait.jpg"
              alt="Ahmed Hatem Helal — portrait"
              width={1080}
              height={1080}
              sizes="(max-width: 640px) 11rem, 13rem"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Ahmed Hatem Helal
          </h1>
          <p className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <MapPin size={13} />
            Cairo, Egypt
          </p>
          <p className="mt-6 text-lg text-muted">
            Full-stack developer building cross-platform AI products — desktop,
            mobile, and web — most often with Python or TypeScript on both ends
            of the stack. I care about products that ship: clean architecture,
            considered UX, and the kind of polish that survives real users.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-warm px-4 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5"
            >
              <Download size={15} />
              Download CV
            </Link>
            <Link
              href="https://github.com/dev-ahmed-hatem"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border-subtle/80 px-4 text-sm font-medium text-fg transition-colors hover:bg-elevated/60"
            >
              <TechIcon name="github" size={15} />
              GitHub
            </Link>
            <Link
              href="mailto:helal@187n.ai"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border-subtle/80 px-4 text-sm font-medium text-fg transition-colors hover:bg-elevated/60"
            >
              <Mail size={15} />
              Email
            </Link>
          </div>
        </div>
      </div>

      <section aria-label="Skills" className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Stack
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.heading}
              className="rounded-lg border border-border-subtle/70 bg-surface p-5"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {group.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((skill) => (
                  <li
                    key={skill.label}
                    className="flex items-center gap-2.5 text-sm text-fg"
                  >
                    {skill.icon ? (
                      <TechIcon name={skill.icon} size={16} brand />
                    ) : (
                      <span className="inline-block size-1.5 rounded-full bg-accent/70" />
                    )}
                    {skill.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-16 font-mono text-xs uppercase tracking-widest text-muted">
        Story, timeline, and full skills matrix expand in Sprint 2.
      </p>
    </div>
  );
}
