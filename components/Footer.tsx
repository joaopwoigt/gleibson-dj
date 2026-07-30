import { Button } from "@/components/ui/Button";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappUrl } from "@/lib/contact";

/**
 * Footer — the brand's constant dark anchor (layouts.md: Preto-Tinta fixo).
 *
 * `data-mode="balada"` pins the dark theme inside the footer regardless of the
 * page mode, so every semantic token (and the reused Button) resolves to the
 * dark values here — the footer never flips with the mode switch.
 */
export function Footer() {
  return (
    <footer
      data-mode="balada"
      className="mt-auto border-t-2 border-line bg-bg py-12 text-fg"
    >
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center">
        <span className="font-display text-xl font-bold text-fg">
          No comando do seu momento.
        </span>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-label uppercase tracking-[0.16em] text-fg-2 transition-colors duration-200 ease-command hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {INSTAGRAM_HANDLE}
          </a>
          <Button href={whatsappUrl()}>Falar no WhatsApp</Button>
        </div>
      </div>
    </footer>
  );
}
