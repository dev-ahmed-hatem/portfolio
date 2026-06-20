"use client";

import { Command } from "cmdk";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FolderGit2,
  User,
  Radio,
  Mail,
  Download,
  SunMoon,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { ProjectIcon } from "@/components/icons/ProjectIcon";
import { TechIcon } from "@/components/icons/TechIcon";

type ProjectItem = { slug: string; title: string; icon?: string };

const PAGES = [
  { href: "/", label: "Home", icon: Home },
  { href: "/work", label: "Work", icon: FolderGit2 },
  { href: "/about", label: "About", icon: User },
  { href: "/now", label: "Now", icon: Radio },
  { href: "/contact", label: "Contact", icon: Mail },
];

const EMAIL = "helal@187n.ai";
const GITHUB = "https://github.com/dev-ahmed-hatem";

/**
 * Global ⌘K / Ctrl-K command palette: jump to any page or project, or fire a
 * quick action. Opens on the shortcut or on a window `open-command-palette`
 * event (dispatched by the nav's ⌘K button).
 */
export function CommandPalette({ projects }: { projects: ProjectItem[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toggle } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    fn();
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[14vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
    >
      <div
        className="absolute inset-0 bg-canvas/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <Command
        label="Command menu"
        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted"
      >
        <Command.Input
          autoFocus
          placeholder="Search pages, projects, actions…"
          className="w-full border-b border-border-subtle bg-transparent px-4 py-3.5 text-sm text-fg outline-none placeholder:text-muted"
        />
        <Command.List className="max-h-[56vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
            No results.
          </Command.Empty>

          <Command.Group heading="Pages">
            {PAGES.map((p) => (
              <Item
                key={p.href}
                value={`page ${p.label}`}
                onSelect={() => run(() => router.push(p.href))}
              >
                <p.icon size={16} className="text-muted" />
                {p.label}
              </Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects">
            {projects.map((p) => (
              <Item
                key={p.slug}
                value={`project ${p.title}`}
                onSelect={() => run(() => router.push(`/work/${p.slug}`))}
              >
                <span className="text-accent">
                  <ProjectIcon name={p.icon} size={16} />
                </span>
                {p.title}
              </Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions">
            <Item value="action email contact" onSelect={() => run(() => { window.location.href = `mailto:${EMAIL}`; })}>
              <Mail size={16} className="text-muted" />
              Email me
            </Item>
            <Item value="action download cv resume" onSelect={() => run(() => window.open("/cv/Ahmed_Hatem_CV.pdf", "_blank"))}>
              <Download size={16} className="text-muted" />
              Download CV
            </Item>
            <Item value="action github source code" onSelect={() => run(() => window.open(GITHUB, "_blank"))}>
              <TechIcon name="github" size={16} className="text-muted" />
              View GitHub
            </Item>
            <Item value="action toggle theme dark light mode" onSelect={() => run(toggle)}>
              <SunMoon size={16} className="text-muted" />
              Toggle theme
            </Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

function Item({
  value,
  onSelect,
  children,
}: {
  value: string;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="group flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted aria-selected:bg-elevated aria-selected:text-fg"
    >
      {children}
      <ArrowRight size={13} className="ml-auto opacity-0 transition-opacity group-aria-selected:opacity-60" />
    </Command.Item>
  );
}
