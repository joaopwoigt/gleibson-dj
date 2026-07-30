/**
 * Minimal className joiner. Filters out falsy values so callers can inline
 * conditionals: cx("base", isActive && "active", className).
 * No dependency needed — keeps the View components framework-light.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
