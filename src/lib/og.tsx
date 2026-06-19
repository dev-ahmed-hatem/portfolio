import { ImageResponse } from "next/og";
import {
  brandMarkDataUri,
  BRAND_GOLD,
  BRAND_GOLD_BRIGHT,
} from "@/lib/brand";

/**
 * Shared Open Graph / Twitter card renderer (1200×630). Used by the root
 * card and every per–case-study card so social previews stay on-brand:
 * a black-and-gold canvas, the brand mark + wordmark, an eyebrow, a large
 * title and a supporting line.
 *
 * No custom fonts are loaded — next/og's built-in font keeps generation
 * robust and dependency-free.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT =
  "Ahmed Hatem Helal — full-stack developer building cross-platform AI products";

const INK = "#0a0907";
const FG = "#f1ebdc";
const MUTED = "#a89e89";

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  const markSrc = brandMarkDataUri({ size: 64 });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: `linear-gradient(135deg, ${INK} 0%, #15120c 55%, #1e1a12 100%)`,
          color: FG,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* warm gold glow, top-right */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 620,
            display: "flex",
            background:
              "radial-gradient(circle, rgba(203,163,78,0.30), rgba(203,163,78,0) 70%)",
          }}
        />

        {/* brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={56} height={56} alt="" />
          <span
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: BRAND_GOLD,
            }}
          >
            Ahmed Hatem Helal
          </span>
        </div>

        {/* headline block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {eyebrow ? (
            <span
              style={{
                fontSize: 24,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: BRAND_GOLD_BRIGHT,
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          <span
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            {title}
          </span>
          {subtitle ? (
            <span
              style={{
                fontSize: 30,
                lineHeight: 1.4,
                color: MUTED,
                maxWidth: 920,
              }}
            >
              {subtitle}
            </span>
          ) : null}
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{ width: 52, height: 4, borderRadius: 4, display: "flex", background: BRAND_GOLD }}
          />
          <span style={{ fontSize: 24, color: MUTED }}>ahmedhelal.dev</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
