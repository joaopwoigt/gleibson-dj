// Domain types for the site content (Perfil B — playbook §7.1: config/ is the
// domain layer). Types in English (§12); on-screen strings in PT-BR live in
// content.ts.

// Mode's source of truth is lib/mode.ts (with MODES + isMode). Re-exported here
// so sections can import content types + Mode from one place — not redefined.
import type { Mode } from "@/lib/mode";
export type { Mode };

/** A portfolio photo, tagged with the mode it belongs to (Eventos/Balada). */
export type GalleryPhoto = {
  src: string;
  alt: string;
  mode: Mode;
};

/** A portfolio video: standardized on YouTube (facade), Instagram link as fallback. */
export type GalleryVideo = {
  title: string;
  mode: Mode;
  youtubeId?: string;
  instagramUrl?: string;
};

/** Social proof. `mode` optional: a testimonial can be cross-mode. */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  mode?: Mode;
};

/** The editorial block shown for the active mode (kicker + headline + body + bullets). */
export type ModeContent = {
  kicker: string;
  headline: string;
  body: string;
  bullets: string[];
};
