import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type NowDoc = {
  /** ISO date (YYYY-MM-DD) the page was last updated. */
  updated: string;
  /** MDX body. */
  body: string;
};

const NOW_FILE = path.join(process.cwd(), "content", "now.mdx");

export function getNow(): NowDoc {
  const raw = fs.readFileSync(NOW_FILE, "utf-8");
  const { data, content } = matter(raw);
  return {
    updated: typeof data.updated === "string" ? data.updated : "",
    body: content,
  };
}
