// Ponto único de verdade dos caminhos de contato. Todos os botões (Header, Hero,
// Footer, CTA final) importam daqui — evita links divergentes espalhados.

// Número do DJ Gleib no formato wa.me: código do Brasil (55) + DDD + número, só
// dígitos. (11) 95648-1998.
const WHATSAPP_NUMBER = "5511956481998";

export const INSTAGRAM_URL = "https://instagram.com/gleibdj";
export const INSTAGRAM_HANDLE = "@gleibdj";

/** Mensagem padrão pré-preenchida. Escrita do lado do cliente, tom da marca. */
export const WHATSAPP_MESSAGE =
  "Olá, Gleib! Vim pelo site e quero falar sobre um evento.";

/**
 * Monta o link wa.me com a mensagem pré-preenchida (URL-encoded). wa.me não é
 * API — é só um link (Perfil B, sem servidor). Uma mensagem por modo pode ser
 * adicionada no futuro passando outro texto aqui.
 */
export function whatsappUrl(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
