import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cx } from "@/lib/cx";

/**
 * Button — primary CTA of the site ("Falar no WhatsApp") plus secondary/ghost
 * links. View component (playbook §10): renders props only, no state, no fetch.
 *
 * Styled exclusively with semantic tokens so it works in both modes
 * ([data-mode="eventos"|"balada"]) without a single conditional — the tokens
 * swap the color/glow at the point of use. Source: design-system/components.md §1.
 *
 * Polymorphic: pass `href` to render an <a> (links: wa.me, Instagram, anchors);
 * omit it to render a <button>. This keeps it a shared component (usable from
 * server or client) with no "use client" directive.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type AnchorProps = BaseProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

type NativeButtonProps = BaseProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = AnchorProps | NativeButtonProps;

// Shared across every variant: layout, motion and an accessible focus ring.
// Cantos vivos (0px) come from the design system radius tokens; no box-shadow.
const base =
  "inline-flex items-center justify-center font-body " +
  "transition-colors duration-200 ease-command " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "active:opacity-90";

const variants: Record<ButtonVariant, string> = {
  // Solid on the mode accent; text = on-accent (white in Eventos, ink in Balada).
  // shadow-glow is `none` in Eventos and a purple glow in Balada — token-driven.
  primary:
    "gap-2 font-bold px-6 py-3 border-2 bg-accent text-on-accent border-accent " +
    "shadow-glow hover:bg-accent-emphasis hover:border-accent-emphasis",
  // Outline: accent border + accent text, fills on hover.
  secondary:
    "gap-2 font-bold px-6 py-3 border-2 bg-transparent text-accent border-accent " +
    "hover:bg-accent hover:text-on-accent",
  // Ghost: text with an underline that grows in on hover. For secondary links.
  ghost:
    "gap-1 font-semibold text-fg border-b-2 border-transparent hover:border-accent",
};

export function Button({
  variant = "primary",
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = cx(base, variants[variant], className);

  if (typeof rest.href === "string") {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={cx(classes, "disabled:opacity-50 disabled:pointer-events-none")}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
