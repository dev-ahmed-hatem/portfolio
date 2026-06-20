"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Home, Mail, Moon, Radio, Sun, User } from "lucide-react";
import { cn } from "@/lib/cn";
import { BrandMark } from "./BrandMark";
import { useTheme } from "./ThemeProvider";

const routes = [
  { href: "/", label: "Home", icon: Home },
  { href: "/work", label: "Work", icon: Briefcase },
  { href: "/about", label: "About", icon: User },
  { href: "/now", label: "Now", icon: Radio },
  { href: "/contact", label: "Contact", icon: Mail },
];

const isActive = (href: string, pathname: string | null) =>
  href === "/" ? pathname === "/" : Boolean(pathname?.startsWith(href));

export function Nav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <>
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
            const active = isActive(r.href, pathname);
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

      {/* Mobile-only floating nav — the active tab expands to its label with an
          accent glow; the rest stay icon-only. Thumb-reachable, app-style. */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4 sm:hidden"
      >
        <ul className="flex items-center gap-1 rounded-full border border-border-subtle/70 bg-canvas/80 p-1.5 shadow-[var(--nav-shadow)] backdrop-blur-xl">
          {routes.map((r) => {
            const active = isActive(r.href, pathname);
            const Icon = r.icon;
            return (
              <li key={r.href}>
                <Link
                  href={r.href}
                  aria-label={r.label}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full text-sm transition-all duration-300 ease-[var(--ease-emphasized)]",
                    active
                      ? "bg-accent/15 px-4 py-2 text-accent shadow-[0_0_16px_-2px_var(--accent-primary-soft)]"
                      : "px-3 py-2 text-muted active:scale-95 active:text-fg",
                  )}
                >
                  <Icon
                    size={18}
                    className={
                      active
                        ? "drop-shadow-[0_0_6px_var(--accent-primary-soft)]"
                        : ""
                    }
                  />
                  {active ? (
                    <span className="font-medium">{r.label}</span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
