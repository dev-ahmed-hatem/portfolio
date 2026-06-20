import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { BentoCard } from "@/components/site/BentoCard";
import { GlowOrb } from "@/components/site/GlowOrb";
import { SkillsMarquee } from "@/components/site/SkillsMarquee";
import { Reveal } from "@/components/site/Reveal";
import { Magnetic } from "@/components/site/Magnetic";
import { TechIcon } from "@/components/icons/TechIcon";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <GlowOrb className="pointer-events-none absolute left-1/2 top-[-10rem] -z-10 size-[40rem] -translate-x-1/2 rounded-full" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <p className="hero-rise hero-d1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              <span className="inline-block size-1.5 rounded-full bg-ok shadow-[0_0_8px_var(--status-ok)]" />
              Cairo · Available for select work
            </p>
            <h1 className="hero-rise hero-d2 mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-fg sm:text-6xl">
              Full-stack developer building{" "}
              <span className="text-accent">cross-platform AI products</span>.
            </h1>
            <p className="hero-rise hero-d3 mt-6 max-w-xl text-base text-muted sm:text-lg">
              I ship desktop, mobile, and web — from Python and FastAPI backends
              to React, Flutter, and Qt front-ends. Currently focused on
              local-LLM tooling and marketplace platforms.
            </p>
            <div className="hero-rise hero-d4 mt-10 flex flex-wrap items-center gap-3">
              <Magnetic className="inline-flex">
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
              </Magnetic>
              <Magnetic className="inline-flex">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-border-subtle/80 px-5 text-sm font-medium text-fg transition-colors hover:bg-elevated/60"
                >
                  <Mail size={16} />
                  Get in touch
                </Link>
              </Magnetic>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[22rem] lg:ml-auto lg:max-w-none">
            <div
              aria-hidden
              className="hero-glow absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 40%, var(--accent-primary-soft), transparent 70%), radial-gradient(50% 50% at 70% 80%, color-mix(in oklab, var(--accent-warm) 30%, transparent), transparent 70%)",
              }}
            />
            {/* quiet gold motes — fade in once around the portrait, then hold */}
            <div aria-hidden className="pointer-events-none absolute -inset-8 -z-[5]">
              {[
                { top: "6%", left: "-2%", size: 4, o: 0.55, d: "0.7s" },
                { top: "22%", left: "98%", size: 3, o: 0.4, d: "0.95s" },
                { top: "84%", left: "4%", size: 3, o: 0.45, d: "1.1s" },
                { top: "70%", left: "100%", size: 5, o: 0.5, d: "0.85s" },
                { top: "48%", left: "-4%", size: 2, o: 0.35, d: "1.25s" },
                { top: "94%", left: "62%", size: 3, o: 0.4, d: "1.0s" },
              ].map((m, i) => (
                <span
                  key={i}
                  className="hero-mote absolute rounded-full bg-warm"
                  style={{
                    top: m.top,
                    left: m.left,
                    width: m.size,
                    height: m.size,
                    boxShadow: "0 0 8px 1px color-mix(in oklab, var(--accent-warm) 60%, transparent)",
                    ["--mote-o" as string]: m.o,
                    animationDelay: m.d,
                  }}
                />
              ))}
            </div>
            <div className="hero-portrait group relative overflow-hidden rounded-2xl border border-border-subtle/80 bg-surface shadow-[0_24px_80px_-20px_rgba(0,0,0,0.7)]">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-1 ring-inset ring-fg/5" />
              <Image
                src="/portrait.jpg"
                alt="Ahmed Hatem Helal — portrait"
                width={1080}
                height={1080}
                priority
                sizes="(max-width: 1024px) 22rem, 30rem"
                className="h-auto w-full transition-transform duration-500 ease-[var(--ease-emphasized)] group-hover:scale-[1.02]"
              />
              {/* one-shot gold light-sweep across the portrait */}
              <span
                aria-hidden
                className="hero-sweep pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3"
                style={{
                  background:
                    "linear-gradient(100deg, transparent, color-mix(in oklab, var(--accent-warm) 45%, transparent), transparent)",
                }}
              />
              <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between rounded-lg border border-border-subtle/60 bg-canvas/70 px-3 py-2 backdrop-blur-md">
                <span className="font-mono text-[11px] uppercase tracking-widest text-fg">
                  Ahmed Hatem Helal
                </span>
                <span className="flex items-center gap-1.5 text-muted">
                  <TechIcon name="python" size={14} brand />
                  <TechIcon name="typescript" size={14} brand />
                  <TechIcon name="flutter" size={14} brand />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Featured work"
        className="mx-auto max-w-6xl px-6 pb-16"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-[repeat(2,minmax(0,1fr))] sm:gap-5">
          <Reveal className="sm:col-span-2 sm:row-span-2" delay={0}>
            <Magnetic className="block h-full" strength={0.12} max={6}>
              <BentoCard
                href="/work/lucy"
                tone="spotlight"
                title="Lucy"
                pitch="A local-first LLM coding agent. Electron + FastAPI, with a 7-step setup wizard that gets Qwen2.5-Coder running on a fresh machine in under five minutes."
                stack={["Electron", "FastAPI", "React", "Vite", "Ollama"]}
              />
            </Magnetic>
          </Reveal>

          <Reveal className="sm:row-span-2" delay={80}>
            <Magnetic className="block h-full" strength={0.12} max={6}>
              <BentoCard
                href="/work/easybela"
                title="EasyBela"
                pitch="Bilingual multi-merchant marketplace for Egypt. Django + DRF backbone, Next.js storefront, Flutter mobile."
                stack={["Django", "DRF", "Next.js", "Flutter"]}
              />
            </Magnetic>
          </Reveal>

          <Reveal delay={160}>
            <Magnetic className="block h-full" strength={0.12} max={6}>
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
            </Magnetic>
          </Reveal>

          <Reveal delay={240}>
            <Magnetic className="block h-full" strength={0.12} max={6}>
              <BentoCard
                href="/work/ecommerce"
                title="E-Commerce SaaS"
                pitch="Tiered storefront platform — Lite, Pro, Enterprise. Django 5 + DRF, Next.js App Router, bilingual."
                stack={["Django 5", "Next.js", "DRF"]}
              />
            </Magnetic>
          </Reveal>

          <Reveal delay={320}>
            <Magnetic className="block h-full" strength={0.12} max={6}>
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
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <SkillsMarquee />

      <Reveal>
        <section className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Want to build something together?
          </h2>
          <p className="mt-4 text-muted">
            I&apos;m open to ambitious projects — AI product work, full-stack
            builds, or anything that needs to ship across platforms.
          </p>
          <Magnetic className="mt-8 inline-flex">
            <Link
              href="mailto:helal@187n.ai"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-warm px-5 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5"
            >
              <Mail size={16} />
              Email me
            </Link>
          </Magnetic>
        </section>
      </Reveal>
    </>
  );
}
