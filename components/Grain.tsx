"use client";

import { cx } from "@/lib/cx";
import { useMode } from "@/components/ModeProvider";

/**
 * O grão: textura de papel do Modo Eventos (design-system/tokens.md §7).
 * Ruído monocromático fixo (SVG feTurbulence, sem imagem e sem data: URI, então
 * a CSP não muda). O grão NUNCA se desloca: a única propriedade animada é a
 * opacidade, em ciclos longos (ver globals.css). Só renderiza no Modo Eventos.
 *
 * - "paper": atrás do conteúdo, sobre o fundo Osso. Ciclo 26s.
 * - "surface": por cima de tudo (z 90). Ciclo 34s. Header e foto ficam acima
 *   dele (z 95 / 91), como no design aprovado.
 * - "header": a camada surface dentro da barra sticky, que tem fundo opaco.
 */
const LAYERS = {
  paper: {
    id: "grain-paper",
    frequency: 0.62,
    className: "grain-paper fixed inset-0 -z-10 h-screen w-screen",
  },
  surface: {
    id: "grain-surface",
    frequency: 0.44,
    className: "grain-surface fixed inset-0 z-[90] h-screen w-screen",
  },
  header: {
    id: "grain-header",
    frequency: 0.44,
    className: "grain-surface absolute inset-0 h-full w-full",
  },
} as const;

export function Grain({ layer }: { layer: keyof typeof LAYERS }) {
  const { mode } = useMode();
  if (mode !== "eventos") return null;
  const { id, frequency, className } = LAYERS[layer];

  return (
    <svg
      aria-hidden="true"
      data-grain={layer === "paper" ? "paper" : "surface"}
      className={cx(className, "pointer-events-none will-change-[opacity]")}
    >
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={4}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
