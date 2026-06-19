import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case study — Ahmed Hatem Helal";

// Prerender a card for each known case study at build time.
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return renderOgImage({ eyebrow: "Case study", title: "Work" });
  }

  return renderOgImage({
    eyebrow: `${project.category} · ${project.year}`,
    title: project.title,
    subtitle: project.pitch,
  });
}
