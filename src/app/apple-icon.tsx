import { ImageResponse } from "next/og";
import { brandMarkDataUri, BRAND_INK } from "@/lib/brand";

// Apple touch icon — shown on iOS/iPadOS home screens. 180×180 is the
// recommended size; iOS applies its own corner mask, so we use a full-bleed
// dark gold-tinted background with the centered mark.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const markSrc = brandMarkDataUri({ size: 120 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${BRAND_INK} 0%, #1e1a12 100%)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={120} height={120} alt="" />
      </div>
    ),
    { ...size },
  );
}
