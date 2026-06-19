/**
 * Single source of truth for the Ahmed Helal brand mark.
 *
 * The mark is an "AH" ligature: two vertical posts (the H) bridged by an
 * upward peak (the apex of the A), with a small gold "spark" floating above —
 * echoing the gold particle-glow motif from the portrait/hero. It reads as the
 * initials and as a sign of building / ascending.
 *
 * Geometry lives here once and is consumed by:
 *   - app/icon.svg            (static favicon — kept byte-identical to brandGlyph)
 *   - components/BrandMark    (theme-aware inline SVG for the navbar)
 *   - app/.../opengraph-image + apple-icon  (rasterised via next/og <img>)
 *
 * Colors are the brand golds drawn from the locked black-and-gold palette.
 * As brand-logo assets they're allowed to carry literal hex (the palette rule
 * exempts logos), but these values intentionally match the design tokens.
 */
export const BRAND_GOLD = "#cba34e"; // --accent-primary (dark)
export const BRAND_GOLD_BRIGHT = "#e4ba60"; // --accent-warm (dark)
export const BRAND_INK = "#0a0907"; // --bg-canvas (dark)

/** The bare glyph (posts + peak + spark), colorable. viewBox is 0 0 64 64. */
export function brandGlyph({
  stroke,
  dot,
  strokeWidth = 6.5,
}: {
  stroke: string;
  dot: string;
  strokeWidth?: number;
}): string {
  return (
    `<g fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M20 19 V49"/>` +
    `<path d="M44 19 V49"/>` +
    `<path d="M20 38 L32 28 L44 38"/>` +
    `</g>` +
    `<circle cx="32" cy="14" r="3.4" fill="${dot}"/>`
  );
}

/** A complete, self-contained SVG string for the mark, optionally on a tile. */
export function brandMarkSvg({
  stroke = BRAND_GOLD,
  dot = BRAND_GOLD_BRIGHT,
  tile,
  border,
  size = 64,
}: {
  stroke?: string;
  dot?: string;
  tile?: string;
  border?: string;
  size?: number;
} = {}): string {
  const tileEl = tile
    ? `<rect x="1.5" y="1.5" width="61" height="61" rx="16" fill="${tile}"` +
      (border ? ` stroke="${border}" stroke-width="1.5"` : "") +
      `/>`
    : "";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">` +
    tileEl +
    brandGlyph({ stroke, dot }) +
    `</svg>`
  );
}

/** Base64 data URI of the mark — for use as an <img src> inside next/og. */
export function brandMarkDataUri(opts: Parameters<typeof brandMarkSvg>[0] = {}): string {
  const svg = brandMarkSvg(opts);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
