import { INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappUrl } from "@/lib/contact";

/**
 * FinalCTA — bloco de conversão de fechamento. A página "respira o accent" aqui
 * (bloco no accent do modo, brand-book §4.7 "um accent por vez"). Headline =
 * provocação de venda da marca (messaging frase 9). Botão WhatsApp inverso
 * (contrasta com o fundo accent) + link Instagram. View pura.
 */
export function FinalCTA() {
  return (
    <section id="contato" className="border-t border-line py-16 lg:py-24">
      <div className="bg-accent px-6 py-12 text-on-accent shadow-glow lg:px-14 lg:py-16">
        {/* on-accent em cheio (sem /80): a 80% o texto escuro do Balada clareia
            para 3.9:1 sobre a púrpura elétrica e reprova no AA (Lighthouse Task 23).
            Full passa nos dois modos (7.1 Eventos / 4.9 Balada). */}
        <span className="font-mono text-label uppercase tracking-[0.16em] text-on-accent">
          Vamos conversar
        </span>
        <h2 className="mt-4 max-w-[18ch] font-display text-h1 font-bold text-on-accent">
          Você não contrata uma aposta. Você contrata quem comanda.
        </h2>
        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          {/* Botão inverso: bg = on-accent, texto = accent, para contrastar com
              o fundo accent do bloco. */}
          <a
            href={whatsappUrl()}
            className="inline-flex items-center gap-2 border-2 border-on-accent bg-on-accent px-6 py-3 font-body font-bold text-accent transition-opacity duration-200 ease-command hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent"
          >
            Falar no WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b-2 border-transparent font-mono text-label uppercase tracking-[0.16em] text-on-accent transition-colors duration-200 ease-command hover:border-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent"
          >
            {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </section>
  );
}
