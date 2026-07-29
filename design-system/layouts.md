# Layouts — DJ Gleib

> Padrões de página para o site-portfólio de página única com dois modos (proposta §Escopo). Grid, larguras e o esqueleto que o `frontend-design` monta.

## Page shell (dual-mode)

O `data-mode` vive no elemento-raiz e governa a página inteira. Trocar via Mode Tabs (components §2).

```html
<html data-mode="eventos"><!-- padrão: Eventos (claro, sóbrio) -->
  <body class="bg-bg text-fg font-body transition-colors duration-250 ease-command">
    <header><!-- wordmark + mode tabs + WhatsApp --></header>
    <main><!-- seções --></main>
    <footer><!-- assinatura + contato --></footer>
  </body>
</html>
```

- **Padrão = Eventos** (claro): a frente que fecha venda (casais/empresas) e o registro Ruler-âncora. Balada é o segundo estado, ativado pela aba.
- Fundo/texto/accent trocam por CSS var; a transição de 250ms dá o "vira a chave" entre os dois mundos.

## Template da página-portfólio

Ordem das seções (proposta §Escopo → hierarquia de venda):

```
┌──────────────────────────────────────────────┐
│ HEADER  wordmark · [Eventos|Balada] · WhatsApp│  sticky, border-b 2px
├──────────────────────────────────────────────┤
│ HERO / APRESENTAÇÃO                            │
│   kicker · display "Uns tocam música.          │  fundo = bg do modo
│   Eu comando o momento." · sub · 2 CTAs        │  foto P&B ao lado (desktop)
├──────────────────────────────────────────────┤
│ MODO (conteúdo da aba ativa)                   │
│   Eventos: "Eu administro seu dia…" + bullets  │  troca com o data-mode
│   Balada:  "A euforia é da pista…" + bullets   │
├──────────────────────────────────────────────┤
│ PORTFÓLIO / GALERIA                            │
│   grid de cards (fotos P&B) 2→3→4 col          │  até 30 fotos, 6 vídeos embed
├──────────────────────────────────────────────┤
│ PROVA SOCIAL                                   │
│   grid de testimonial cards (até 8)            │
├──────────────────────────────────────────────┤
│ CTA FINAL                                      │
│   "Você não contrata uma aposta." + WhatsApp   │  bloco no accent/surface
├──────────────────────────────────────────────┤
│ FOOTER  "No comando do seu momento." · @gleibdj│  Preto-Tinta fixo
└──────────────────────────────────────────────┘
```

## Grid e larguras

- **Largura de conteúdo:** `max-w-content` (1120px), centralizada, `px-4` nas bordas.
- **Galeria:** `grid` com `gap-4` (16px) — `grid-cols-2` (mobile) → `md:grid-cols-3` → `lg:grid-cols-4`.
- **Hero:** 1 coluna (mobile) → 2 colunas (`lg:grid-cols-2`, texto + foto).
- **Prova social:** `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-3`.

## Ritmo vertical

- Seção: `py-16` (mobile) / `lg:py-24` (desktop).
- Título → conteúdo: `mt-8`. Kicker → título: `mt-3`.

## Responsividade por breakpoint

| BP | Galeria | Hero | Header |
|----|---------|------|--------|
| `< 640` | 2 col | empilhado, foto abaixo | wordmark + tabs; WhatsApp vira ícone/oculto |
| `640–1023` | 3 col | empilhado | wordmark + tabs + WhatsApp |
| `≥ 1024` | 4 col | 2 col (texto+foto) | linha completa |

## Imagery

Todas as fotos de evento entram em **P&B contrastado** (brand-book §4.6) — a cor vive no accent, não na foto. Aplicar via CSS:

```css
.foto-evento { filter: grayscale(1) contrast(1.08); }
```

Vídeos: embed de YouTube/Instagram em frame com `border border-line` e cantos vivos, `aspect-video`. Sem hospedar arquivo pesado (proposta §Premissas).

## Regras de layout (marca)

- Bordas de 1–2px separam blocos; **nada de sombra suave** (brand-book §4.7).
- Cantos vivos (0px) em cards, botões, inputs, frames. Só avatar/símbolo é círculo.
- Um accent por vez: a página respira o accent do modo ativo, nunca os dois com igual peso (brand-book §4.7).
