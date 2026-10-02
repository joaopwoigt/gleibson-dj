import Link from "next/link";
import { Grain } from "@/components/Grain";
import { ModeTabs } from "@/components/ModeTabs";
import { whatsappUrl } from "@/lib/contact";

/**
 * Header — barra sticky: logotipo bloco + Mode Tabs + WhatsApp. No mobile quebra
 * em duas linhas (logo + WhatsApp, depois as abas em largura total).
 *
 * Brand book v2: logotipo bloco = duas células dentro de um contorno único,
 * `DJ` sobre o bloco de accent + `GLEIB` sobre o fundo. Poppins 800, tracking
 * -0.03em. O contorno é PARTE do logo — nunca remover. Recriado em HTML (não SVG)
 * para trocar de cor por modo pelos tokens e não depender de fonte externa.
 *
 * Tem fundo opaco, então carrega a própria camada de grão (z 95 > grão da página).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-[95] border-b border-line bg-bg">
      <Grain layer="header" />
      <div className="relative z-10 mx-auto flex max-w-content flex-wrap items-center gap-x-8 gap-y-3 px-4 py-3.5 sm:px-8">
        <Link
          href="#top"
          aria-label="DJ Gleib — início"
          className="flex border-2 border-fg text-[19px] font-extrabold leading-none tracking-[-0.03em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span
            aria-hidden
            className="border-r-2 border-fg bg-accent px-[9px] pb-2 pt-[7px] text-on-accent"
          >
            DJ
          </span>
          {/* Espaço invisível no flex: o texto lido vira "DJ GLEIB", contido no
              aria-label (WCAG 2.5.3, label-in-name). */}{" "}
          <span aria-hidden className="px-[11px] pb-2 pt-[7px] text-fg">
            GLEIB
          </span>
        </Link>

        <ModeTabs className="order-3 w-full md:order-none md:ml-auto md:w-auto" />

        <a
          href={whatsappUrl()}
          className="ml-auto whitespace-nowrap bg-accent px-5 py-[13px] text-[12px] font-semibold uppercase tracking-[0.16em] text-on-accent shadow-glow md:ml-0"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
