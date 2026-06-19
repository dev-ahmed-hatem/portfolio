/**
 * The Ahmed Helal brand mark as a theme-aware inline SVG (for the navbar and
 * anywhere in the app UI). Strokes inherit `currentColor` so callers tint it
 * with a text-color utility (e.g. `text-accent`); the spark uses the warm gold
 * token so it stays consistent across light/dark themes.
 *
 * Geometry mirrors `brandGlyph` in `@/lib/brand` (kept in sync by hand — it's
 * only three paths and a dot).
 */
export function BrandMark({
  className,
  title = "Ahmed Helal",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth={6.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 19 V49" />
        <path d="M44 19 V49" />
        <path d="M20 38 L32 28 L44 38" />
      </g>
      <circle cx="32" cy="14" r="3.4" style={{ fill: "var(--accent-warm)" }} />
    </svg>
  );
}
