import type {
  GalleryPhoto,
  GalleryVideo,
  Mode,
  ModeContent,
  Testimonial,
} from "@/config/types";

/**
 * Fonte única do conteúdo editorial do site.
 *
 * Perfil B: NÃO há runtime store (Edge Config). O conteúdo é estático no repo,
 * editado + redeploy (decisão do PLAN #7) — sem config/runtime.ts.
 *
 * Textos por modo = copy da marca aprovada (branding/03-identidade/messaging.md).
 *
 * SEGUNDA LEVA / GRACEFUL-EMPTY: `gallery`, `videos` e `testimonials` nascem
 * VAZIOS — hoje não existe material de eventos reais nem depoimentos capturados.
 * O gate de conteúdo (Fase 6) os popula. As seções que os consomem se ESCONDEM
 * quando a lista está vazia, então o site publica coerente mesmo sem esse
 * material. Popular é drop-in: basta preencher os arrays aqui.
 */

export const modeContent: Record<Mode, ModeContent> = {
  // messaging.md: headline = frase 3; body = mensagem "Casal de noivos";
  // bullets derivados das mensagens por audiência (casal / cerimonialista / RH).
  eventos: {
    kicker: "Casamentos & corporativo",
    headline: "Eu administro seu dia para que você possa vivê-lo.",
    body: "Sobriedade, roteiro, nenhuma surpresa: você só vive o seu dia.",
    bullets: [
      "Set e roteiro decididos com você antes do dia.",
      "Nenhuma surpresa. Esse é o combinado.",
      "Condução, pontualidade e presença comprovadas.",
    ],
  },
  // messaging.md: headline = frase 4; body = mensagem "Casa noturna";
  // bullets = frases 7 e 5 (literais) + linha da casa noturna.
  balada: {
    kicker: "Balada & festas",
    headline: "A euforia é da pista. O comando é meu.",
    body: "Energia com aresta, fora do circuito óbvio, que sobe e não cai.",
    bullets: [
      "Energia sem comando é bagunça.",
      "Muda o volume, nunca o caráter.",
      "Um set que traz e sustenta o público.",
    ],
  },
};

// Vazios por enquanto — populados na segunda leva (Fase 6). Ver nota acima.
export const gallery: GalleryPhoto[] = [];
export const videos: GalleryVideo[] = [];
export const testimonials: Testimonial[] = [];
