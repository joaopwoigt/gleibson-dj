import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Kicker / Badge — technical label in IBM Plex Mono that organizes sections and
 * tags. View component (playbook §10): props only, no state.
 *
 * Always UPPERCASE with wide tracking (the `text-label` token already carries
 * letter-spacing 0.16em; kept explicit here to mirror the design system).
 * Source: design-system/components.md §5.
 *
 * - tone="accent" (default): section kicker (e.g. "02 · Portfólio").
 * - tone="muted": secondary label in fg-2.
 * - bordered: badge style (galeria tag/filtro) with a 1px line box.
 */
export type KickerTone = "accent" | "muted";

export type KickerProps = {
  children: ReactNode;
  tone?: KickerTone;
  bordered?: boolean;
  /** Rendered element. Defaults to <span>. */
  as?: ElementType;
  className?: string;
};

const tones: Record<KickerTone, string> = {
  accent: "text-accent",
  muted: "text-fg-2",
};

export function Kicker({
  children,
  tone = "accent",
  bordered = false,
  as: Tag = "span",
  className,
}: KickerProps) {
  return (
    <Tag
      className={cx(
        "font-mono text-label uppercase tracking-[0.16em]",
        tones[tone],
        bordered && "inline-block border border-line px-2 py-1",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
