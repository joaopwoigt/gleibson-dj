import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ModeTabs } from "@/components/ModeTabs";

// WhatsApp base link — a mensagem pré-preenchida é finalizada na Task 17.
const WHATSAPP_URL = "https://wa.me/";

/**
 * Header — sticky top bar: wordmark + Mode Tabs + WhatsApp CTA. View component.
 *
 * The wordmark "GLEIB" is recreated in HTML (GLE solid + IB outlined) with the
 * self-hosted Unbounded and semantic tokens, so it swaps color per mode for free
 * (fg + var(--ds-accent) on the stroke). We deliberately do NOT use the wordmark
 * SVG here: it embeds an @import to Google Fonts, which would break the Task 03
 * self-host and add CSP debt for Task 21. Source: design-system/components.md §7.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-line bg-bg/95 backdrop-blur transition-colors duration-250 ease-command">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4">
        <Link
          href="/"
          aria-label="DJ Gleib — início"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span
            aria-hidden
            className="font-display text-xl font-extrabold tracking-[-0.01em] text-fg"
          >
            GLE
            <span style={{ WebkitTextStroke: "1.5px var(--ds-accent)", color: "transparent" }}>
              IB
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ModeTabs />
          {/* WhatsApp oculto no mobile (<640) — layouts.md; wrapper evita conflito
              de display com o inline-flex do Button. */}
          <div className="hidden sm:block">
            <Button href={WHATSAPP_URL}>WhatsApp</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
