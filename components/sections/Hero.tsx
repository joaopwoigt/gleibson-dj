import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { whatsappUrl } from "@/lib/contact";

/**
 * Hero — a abertura da página. Comum aos dois modos: a headline é a assinatura
 * da marca (frase 1 do messaging), e cor/glow trocam por token. View component.
 *
 * Copy 100% da marca aprovada (messaging.md): headline = "Uns tocam música. Eu
 * comando o momento."; subtítulo = conceito ("dois tempos"). O kicker é rótulo
 * factual de categoria, não copy inventada. Foto do ensaio em P&B via CSS
 * (regra de imagery da marca — a cor vive no accent, nunca na foto).
 */
export function Hero() {
  return (
    <section className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
      <div className="flex flex-col items-start">
        <Kicker>DJ de eventos e balada</Kicker>

        <h1 className="mt-4 font-display text-display font-extrabold text-fg">
          Uns tocam música.{" "}
          <span className="text-accent">Eu comando o momento.</span>
        </h1>

        <p className="mt-5 max-w-[46ch] font-body text-body text-fg-2">
          Todo momento perfeito tem dois tempos: um de calma, um de fogo. A arte
          é comandar os dois.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappUrl()}>Falar no WhatsApp</Button>
          {/* Âncora resolve quando a galeria (Task 13) existir com id="portfolio". */}
          <Button variant="secondary" href="#portfolio">
            Ver o portfólio
          </Button>
        </div>
      </div>

      {/* Foto do ensaio (só hero/estrutura — não vai para a galeria). Glow só no
          Balada (shadow-glow = none no Eventos). */}
      <div className="relative aspect-[2/3] w-full max-w-md overflow-hidden border border-line shadow-glow lg:justify-self-end">
        <Image
          src="/hero-gleib.webp"
          alt="Retrato do DJ Gleib"
          width={1200}
          height={1800}
          priority
          className="h-full w-full object-cover grayscale contrast-[1.08]"
        />
      </div>
    </section>
  );
}
