import type { HeroPhoto, Mode, ModeBlock, Step } from "@/config/types";

/**
 * Fonte única do conteúdo editorial do site (design "DJ Gleib One Page",
 * exportado do Claude Design em 2026-10).
 *
 * Perfil B: NÃO há runtime store. O conteúdo é estático no repo, editado +
 * redeploy (decisão do PLAN #7).
 *
 * Galeria, vídeos e depoimentos foram REMOVIDOS por decisão do João Pedro
 * (2026-10-02): o design novo não tem essas seções e elas não voltam.
 *
 * Revisão do cliente de 2026-10-05: foto de palco no Eventos, subtítulo e CTA
 * próprios no Balada, e a bio (do mídia kit) no lugar de "Como funciona" no Balada.
 */

export const hero = {
  lead: "Uns tocam música.",
  emphasis: "Eu comando o momento.",
  subtitle: {
    eventos:
      "De dia, eu sumo para você viver o seu dia. De noite, eu apareço para levantar a sua noite. Nos dois, nada fica no acaso.",
    balada: "Energia eletrizante do início ao fim do set.",
  } satisfies Record<Mode, string>,
  photo: {
    eventos: {
      src: "/hero-gleib-palco.webp",
      alt: "DJ Gleib cantando ao microfone no palco",
      position: "62% 30%",
    },
    balada: {
      src: "/hero-gleib.webp",
      alt: "Retrato do DJ Gleib",
      position: "50% 22%",
    },
  } satisfies Record<Mode, HeroPhoto>,
  cta: "Falar no WhatsApp",
};

export const modeBlocks: Record<Mode, ModeBlock> = {
  eventos: {
    kicker: "Modo Eventos",
    headline: "Você não precisa administrar nada.",
    paragraphs: [
      "Roteiro fechado com antecedência, cada momento no lugar certo: entrada, cerimônia, brinde, primeira dança, abertura de pista. Nada acontece antes da hora e nada fica esperando.",
    ],
    quote: "“Eu administro seu dia para que você possa vivê-lo.”",
    bullets: [
      "Reunião de roteiro e alinhamento com o cerimonial ou contratante",
      "Repertório definido a quatro mãos, com lista de vetos",
    ],
  },
  balada: {
    kicker: "Modo Balada",
    headline: "A pista responde. Eu decido o que vem depois.",
    paragraphs: [],
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
      body: "Reunião para mapear os momentos na linha do tempo, com repertório e vetos definidos por escrito.",
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

/** "Como funciona" fica só no Eventos; no Balada a mesma posição recebe a bio. */
export const bio = {
  title: "DJ Gleib",
  kicker: "Inter UNESP 2024 · +10 mil pessoas",
  paragraphs: [
    "Com uma trajetória diversificada na música, DJ Gleib Santos já atuou como organizador de eventos, músico freelancer de estúdio e até tocou sertanejo em barzinhos. Mas foi no funk que encontrou sua verdadeira identidade.",
    "Há dois anos, o Baile do Capitão vem conquistando espaço nos principais eventos universitários do interior de São Paulo, passando por cidades como Araraquara, Ribeirão Preto, Itápolis, São Carlos e Campinas.",
    "Com sua máscara iluminada icônica, DJ Gleib transforma cada apresentação em uma experiência eletrizante. Além dos palcos, ele inicia agora sua jornada na composição e produção musical, expandindo ainda mais seu impacto na cena.",
  ],
};

export const availability = {
  kicker: "Disponibilidade",
  headline: {
    eventos: ["Me conte a data.", "Eu digo se o dia é seu."],
    balada: ["Traga o DJ Gleib", "para o seu evento!"],
  } satisfies Record<Mode, [string, string]>,
  whatsappLabel: "WhatsApp direto",
  whatsappHint: "Resposta no dia",
  instagramHint: "Instagram",
};

export const footer = {
  signature: "No comando do seu momento.",
  identity: "Gleibson Santos · Araraquara/SP e região",
};
