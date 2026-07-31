import { Button } from "@/components/ui/Button";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappUrl } from "@/lib/contact";
import { cx } from "@/lib/cx";

/**
 * Footer — the brand's constant dark anchor (layouts.md: Preto-Tinta fixo).
 *
 * O bloco de conteúdo pina `data-mode="balada"`: cor/token resolvem no escuro
 * independentemente do modo da página — o footer nunca vira com a troca de modo.
 *
 * A EXCEÇÃO é a waveform de assinatura (brand-book §4.4): ela fica ACIMA do bloco
 * escuro, no fundo do modo da página, e é o único elemento do rodapé que acompanha
 * o modo — baixa e regular no Eventos, alta e irregular no Balada. Traduz a "grande
 * ideia" (dois modos, um comando) também no fecho da página.
 */

// Alturas das barras (% da faixa). Determinísticas (sem random) → mesmo render no
// servidor e no cliente, sem mismatch de hidratação. Eventos: onda baixa e regular
// (sobriedade). Balada: pulsos altos e desiguais (energia). brand-book §4.4/§4.5.
const BARS = 96;
const WAVE_EVENTOS = Array.from({ length: BARS }, (_, i) =>
  Math.round(30 + 10 * Math.sin(i / 2.2)),
);
const WAVE_BALADA = Array.from({ length: BARS }, (_, i) =>
  Math.round(44 + 42 * Math.abs(Math.sin(i * 1.6)) + 12 * Math.sin(i * 0.5)),
);

// O display (flex) fica na className por instância, NÃO no base: `balada:flex`
// precisa poder ativar o flex sem que um `block`/`hidden` do base o sobrescreva.
function Wavebars({ heights, className }: { heights: number[]; className?: string }) {
  return (
    <div
      aria-hidden
      className={cx("mx-auto h-8 max-w-content items-end gap-[2px] px-4", className)}
    >
      {heights.map((h, i) => (
        <span key={i} className="flex-1 bg-accent" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto">
      {/* Assinatura: waveform bimodal, acompanha o modo da página (custom-variant
          eventos/balada sobre o [data-mode] do <html>). Só uma versão aparece. */}
      <div className="py-4">
        <Wavebars heights={WAVE_EVENTOS} className="flex balada:hidden" />
        <Wavebars heights={WAVE_BALADA} className="hidden balada:flex" />
      </div>

      <div
        data-mode="balada"
        className="border-t-2 border-line bg-bg py-12 text-fg"
      >
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center">
          <span className="font-display text-xl font-bold text-fg">
            No comando do seu momento.
          </span>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-label uppercase tracking-[0.16em] text-fg-2 transition-colors duration-200 ease-command hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {INSTAGRAM_HANDLE}
            </a>
            <Button href={whatsappUrl()}>Falar no WhatsApp</Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
