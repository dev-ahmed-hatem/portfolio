import {
  renderOgImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
  OG_ALT,
} from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Full-stack developer",
    title: "Building cross-platform AI products",
    subtitle:
      "Desktop, mobile, and web — Python & FastAPI backends to React, Flutter, and Qt front-ends.",
  });
}
