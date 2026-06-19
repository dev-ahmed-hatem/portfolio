export function GlowOrb({
  className,
  color = "var(--accent-primary)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        background: `radial-gradient(circle at center, ${color} 0%, transparent 60%)`,
        filter: "blur(80px)",
        opacity: 0.3,
        pointerEvents: "none",
      }}
    />
  );
}
