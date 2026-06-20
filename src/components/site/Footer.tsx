import Link from "next/link";
import type { ComponentType } from "react";
import { FileText, Mail } from "lucide-react";
import { TechIcon } from "@/components/icons/TechIcon";

const GithubIcon = (props: { size?: number }) => (
  <TechIcon name="github" size={props.size} />
);

const links: {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
  external: boolean;
}[] = [
  { href: "mailto:helal@187n.ai", label: "Email", icon: Mail, external: false },
  {
    href: "https://github.com/dev-ahmed-hatem",
    label: "GitHub",
    icon: GithubIcon,
    external: true,
  },
  { href: "/cv/Ahmed_Hatem_CV.pdf", label: "CV", icon: FileText, external: true },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border-subtle/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="inline-block size-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent-primary)]" />
            Ahmed Hatem Helal
          </p>
          <p>Full-stack developer. Cairo, Egypt.</p>
        </div>
        <nav aria-label="External links" className="flex flex-wrap gap-2">
          {links.map(({ href, label, icon: Icon, external }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors hover:bg-elevated/60 hover:text-fg"
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
