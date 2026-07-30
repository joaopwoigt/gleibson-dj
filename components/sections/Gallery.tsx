import { Kicker } from "@/components/ui/Kicker";
import { gallery } from "@/config/content";
import type { Mode } from "@/config/types";
import { gallerySrcSet } from "@/lib/image";

/**
 * Gallery — grid de portfólio por modo. Graceful-empty de primeira classe:
 * - config.gallery vazio (estado atual) → nada renderiza;
 * - um modo sem fotos → o bloco daquele modo não existe (sem espaço vazio).
 * A visibilidade por modo é CSS (@custom-variant), como o resto do site. A
 * <section id="portfolio"> é a âncora do CTA "Ver o portfólio" (Hero). View pura.
 *
 * srcset/sizes + loading=lazy substituem o next/image (o export desliga a
 * otimização). P&B já vem do pipeline (Task 12) — sem filtro por cima.
 */
const SIZES = "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw";

export function Gallery() {
  if (gallery.length === 0) return null;
  return (
    <section id="portfolio">
      <GalleryGrid mode="eventos" />
      <GalleryGrid mode="balada" />
    </section>
  );
}

function GalleryGrid({ mode }: { mode: Mode }) {
  const photos = gallery.filter((photo) => photo.mode === mode);
  if (photos.length === 0) return null;

  const visibility = mode === "balada" ? "hidden balada:block" : "balada:hidden";
  return (
    <div className={`${visibility} border-t border-line py-16 lg:py-24`}>
      <Kicker>Portfólio</Kicker>
      <h2 className="mt-3 max-w-[20ch] font-display text-h2 font-bold text-fg">
        Cada evento, uma prova.
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          // <img> deliberado: o export estático desliga o next/image e usamos
          // srcset próprio das larguras do pipeline (decisão do PLAN — Perfil B).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={photo.src}
            src={photo.src}
            srcSet={gallerySrcSet(photo.src) || undefined}
            sizes={SIZES}
            alt={photo.alt}
            loading="lazy"
            className="aspect-square w-full border border-line object-cover"
          />
        ))}
      </div>
    </div>
  );
}
