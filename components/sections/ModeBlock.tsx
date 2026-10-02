"use client";

import { cx } from "@/lib/cx";
import { useMode } from "@/components/ModeProvider";
import { modeBlocks } from "@/config/content";

/**
 * O bloco do modo ativo: texto à esquerda, card de citação à direita. O conteúdo
 * vem do estado React (useMode), não de variants CSS, para a Passagem clonar o
 * modo certo. No Balada o card ganha glow e a citação vai para o accent claro.
 */
export function ModeBlock() {
  const { mode } = useMode();
  const block = modeBlocks[mode];

  return (
    <section className="mx-auto w-full max-w-content px-4 py-16 sm:px-8 md:py-[88px]">
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-[72px]">
        <div>
          <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
            {block.kicker}
          </p>
          <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-bold leading-[1.06] tracking-[-0.02em]">
            {block.headline}
          </h2>
          <p className="mt-7 text-[18px] leading-[1.6] text-fg-2">{block.paragraphs[0]}</p>
          <p className="mt-5 text-[18px] leading-[1.6] text-fg-2">{block.paragraphs[1]}</p>
        </div>

        <div className="border-2 border-fg bg-surface p-7 shadow-glow sm:p-11">
          <p
            className={cx(
              "m-0 text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.24] tracking-[-0.02em]",
              mode === "balada" && "text-accent-emphasis",
            )}
          >
            {block.quote}
          </p>
          <div className="mb-7 mt-9 h-px bg-line" />
          <ul className="m-0 grid list-none gap-4 p-0 text-[15px] leading-[1.5] text-fg-2">
            {block.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
