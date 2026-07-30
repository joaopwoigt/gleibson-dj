import { Kicker } from "@/components/ui/Kicker";
import { modeContent } from "@/config/content";
import type { Mode } from "@/config/types";

/**
 * ModeContent — a seção que troca com a aba ativa: Eventos (confiança/organização)
 * e Balada (energia/presença). Renderiza AMBOS os blocos; o CSS (variants por
 * [data-mode]) mostra só o do modo ativo — mesmo padrão data-mode do site, sem
 * estado React, sem hydration mismatch, e os dois textos ficam no HTML (SEO).
 * Textos vêm do config/ (Task 10), nada hardcoded. View component.
 */
function ModeBlock({ mode, visibility }: { mode: Mode; visibility: string }) {
  const content = modeContent[mode];
  return (
    <div className={visibility}>
      <Kicker>{content.kicker}</Kicker>
      <h2 className="mt-3 max-w-[22ch] font-display text-h2 font-bold text-fg">
        {content.headline}
      </h2>
      <p className="mt-4 max-w-[54ch] font-body text-body text-fg-2">{content.body}</p>
      <ul className="mt-6 flex max-w-[54ch] flex-col gap-3">
        {content.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 font-body text-body text-fg"
          >
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ModeContent() {
  return (
    <section className="border-t border-line py-16 lg:py-24">
      {/* Só um bloco fica visível por vez, decidido pelo [data-mode] do <html>. */}
      <ModeBlock mode="eventos" visibility="balada:hidden" />
      <ModeBlock mode="balada" visibility="hidden balada:block" />
    </section>
  );
}
