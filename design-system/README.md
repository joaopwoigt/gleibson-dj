# Design System — DJ Gleib (Etapa 4)

Kit de design **compilado a partir do brand book aprovado** (Etapa 3). É a base visual do site-portfólio do DJ Gleib. O `frontend-design` (Etapa 5) lê esta pasta antes de construir qualquer tela.

> **Local interino.** Este kit nasceu no hub porque o repo de código do site ainda não existe. Quando o repo for criado, **copiar esta pasta para `design-system/` na raiz do código** (onde o `frontend-design` a espera). Aqui ela fica versionada e compartilhada até lá. Esta subpasta também documenta a Etapa 4 no hub.

## Status da etapa

- **Gate de entrada:** ✅ `../03-identidade/brand-book.md` aprovado pelo cliente (2026-07-28).
- **Gate de saída:**
  - [x] Tokens rastreáveis ao brand book (1:1) — coluna *Origem* em `tokens.md`.
  - [x] Página de preview aprovada — `preview.html` (QA no chat).
  - [x] Doc de uso pronta — este README + `tokens.md` + `components.md`.

## A ideia em uma linha

**Uma marca, dois modos.** *Eventos* (claro, sóbrio, Púrpura Profunda) e *Balada* (escuro, energético, Púrpura Elétrica + glow) compartilham o mesmo esqueleto. O modo é um atributo (`data-mode`) no raiz da página; tudo troca por CSS variables. Origem: brand-book §4.1.

## Arquivos

| Arquivo | O que é |
|---------|---------|
| [`tokens.md`](tokens.md) | Todos os tokens (cor dual-mode, tipografia, raio, borda, glow, espaçamento) com **origem no brand book** |
| [`tailwind-preset.js`](tailwind-preset.js) | Preset Tailwind importável — cores semânticas + paleta bruta + fontes + escala |
| [`components.md`](components.md) | 7 componentes-base com exemplos HTML/Tailwind (inclui o switcher de modo) |
| [`layouts.md`](layouts.md) | Shell dual-mode, template da página-portfólio, grid e responsividade |
| [`preview.html`](preview.html) | Prova visual — abre no navegador, alterna Eventos/Balada, mostra cor, tipo e componentes |

## Como usar (frontend-design)

1. **Cole o CSS de base** (bloco `:root` / `[data-mode]` de [`tokens.md`](tokens.md) §2) no `globals.css`. É o que faz o dual-mode funcionar.
2. **Importe o preset** no `tailwind.config.js`:
   ```js
   const gleib = require('./design-system/tailwind-preset.js')
   module.exports = { presets: [gleib], content: ['./app/**/*.{ts,tsx,html}'] }
   ```
3. **Importe as fontes** (Unbounded / Space Grotesk / IBM Plex Mono) — `@import` em tokens.md §4.
4. **Estilize com tokens semânticos** (`bg-bg`, `text-fg`, `text-fg-2`, `bg-accent`, `text-on-accent`, `border-line`) — nunca hardcode hex. Assim o componente funciona nos dois modos.
5. Ponha `data-mode="eventos"` no `<html>` e troque para `"balada"` via Mode Tabs.

## Regras não-negociáveis (vêm da marca)

- **Cantos vivos (0px)** em tudo, exceto círculos (avatar/símbolo). brand-book §4.5.
- **Bordas 1–2px** separam blocos; **sem sombra suave**. brand-book §4.7.
- **Glow roxo só no Modo Balada** (Eventos é sóbrio). brand-book §4.2.
- **Fotos em P&B contrastado** — a cor vive no accent. brand-book §4.6.
- **Um accent por vez** — nunca as duas púrpuras com igual peso. brand-book §4.7.
- **Kickers/labels** em IBM Plex Mono UPPERCASE, tracking 0.16em. brand-book §4.3.

## Rastreabilidade

Modo cliente de branding: cada token de marca aponta sua regra no [`brand-book.md`](../03-identidade/brand-book.md) (coluna *Origem* em tokens.md). Raio, espaçamento e breakpoints são **decisões de design system** (o brand book não os define) e estão marcados como tais. Contrastes recalculados em WCAG 2.1 sobre a paleta roxa.

## Próxima etapa

Etapa 5 — **aplicação e lançamento** (`/campaign-planner` + `/content-creator`) e a construção do site (quando o repo de código existir, começando pelo `frontend-design` consumindo esta pasta).
