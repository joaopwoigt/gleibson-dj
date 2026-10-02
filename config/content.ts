import type { Mode, ModeBlock, Step } from "@/config/types";

/**
 * Fonte única do conteúdo editorial do site (design "DJ Gleib One Page",
 * exportado do Claude Design em 2026-10).
 *
 * Perfil B: NÃO há runtime store. O conteúdo é estático no repo, editado +
 * redeploy (decisão do PLAN #7).
 *
 * Galeria, vídeos e depoimentos foram REMOVIDOS por decisão do João Pedro
 * (2026-10-02): o design novo não tem essas seções e elas não voltam.
 */

export const hero = {
  lead: "Uns tocam música.",
  emphasis: "Eu comando o momento.",
  subtitle: {
    eventos:
      "De dia, eu sumo para você viver o seu dia. De noite, eu apareço para levantar a sua noite. Nos dois, nada fica no acaso.",
    balada: "Formado em festas universitárias, diretamente do palco do Inter.",
  } satisfies Record<Mode, string>,
  cta: "Falar no WhatsApp",
};

export const modeBlocks: Record<Mode, ModeBlock> = {
  eventos: {
    kicker: "Modo Eventos",
    headline: "Você não precisa administrar nada.",
    paragraphs: [
      "Roteiro fechado com antecedência, cada momento no lugar certo: entrada, cerimônia, brinde, primeira dança, abertura de pista. Nada acontece antes da hora e nada fica esperando.",
      "No dia, eu sumo. Converso com cerimonial, fotógrafo e buffet, resolvo o que aparece e mantenho o volume no ponto em que a conversa continua possível.",
    ],
    quote: "“Eu administro seu dia para que você possa vivê-lo.”",
    bullets: [
      "Reunião de roteiro e alinhamento com o cerimonial",
      "Repertório definido a quatro mãos, com lista de vetos",
    ],
  },
  balada: {
    kicker: "Modo Balada",
    headline: "A pista responde. Eu decido o que vem depois.",
    paragraphs: [
      "Leitura de pista em tempo real: quem chegou, quem está cansando, o que ainda não foi tocado. A noite tem curva, e a curva é construída, não improvisada.",
      "Presença quando a pista precisa de direção, silêncio quando ela já está no lugar. Transição sem buraco, do primeiro set ao último.",
    ],
    quote: "“A euforia é da pista. O comando é meu.”",
    bullets: [
      "Set desenhado para a duração real da festa",
      "Leitura de pista e virada de energia sem queda",
      "Estrutura de som e luz sob controle do começo ao fim",
      "Aniversários, formaturas, festas privadas e casas",
    ],
  },
};

export const process = {
  title: "Como funciona",
  kicker: "Quatro etapas, sem surpresa",
  steps: [
    {
      number: "01",
      title: "Conversa",
      body: "Data, local, duração e o tipo de evento. Em uma conversa dá para saber se faz sentido.",
    },
    {
      number: "02",
      title: "Roteiro",
      body: "Momentos mapeados na linha do tempo, repertório e vetos definidos por escrito.",
    },
    {
      number: "03",
      title: "Montagem",
      body: "Chegada com folga, teste de som e alinhamento com quem estiver conduzindo o dia.",
    },
    {
      number: "04",
      title: "Comando",
      body: "Do primeiro convidado ao último. Você vive o momento, eu cuido do resto.",
    },
  ] satisfies Step[],
};

export const availability = {
  kicker: "Disponibilidade",
  headline: ["Me conte a data.", "Eu digo se o dia é seu."] as const,
  whatsappLabel: "WhatsApp direto",
  whatsappHint: "Resposta no dia",
  instagramHint: "Instagram",
};

export const footer = {
  signature: "No comando do seu momento.",
  identity: "Gleibson Santos · Araraquara/SP e região",
};
