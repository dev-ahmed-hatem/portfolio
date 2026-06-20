import {
  Bot,
  Sparkles,
  Store,
  ShoppingCart,
  ShoppingBag,
  Sprout,
  QrCode,
  ClipboardList,
  GraduationCap,
  Trophy,
  Dumbbell,
  DoorOpen,
  Boxes,
  Download,
  Users,
  HeartHandshake,
  Building2,
  CalendarCheck,
  ShieldCheck,
  FolderGit2,
  type LucideIcon,
} from "lucide-react";

/** Registry of lucide glyphs referenced by `icon` in project frontmatter. */
const REGISTRY: Record<string, LucideIcon> = {
  bot: Bot,
  sparkles: Sparkles,
  store: Store,
  "shopping-cart": ShoppingCart,
  "shopping-bag": ShoppingBag,
  sprout: Sprout,
  "qr-code": QrCode,
  "clipboard-list": ClipboardList,
  "graduation-cap": GraduationCap,
  trophy: Trophy,
  dumbbell: Dumbbell,
  "door-open": DoorOpen,
  boxes: Boxes,
  download: Download,
  users: Users,
  "heart-handshake": HeartHandshake,
  "building-2": Building2,
  "calendar-check": CalendarCheck,
  "shield-check": ShieldCheck,
};

/**
 * Renders a project's lucide glyph by name. Falls back to a neutral folder
 * glyph if the name isn't in the registry, so a card never renders empty.
 */
export function ProjectIcon({
  name,
  size = 18,
  className,
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  const Icon = (name && REGISTRY[name]) || FolderGit2;
  return <Icon size={size} className={className} aria-hidden />;
}
