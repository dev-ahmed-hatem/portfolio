const skills = [
  "Python",
  "Django",
  "DRF",
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind",
  "Flutter",
  "Qt",
  "FastAPI",
  "Postgres",
  "Electron",
  "Vite",
  "PyInstaller",
  "Ollama",
];

export function SkillsMarquee() {
  return (
    <section
      aria-label="Skills"
      className="group relative overflow-hidden border-y border-border-subtle/60 py-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent" />
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-12 group-hover:[animation-play-state:paused]">
        {[...skills, ...skills].map((skill, i) => (
          <span
            key={i}
            className="font-mono text-sm uppercase tracking-widest text-muted"
          >
            {skill}
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
