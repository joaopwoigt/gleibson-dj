import { footer } from "@/config/content";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappUrl } from "@/lib/contact";

/**
 * Footer — a âncora escura fixa da marca (Preto-Tinta nos dois modos, cores da
 * paleta bruta, não dos tokens por modo). Abre com a waveform de assinatura:
 * linha de base apagada que "acorda" na metade direita. Estática e determinística
 * (mesmo render no servidor e no cliente). Logotipo bloco invertido: DJ sobre
 * Osso, GLEIB vazado.
 */
const WAVE: ReadonlyArray<{ h: number; on: boolean }> = [
  ...[30, 34, 28, 36, 32, 30, 38, 34, 30, 36, 32, 34, 30].map((h) => ({ h, on: false })),
  ...[44, 62, 28, 78, 100, 36, 68, 90, 26, 74, 48, 96, 32, 82, 40].map((h) => ({ h, on: true })),
];

export function Footer() {
  return (
    <footer className="bg-pretotinta text-osso">
      <div className="mx-auto max-w-content px-4 pb-12 pt-16 sm:px-8">
        <div aria-hidden="true" className="mb-14 flex h-14 items-end gap-[3px]">
          {WAVE.map((bar, i) => (
            <div
              key={i}
              className={bar.on ? "flex-1 bg-lavanda" : "flex-1 bg-borda-escura"}
              style={{ height: `${bar.h}%` }}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-10 border-t border-borda-escura pt-10">
          <div className="flex flex-col gap-6">
            <div
              aria-label="DJ Gleib"
              role="img"
              className="flex w-max border-2 border-osso text-[19px] font-extrabold leading-none tracking-[-0.03em]"
            >
              <span className="border-r-2 border-osso bg-osso px-[9px] pb-2 pt-[7px] text-tinta">
                DJ
              </span>
              <span className="px-[11px] pb-2 pt-[7px]">GLEIB</span>
            </div>
            <p className="m-0 text-[22px] font-bold tracking-[-0.02em]">{footer.signature}</p>
          </div>

          <div className="grid gap-2.5 text-[14px] text-lavanda sm:text-right">
            <p className="m-0">{footer.identity}</p>
            <p className="m-0">
              <a href={whatsappUrl()} className="hover:text-osso">
                WhatsApp
              </a>
              {" · "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-osso"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
