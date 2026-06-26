import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectCategory = "Web" | "Mobile" | "Desktop" | "AI";
export type ProjectStatus = "shipping" | "in-progress" | "archived";

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  pitch: string;
  year: number;
  role: string;
  stack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  cover?: string;
  gallery?: string[];
  github?: string;
  /** Live/production URL for the project, shown on the case-study header. */
  link?: string;
  featured?: boolean;
  /** Lucide icon name for the card/bento glyph (see ProjectIcon registry). */
  icon?: string;
  /** Path under /public to a real brand logo, shown on the case-study header. */
  logo?: string;
};

export type Project = ProjectFrontmatter & {
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function readProject(filename: string): Project {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...(data as ProjectFrontmatter),
    body: content,
    slug: data.slug ?? filename.replace(/\.mdx?$/, ""),
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(readProject)
    .sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): Project | null {
  const all = getAllProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}
