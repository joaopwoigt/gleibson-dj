# Porting notes — preset v3 → Tailwind v4 (Task 02)

O `tailwind-preset.js` desta pasta está no formato **Tailwind v3** (`module.exports`, consumido via `presets:` em `tailwind.config.js`). O Tailwind **v4 é CSS-first** e não usa esse formato. O preset foi portado para `app/globals.css` via `@theme` / `@theme inline`. O `.js` fica aqui **só como referência/rastreabilidade** — não é importado por nada.

## Onde cada coisa foi parar

| Preset v3 | v4 em `app/globals.css` |
|-----------|--------------------------|
| `colors` semânticas (`bg`, `surface`, `fg`, `fg-2`, `accent`, `accent-emphasis`, `on-accent`, `line`) | `@theme inline` mapeando `--color-*` → `var(--ds-*)` |
| `colors` paleta bruta (`pretotinta`, `uva`, `purpura-*`, `osso`, …) | `@theme` `--color-*` com hex fixo |
| `fontFamily` (`display`, `body`, `mono`) | `@theme` `--font-*` |
| `fontSize` (`display`, `h1`, `h2`, `h3`, `body`, `small`, `label`) | `@theme` `--text-*` + `--text-*--line-height` / `--letter-spacing` |
| `borderRadius` (0 + full) | `@theme` `--radius-* : 0px` (todos os passos). `rounded-full` continua = círculo (nativo do v4, não depende de token) |
| `boxShadow` (`glow`, `glow-strong`) | `--shadow-glow` (inline, troca por modo) + `--shadow-glow-strong` |
| `maxWidth.content` | `@theme` `--container-content` → utility `max-w-content` |
| `transitionTimingFunction.command` | `@theme` `--ease-command` |

## Por que `@theme inline` nas cores semânticas

Sem `inline`, `--color-bg: var(--ds-bg)` seria resolvido **uma vez** no escopo `:root` (Eventos) e congelaria — não trocaria em `[data-mode="balada"]`. Com `inline`, o Tailwind injeta `var(--ds-bg)` direto na utility (`bg-bg` → `background-color: var(--ds-bg)`), então a resolução acontece **no ponto de uso**, onde o `--ds-*` do modo ativo está em escopo. É isso que faz o dual-mode funcionar.

## Desvios / decisões

1. **Espaçamento, breakpoints e largura de borda NÃO foram redefinidos.** O design system pede base **4px**, breakpoints **640/768/1024/1280** e bordas **1–2px** — que já são **exatamente os defaults do Tailwind v4**. Redefinir seria redundante e arriscaria divergência. Portanto `p-4`=16px, `gap-6`=24px, `py-24`=96px, `sm:`=640px etc. já batem com `tokens.md` §5 sem nenhuma linha extra.
2. **Fontes ainda não carregam** (Unbounded / Space Grotesk / IBM Plex Mono). Task 02 só declara os *stacks* no `@theme`; até a **Task 03** (self-host), as classes `font-display/body/mono` renderizam com o fallback (`system-ui` / `Inter` / `ui-monospace`). Não quebra nada — só não é a fonte final.
3. **`app/page.tsx` é temporário** — painel de verificação dos dois modos. A **Task 06** o substitui pelo shell real com o switcher.
4. **Nenhum desvio de portabilidade mecânica.** Todos os tokens do preset mapearam 1:1 para v4; não houve token que exigisse gambiarra ou reavaliação de estimativa das fases seguintes.
