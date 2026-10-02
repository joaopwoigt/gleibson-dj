"use client";

import Image from "next/image";
import { GradeComando } from "@/components/GradeComando";
import { useMode } from "@/components/ModeProvider";
import { hero } from "@/config/content";
import { whatsappUrl } from "@/lib/contact";

/**
 * Hero — a abertura da página. A headline é a assinatura da marca e é comum aos
 * dois modos; o subtítulo troca por modo. No Balada, a Grade de Comando corre
 * atrás do texto. Foto em P&B (a cor vive no accent), com contraste por modo
 * via --ds-photo. O quadro entra com um clip-path de 250ms (frameIn).
 */
export function Hero() {
  const { mode } = useMode();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-content overflow-hidden px-4 pb-14 pt-16 sm:px-8 md:pb-[72px] md:pt-24"
    >
      {mode === "balada" && <GradeComando />}

      <div className="relative grid items-stretch gap-10 md:grid-cols-[minmax(0,1fr)_400px]">
        <div className="self-center">
          <h1 className="m-0 text-[clamp(40px,5.2vw,74px)] font-light leading-none tracking-[-0.03em]">
            <span className="inline-block text-[0.785em] tracking-[-0.045em]">{hero.lead}</span>
            <br />
            <span className="font-extrabold text-accent">{hero.emphasis}</span>
          </h1>

          <p className="mt-9 max-w-[620px] text-[19px] leading-[1.6] text-fg-2">
            {hero.subtitle[mode]}
          </p>

          <div className="mt-11 flex flex-wrap gap-3.5">
            <a
              href={whatsappUrl()}
              className="relative z-[91] bg-accent px-[30px] py-[19px] text-[13px] font-semibold uppercase tracking-[0.16em] text-on-accent shadow-glow"
            >
              {hero.cta}
            </a>
          </div>
        </div>

        <div className="hero-frame relative z-[91] h-80 overflow-hidden border-2 border-fg bg-surface md:h-auto md:min-h-[640px]">
          <Image
            src="/hero-gleib.webp"
            alt="Retrato do DJ Gleib"
            fill
            priority
            sizes="(min-width: 768px) 400px, 100vw"
            className="object-cover object-[50%_22%] [filter:var(--ds-photo)]"
          />
        </div>
      </div>
    </section>
  );
}
