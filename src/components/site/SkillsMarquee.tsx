import { TechIcon, type TechName } from "@/components/icons/TechIcon";

const skills: { name: TechName; label: string }[] = [
  { name: "python", label: "Python" },
  { name: "django", label: "Django" },
  { name: "fastapi", label: "FastAPI" },
  { name: "postgres", label: "Postgres" },
  { name: "nextjs", label: "Next.js" },
  { name: "typescript", label: "TypeScript" },
  { name: "react", label: "React" },
  { name: "tailwind", label: "Tailwind" },
  { name: "flutter", label: "Flutter" },
  { name: "qt", label: "Qt" },
  { name: "electron", label: "Electron" },
  { name: "vite", label: "Vite" },
  { name: "ollama", label: "Ollama" },
];

export function SkillsMarquee() {
  return (
    <section
      aria-label="Skills"
      className="group relative overflow-hidden border-y border-border-subtle/60 py-7"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent" />
      <div className="flex w-max animate-[marquee_45s_linear_infinite] gap-10 group-hover:[animation-play-state:paused]">
        {[...skills, ...skills].map((skill, i) => (
          <span key={i} className="flex items-center gap-2.5 whitespace-nowrap">
            <TechIcon name={skill.name} brand size={20} />
            <span className="font-mono text-sm uppercase tracking-widest text-muted">
              {skill.label}
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
