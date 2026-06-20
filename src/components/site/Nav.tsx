"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { BrandMark } from "./BrandMark";
import { useTheme } from "./ThemeProvider";

const routes = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle/60 bg-canvas/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Ahmed Helal — home"
          className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-fg"
        >
          <BrandMark className="size-7 text-accent drop-shadow-[0_0_10px_var(--accent-primary-soft)] transition-transform duration-300 ease-[var(--ease-emphasized)] group-hover:scale-105" />
          Ahmed Helal
        </Link>

        <ul className="hidden items-center gap-1 sm:flex">
          {routes.map((r) => {
            const active =
              r.href === "/" ? pathname === "/" : pathname?.startsWith(r.href);
            return (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "text-fg"
                      : "text-muted hover:bg-elevated/60 hover:text-fg",
                  )}
                >
                  {r.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="rounded-md p-2 text-muted transition-colors hover:bg-elevated/60 hover:text-fg"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            aria-label="Open command menu"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-command-palette"))
            }
            className="hidden items-center gap-1 rounded-md border border-border-subtle/80 bg-elevated/50 px-1.5 py-1 font-mono text-[10px] text-muted transition-colors hover:border-accent/50 hover:text-fg sm:inline-flex"
          >
            <span>⌘</span>K
          </button>
        </div>
      </nav>
    </header>
  );
}
