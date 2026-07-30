import { Kicker } from "@/components/ui/Kicker";
import { testimonials } from "@/config/content";

/**
 * Testimonials — prova social. Graceful-empty: sem depoimentos, nada renderiza
 * (estado atual — nenhum capturado ainda). Segue o Testimonial Card do design
 * system §4 (figure com borda só à esquerda no accent), não o Card genérico:
 * o estilo é distinto (sem box completa). View pura.
 *
 * Os depoimentos são transversais (aparecem nos dois modos) — prova social é
 * confiança geral. O campo `mode?` do type fica disponível para segmentar por
 * frente no futuro, mas hoje não filtramos. Cor/borda trocam por token.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="depoimentos" className="border-t border-line py-16 lg:py-24">
      <Kicker>Prova social</Kicker>
      <h2 className="mt-3 max-w-[20ch] font-display text-h2 font-bold text-fg">
        O que dizem de mim.
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.quote}
            className="border-l-2 border-accent bg-surface py-4 pl-5 pr-6"
          >
            <blockquote className="font-body text-body leading-relaxed text-fg">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-3 font-mono text-label uppercase tracking-[0.16em] text-fg-2">
              {testimonial.author} · {testimonial.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
