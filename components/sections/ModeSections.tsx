"use client";

import { useMode } from "@/components/ModeProvider";
import { ModeBlock } from "@/components/sections/ModeBlock";
import { Process } from "@/components/sections/Process";

/**
 * A ordem das duas seções depois da faixa de onda muda por modo (revisão
 * 2026-10-05): no Eventos, bloco do modo e depois "Como funciona"; no Balada, a
 * bio primeiro e depois o bloco do modo. A primeira fica sem borda no topo porque
 * a faixa de onda já fecha com border-y; a segunda ganha o divisor.
 */
export function ModeSections() {
  const { mode } = useMode();

  return mode === "balada" ? (
    <>
      <Process />
      <ModeBlock divider />
    </>
  ) : (
    <>
      <ModeBlock />
      <Process divider />
    </>
  );
}
