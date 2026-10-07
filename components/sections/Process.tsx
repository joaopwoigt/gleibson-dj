"use client";

import { useMode } from "@/components/ModeProvider";
import { cx } from "@/lib/cx";
import { bio, process } from "@/config/content";

// Bordas internas por posição: 1 coluna (mobile) → 2 (sm) → 4 (lg). Células sem
// fundo próprio, para o grão do papel continuar aparecendo no Modo Eventos.
const CELL_BORDERS = [
  "border-b sm:border-r lg:border-b-0",
  "border-b lg:border-b-0 lg:border-r",
  "border-b sm:border-b-0 sm:border-r",
  "",
];

/**
 * No Eventos, "Como funciona" com as quatro etapas, depois do bloco do modo; no
 * Balada, a bio do Gleib, antes do bloco do modo (revisão 2026-10-05: o roteiro em
 * etapas não é como uma festa funciona na prática). A ordem fica em ModeSections.
 * Conteúdo via useMode, como o ModeBlock, para a Passagem clonar o modo certo.
 */
export function Process({ divider = false }: { divider?: boolean }) {
  const { mode } = useMode();
  const isBio = mode === "balada";
  const title = isBio ? bio.title : process.title;
  const kicker = isBio ? null : process.kicker;

  return (
    <section className={cx(divider && "border-t border-line")}>
      <div className="mx-auto max-w-content px-4 py-16 sm:px-8 md:py-[88px]">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2 className="m-0 text-[clamp(28px,3.4vw,44px)] font-bold tracking-[-0.02em]">
            {title}
          </h2>
          {kicker && (
            <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.16em] text-fg-2">
              {kicker}
            </p>
          )}
        </div>

        {isBio ? (
          <div className="grid gap-6 border border-line px-8 py-10 md:grid-cols-3 md:gap-10">
            {bio.paragraphs.map((text, index) => (
              <p key={index} className="m-0 text-[17px] leading-[1.6] text-fg-2">
                {text}
              </p>
            ))}
          </div>
        ) : (
          <ol className="m-0 grid list-none border border-line p-0 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, index) => (
              <li key={step.number} className={`border-line px-8 py-10 ${CELL_BORDERS[index]}`}>
                <p
                  aria-hidden="true"
                  className="mb-6 text-[40px] font-extrabold tracking-[-0.03em] text-accent"
                >
                  {step.number}
                </p>
                <h3 className="mb-3.5 text-[20px] font-semibold tracking-[-0.015em]">{step.title}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-fg-2">{step.body}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
