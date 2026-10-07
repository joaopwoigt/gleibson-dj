// Domain types for the site content (Perfil B — playbook §7.1: config/ is the
// domain layer). Types in English (§12); on-screen strings in PT-BR live in
// content.ts.

// Mode's source of truth is lib/mode.ts (with MODES + isMode). Re-exported here
// so sections can import content types + Mode from one place — not redefined.
import type { Mode } from "@/lib/mode";
export type { Mode };

/** The editorial block shown for the active mode (kicker, headline, 0+ paragraphs, quote card). */
export type ModeBlock = {
  kicker: string;
  headline: string;
  paragraphs: string[];
  quote: string;
  bullets: string[];
};

/** The hero photo for one mode. `position` is the CSS object-position of the crop. */
export type HeroPhoto = {
  src: string;
  alt: string;
  position: string;
};

/** One step of the "Como funciona" process. */
export type Step = {
  number: string;
  title: string;
  body: string;
};
