/**
 * The site has two modes, one command (brand-book §4.1): Eventos (light, sober)
 * and Balada (dark, energetic). The active mode lives in `data-mode` on <html>
 * and every color/glow swaps via CSS vars. This module is the single source of
 * truth for the mode type and its validation.
 */
export const MODES = ["eventos", "balada"] as const;

export type Mode = (typeof MODES)[number];

/** Type guard: true only for a valid mode string (e.g. a `?modo=` param). */
export function isMode(value: unknown): value is Mode {
  return typeof value === "string" && (MODES as readonly string[]).includes(value);
}
