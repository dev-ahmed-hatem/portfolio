import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { BentoCard } from "@/components/site/BentoCard";
import { GlowOrb } from "@/components/site/GlowOrb";
import { SkillsMarquee } from "@/components/site/SkillsMarquee";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <GlowOrb className="pointer-events-none absolute left-1/2 top-[-10rem] -z-10 size-[40rem] -translate-x-1/2 rounded-full" />
        <div className="mx-auto max-w-6xl px-6 py-32 sm:py-40">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Cairo · Available for select work
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-fg sm:text-6xl">
            Full-stack developer building{" "}
            <span className="text-accent">cross-platform AI products</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            I ship desktop, mobile, and web — from Python and FastAPI backends
            to React, Flutter, and Qt front-ends. Currently focused on local-LLM
            tooling and marketplace platforms.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/work"
              className="group inline-flex h-11 items-center gap-2 rounded-md bg-warm px-5 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5"
            >
              See my work
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border-subtle/80 px-5 text-sm font-medium text-fg transition-colors hover:bg-elevated/60"
            >
              <Mail size={16} />
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-label="Featured work"
        className="mx-auto max-w-6xl px-6 pb-16"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-[repeat(2,minmax(0,1fr))] sm:gap-5">
          <BentoCard
            href="/work/lucy"
            tone="spotlight"
            title="Lucy"
            pitch="A local-first LLM coding agent. Electron + FastAPI, with a 7-step setup wizard that gets Qwen2.5-Coder running on a fresh machine in under five minutes."
            stack={["Electron", "FastAPI", "React", "Vite", "Ollama"]}
            className="sm:col-span-2 sm:row-span-2"
          />

          <BentoCard
            href="/work/easybela"
            title="EasyBela"
            pitch="Bilingual multi-merchant marketplace for Egypt. Django + DRF backbone, Next.js storefront, Flutter mobile."
            stack={["Django", "DRF", "Next.js", "Flutter"]}
            className="sm:row-span-2"
          />

          <BentoCard title="At a glance" tone="stat">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Platforms
                </dt>
                <dd className="mt-1 font-mono text-2xl text-fg">3</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Languages
                </dt>
                <dd className="mt-1 font-mono text-2xl text-fg">4</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Years
                </dt>
                <dd className="mt-1 font-mono text-2xl text-fg">5+</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Status
                </dt>
                <dd className="mt-1 inline-flex items-center gap-1.5 text-sm text-fg">
                  <span className="inline-block size-2 rounded-full bg-ok shadow-[0_0_8px_var(--status-ok)]" />
                  Shipping
                </dd>
              </div>
            </dl>
          </BentoCard>

          <BentoCard
            href="/work/ecommerce"
            title="E-Commerce SaaS"
            pitch="Tiered storefront platform — Lite, Pro, Enterprise. Django 5 + DRF, Next.js App Router, bilingual."
            stack={["Django 5", "Next.js", "DRF"]}
          />

          <BentoCard
            href="/now"
            title="Now"
            pitch="What I'm actively building — updated as I push."
          >
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent" />
              Live
            </div>
          </BentoCard>
        </div>
      </section>

      <SkillsMarquee />

      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Want to build something together?
        </h2>
        <p className="mt-4 text-muted">
          I&apos;m open to ambitious projects — AI product work, full-stack
          builds, or anything that needs to ship across platforms.
        </p>
        <Link
          href="mailto:helal@187n.ai"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-warm px-5 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5"
        >
          <Mail size={16} />
          Email me
        </Link>
      </section>
    </>
  );
}
