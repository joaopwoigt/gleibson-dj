import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ModeTabs } from "@/components/ModeTabs";
import { whatsappUrl } from "@/lib/contact";

/**
 * Header — sticky top bar: logotipo bloco + Mode Tabs + WhatsApp CTA. View component.
 *
 * Brand book v2 (2026-08-18): o wordmark "GLEIB" (GLE cheio + IB vazado) foi
 * SUBSTITUIDO pelo logotipo bloco — duas celulas dentro de um contorno unico:
 * `DJ` sobre o bloco de cor-accent + `GLEIB` sobre o fundo. Poppins 800,
 * tracking -0.03em. O contorno e PARTE do logo, nao moldura — nunca remover.
 *
 * Continua recriado em HTML (nao SVG) com a Poppins self-hosted e os tokens
 * semanticos, entao troca de cor por modo de graca: o bloco pega var(--ds-accent)
 * e o texto pega var(--ds-on-accent)/fg. O SVG embute @import ao Google Fonts,
 * o que quebraria o self-host da Task 03 e criaria divida de CSP na Task 21.
 * Fonte: design-system/components.md §7 + brand-book §4.4.
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
            className="inline-flex border-[1.5px] border-fg text-xl font-extrabold leading-none tracking-[-0.03em]"
          >
            <span className="flex items-center border-r-[1.5px] border-fg bg-accent px-[0.44em] py-[0.36em] text-on-accent">
              DJ
            </span>
            <span className="flex items-center px-[0.44em] py-[0.36em] text-fg">GLEIB</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ModeTabs />
          {/* WhatsApp oculto no mobile (<640) — layouts.md; wrapper evita conflito
              de display com o inline-flex do Button. */}
          <div className="hidden sm:block">
            <Button href={whatsappUrl()}>WhatsApp</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
