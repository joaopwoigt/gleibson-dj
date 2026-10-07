"use client";

import { useMode } from "@/components/ModeProvider";
import { availability } from "@/config/content";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappUrl } from "@/lib/contact";

/**
 * FinalCTA — "Disponibilidade": a faixa de conversão em largura total, no accent
 * do modo (brand-book §4.7 "um accent por vez"). Dois caminhos: WhatsApp direto
 * e Instagram, como botões de contorno. A headline troca por modo (revisão
 * 2026-10-05: no Balada, um convite mais animado).
 *
 * Desvio consciente do design: os rótulos secundários vão em on-accent CHEIO, sem
 * a opacidade .72 do export. Texto de 12px a 72% fica ~4,4:1 no Eventos e reprova
 * no AA (mesmo problema que o Lighthouse pegou na Task 23 com /80). A hierarquia
 * fica no peso e no tamanho.
 */
const LINK_CLASS =
  "relative z-[91] flex items-center justify-between gap-6 border-2 border-current px-[26px] py-[22px] text-[15px] font-semibold transition-opacity duration-150 ease-command hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent";
const HINT_CLASS = "text-[12px] font-medium uppercase tracking-[0.16em]";

export function FinalCTA() {
  const { mode } = useMode();
  const [line1, line2] = availability.headline[mode];

  return (
    <section id="contato" className="bg-accent text-on-accent">
      <div className="mx-auto grid max-w-content items-end gap-12 px-4 py-16 sm:px-8 md:grid-cols-[1.2fr_1fr] md:gap-16 md:py-[88px]">
        <div>
          <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.16em]">
            {availability.kicker}
          </p>
          <h2 className="m-0 text-[clamp(34px,5vw,66px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            {line1}
            <br />
            {line2}
          </h2>
        </div>

        <div className="grid gap-3.5">
          <a href={whatsappUrl()} className={LINK_CLASS}>
            <span>{availability.whatsappLabel}</span>
            <span className={HINT_CLASS}>{availability.whatsappHint}</span>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            <span>{INSTAGRAM_HANDLE}</span>
            <span className={HINT_CLASS}>{availability.instagramHint}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
