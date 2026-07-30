import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Card — content block on `surface`, separated by a border (never a diffuse
 * shadow). Base of the gallery and text blocks. View component (playbook §10):
 * props only, no state. Source: design-system/components.md §3.
 *
 * Elevation = surface + 1px line, cantos vivos (0px). When `interactive`, it
 * reacts to hover/focus: accent border plus, in Balada only, the purple glow
 * (shadow-glow is `none` in Eventos — token-driven, no conditional needed).
 */
export type CardProps = {
  children: ReactNode;
  /** Clickable card (e.g. gallery item): adds cursor + hover/focus feedback. */
  interactive?: boolean;
  /** Rendered element. Defaults to <article>. */
  as?: "article" | "div" | "figure";
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function Card({
  children,
  interactive = false,
  as: Tag = "article",
  className,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cx(
        "bg-surface border border-line p-6",
        interactive &&
          "cursor-pointer transition-colors duration-200 ease-command " +
            "hover:border-accent hover:shadow-glow focus-within:border-accent",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
