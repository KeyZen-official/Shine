import {
  Award,
  BookOpen,
  Briefcase,
  Calculator,
  ClipboardCheck,
  Cog,
  Compass,
  ConciergeBell,
  Cpu,
  FileText,
  FlaskConical,
  FolderCheck,
  GraduationCap,
  HeartPulse,
  ListChecks,
  Luggage,
  MessagesSquare,
  Palette,
  Plane,
  Radio,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

/**
 * Icons are referenced by name in the database, so the set a content
 * editor can choose from is this allow-list — not an arbitrary string that
 * renders as nothing.
 */
const REGISTRY = {
  Award,
  BookOpen,
  Briefcase,
  Calculator,
  ClipboardCheck,
  Cog,
  Compass,
  ConciergeBell,
  Cpu,
  FileText,
  FlaskConical,
  FolderCheck,
  GraduationCap,
  HeartPulse,
  ListChecks,
  Luggage,
  MessagesSquare,
  Palette,
  Plane,
  Radio,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
};

/* `ICON_NAMES` populated an icon picker in the admin panel's service form.
   With the panel gone, an icon is chosen by typing its name into
   `content/services.json`, and an unrecognised name falls back to the
   default rather than breaking the page. */

export function Icon({ name, className = 'h-5 w-5', fallback = Sparkles }) {
  const Component = REGISTRY[name] ?? fallback;
  return <Component className={className} aria-hidden="true" />;
}
