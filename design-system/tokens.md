# Design Tokens — DJ Gleib

> **Etapa 4 do pipeline de branding da w²** (modo cliente de branding). Este documento **operacionaliza** o `brand-book.md` aprovado (Etapa 3) em tokens — não redecide cor nem tipografia. Cada token traz a coluna **Origem** apontando a regra do brand book; tokens sem regra de marca (raio, espaçamento, breakpoints) são marcados como **decisão de design system**.
>
> Fonte de verdade da marca: [`../03-identidade/brand-book.md`](../03-identidade/brand-book.md) · Contrastes recalculados sobre a paleta roxa (WCAG 2.1).

## A grande ideia: uma marca, dois modos

O site é de **página única com dois modos** (proposta §Escopo): **Eventos** (sóbrio, para casais/empresas) e **Balada** (energético, para contratantes de festa). No brand book (§4.1), a marca é *"dois modos, um comando"*: a distinção vem da **temperatura da púrpura** sobre o mesmo chão claro/escuro.

Por isso o sistema de cor tem **duas camadas**:
1. **Paleta bruta** (as cores-âncora do brand book, imutáveis).
2. **Tokens semânticos por modo** (`--ds-bg`, `--ds-accent`, …) que trocam de valor conforme o modo ativo (`[data-mode="eventos"]` / `[data-mode="balada"]`).

O `frontend-design` estiliza com os tokens **semânticos**; o modo é dado pelo atributo no container. Um componente escrito uma vez funciona nos dois modos.

---

## 1. Cor — paleta bruta (âncora da marca)

| Token | Hex | Papel | Origem |
|-------|-----|-------|--------|
| `pretotinta` | `#100E14` | Fundo escuro (Modo Balada) | brand-book §4.2 (fundo escuro) |
| `uva` | `#211B2E` | Superfície escura elevada (cards sobre Preto-Tinta) | brand-book §4.2 (Uva Fumê) |
| `purpura-profunda` | `#6D28D9` | Autoridade · CTA · accent Eventos | brand-book §4.2 (Púrpura Profunda) |
| `purpura-eletrica` | `#9B5CFF` | Energia · accent Balada | brand-book §4.2 (Púrpura Elétrica) |
| `purpura-clara` | `#B98CFF` | Glow · ênfase sobre escuro | brand-book §4.2 (Púrpura Clara) |
| `osso` | `#F1EEE8` | Fundo claro (Modo Eventos) · chão comum | brand-book §4.2 (Osso) |
| `tinta` | `#16131C` | Texto sobre claro | brand-book §4.2 (Tinta) |
| `lavanda` | `#948BA6` | Texto secundário sobre escuro | brand-book §4.2 (Lavanda) |
| `grafite` | `#45424C` | Texto secundário sobre claro | brand-book §4.2 (Grafite) |
| `sucesso` | `#2FA36B` | Estado de sucesso (UI) | brand-book §4.2 (derivado; verificar AA no uso) |
| `erro` | `#E5484D` | Estado de erro (UI) | brand-book §4.2 (derivado; verificar AA no uso) |
| `superficie-clara` | `#F7F4EE` | Card/bloco sobre Osso | brand-book / brandbook.html (`.card-l`) |
| `borda-escura` | `#2A2536` | Divisória sutil no escuro | brand-book §4.5 (borda escura) |
| `borda-clara` | `#DAD4CA` | Divisória sutil no claro | brandbook.html (`--borda-clara`) |
| `branco` | `#FFFFFF` | Texto sobre accent Eventos, mono | brand-book (par de botão) |

> Não há cor de **aviso/alerta**: a paleta é monocromática roxa e púrpura não sinaliza alerta. Se um estado de aviso for necessário no futuro, definir um âmbar próprio (decisão de design system) — nunca reutilizar as púrpuras. Origem: brand-book §4.2 (nota).

---

## 2. Cor — tokens semânticos por modo

Os componentes usam **estes** tokens, não os brutos. Trocam de valor conforme `[data-mode]`.

| Token semântico | Modo Eventos (claro) | Modo Balada (escuro) | Papel |
|-----------------|----------------------|----------------------|-------|
| `--ds-bg` | `osso` #F1EEE8 | `pretotinta` #100E14 | Fundo da página |
| `--ds-surface` | `superficie-clara` #F7F4EE | `uva` #211B2E | Cards, blocos elevados |
| `--ds-fg` | `tinta` #16131C | `osso` #F1EEE8 | Texto principal |
| `--ds-fg-2` | `grafite` #45424C | `lavanda` #948BA6 | Texto secundário |
| `--ds-accent` | `purpura-profunda` #6D28D9 | `purpura-eletrica` #9B5CFF | Accent, links, CTA |
| `--ds-accent-emphasis` | `purpura-profunda` #6D28D9 | `purpura-clara` #B98CFF | Ênfase/glow de destaque |
| `--ds-on-accent` | `branco` #FFFFFF | `pretotinta` #100E14 | Texto sobre o accent (botão sólido) |
| `--ds-border` | `borda-clara` #DAD4CA | `borda-escura` #2A2536 | Bordas e divisórias |
| `--ds-glow` | `none` (Eventos é sóbrio) | `0 0 24px rgba(155,92,255,.45)` | Brilho de energia (só Balada) |
| `--ds-photo` | `grayscale(1) contrast(1.18) brightness(1.02)` | `grayscale(1) contrast(1.36) brightness(0.94)` | Filtro P&B da foto, mais duro no Balada |

> **Por que o texto sobre botão troca:** no Eventos o accent é escuro (Púrpura Profunda) → texto branco. No Balada o accent é claro (Púrpura Elétrica) → texto Preto-Tinta. Verificado em AA (§4). Origem: brand-book §4.2 (regra de accent por modo) + mapa modo↔fundo (Eventos=claro, Balada=escuro).

### CSS de base (colar no globals / topo do preview)

```css
:root, [data-mode="eventos"] {
  --ds-bg:#F1EEE8; --ds-surface:#F7F4EE; --ds-fg:#16131C; --ds-fg-2:#45424C;
  --ds-accent:#6D28D9; --ds-accent-emphasis:#6D28D9; --ds-on-accent:#FFFFFF;
  --ds-border:#DAD4CA; --ds-glow:none;
  --ds-photo:grayscale(1) contrast(1.18) brightness(1.02);
}
[data-mode="balada"] {
  --ds-bg:#100E14; --ds-surface:#211B2E; --ds-fg:#F1EEE8; --ds-fg-2:#948BA6;
  --ds-accent:#9B5CFF; --ds-accent-emphasis:#B98CFF; --ds-on-accent:#100E14;
  --ds-border:#2A2536; --ds-glow:0 0 24px rgba(155,92,255,.45);
  --ds-photo:grayscale(1) contrast(1.36) brightness(0.94);
}
```

---

## 3. Contraste verificado (WCAG 2.1) — usar como texto

**Modo Balada (sobre escuro):**
- Osso sobre Preto-Tinta = **16.6:1** · Osso sobre Uva Fumê = **14.4:1** (corpo)
- Lavanda `#948BA6` sobre Preto-Tinta = **5.9:1** · sobre Uva Fumê = **5.2:1** (texto 2º)
- Púrpura Clara `#B98CFF` sobre Preto-Tinta = **7.5:1** (ênfase)
- Púrpura Elétrica `#9B5CFF` sobre Preto-Tinta = **4.9:1** (accent/link)

**Modo Eventos (sobre claro):**
- Tinta sobre Osso = **15.9:1** · sobre Superfície = **16.7:1** (corpo)
- Grafite `#45424C` sobre Osso = **8.5:1** · sobre Superfície = **9.0:1** (texto 2º)
- Púrpura Profunda `#6D28D9` sobre Osso = **6.1:1** · sobre Superfície = **6.5:1** (accent/link)

**Botões sólidos:**
- Branco sobre Púrpura Profunda = **7.1:1** ✓ (botão Eventos)
- Preto-Tinta sobre Púrpura Elétrica = **4.9:1** ✓ (botão Balada)

**Proibições (NUNCA como texto fino — só forma/fundo/borda):**
- ✗ Púrpura Profunda sobre Preto-Tinta = 2.7:1 — só bloco/forma no escuro
- ✗ Púrpura Elétrica sobre Osso = 3.4:1 — só bloco/título grande no claro
- ✗ Púrpura Elétrica sobre Uva Fumê = 4.3:1 — só título grande (≥24px), não corpo
- ✗ Branco/Osso sobre Púrpura Elétrica (3.9 / 3.4) — botão Balada usa texto Preto-Tinta

Origem: brand-book §4.2 (pares AA + proibições).

---

## 4. Tipografia

Origem: brand-book §4.3 (sistema tipográfico, **revisado na v2 — 2026-08-18**). Fonte: Google Fonts.

> **Mudança da v2:** o sistema saiu de três famílias (Unbounded / Space Grotesk / IBM Plex Mono) para **uma só: Poppins**. Peso e tracking fazem toda a hierarquia — não existe segunda família para resolver contraste. O tracking largo no label assume o papel que a monoespaçada tinha.

```
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
```

| Papel | Família | Peso | Tamanho (web) | Tracking / notas | Origem |
|-------|---------|------|---------------|------------------|--------|
| Display leve (1ª linha do h1) | Poppins | 300 | 0.785em do display | `-0.045em` — contraste de peso com a 2ª linha em 800 | design One Page (2026-10) |
| Display / Logotipo | **Poppins** | 800 | 40–56px | `letter-spacing: -0.03em`, `line-height: 0.98–1.04` | brand-book §4.3 |
| H1 | Poppins | 700 | 32–40px | `-0.02em`, `line-height: 1.05` | brand-book §4.3 |
| H2 | Poppins | 700 | 24px | `-0.02em`, `line-height: 1.1` | brand-book §4.3 |
| H3 / destaque | Poppins | 600 | 16–18px | `-0.015em`, `line-height: 1.2` | brand-book §4.3 |
| Corpo | Poppins | 400 / 500 | 15–16px | tracking normal, `line-height: 1.6` | brand-book §4.3 |
| Corpo forte / botão | Poppins | 600 | 15–16px | — | brand-book §4.3 |
| Label / kicker / dado | Poppins | 600 | 11–13px | `UPPERCASE`, `letter-spacing: 0.16em` (tela) / `0.22em` (impresso) | brand-book §4.3 |

**Fallback:** Poppins → `system-ui, sans-serif`. Origem: brand-book §4.3.

> **Por que o display aperta tanto (-0.03em):** a Poppins é uma geométrica larga. Sem o aperto, o display perde densidade e o logotipo bloco não fecha. O valor não é estético, é estrutural — vale também para o logo.

> **Nota de migração:** as classes utilitárias `font-display` / `font-body` / `font-mono` continuam existindo no preset para não quebrar o código que já as usa, mas **as três apontam para Poppins**. `font-mono` é legado; em código novo, usar `font-body` com peso 600 e tracking de label.

---

## 5. Raio, borda, elevação (marca) e espaçamento/grid (design system)

| Token | Valor | Papel | Origem |
|-------|-------|-------|--------|
| `radius` (todos) | `0px` | Cantos vivos em tudo | brand-book §4.5 (0px everywhere) |
| `radius-full` | `9999px` | Só para círculos: avatar, símbolo, jog wheel | brand-book §4.5 (exceto círculos) |
| `border` | `1px` / `2px` sólida na cor da paleta | Bordas fazem o trabalho | brand-book §4.5 (1–2px sólidas) |
| **Sombras** | — sem sombras suaves — | O brand book **proíbe** sombra suave; bordas separam | brand-book §4.7 (anti-pattern) |
| `glow` (só Balada) | `0 0 24px rgba(155,92,255,.45)` | Brilho de energia em elementos-destaque no escuro | brand-book §4.2 (Púrpura Clara = glow) — **uso restrito ao Modo Balada** |

**Espaçamento (decisão de design system — brand book não especifica):** base **4px**.

| Token | px | Uso |
|-------|----|----|
| `space-1` | 4 | micro-gaps |
| `space-2` | 8 | gap entre label e valor |
| `space-3` | 12 | padding interno pequeno |
| `space-4` | 16 | padding padrão de card |
| `space-6` | 24 | gap entre elementos |
| `space-8` | 32 | padding de card grande |
| `space-12` | 48 | gap entre blocos |
| `space-16` | 64 | padding vertical de seção (mobile) |
| `space-24` | 96 | padding vertical de seção (desktop) |

**Layout / breakpoints (decisão de design system):**
- Largura máxima de conteúdo: `1240px` (era 1120px até o design One Page, 2026-10). Gutter lateral: 16px no mobile, 32px a partir de 640px.
- Grid da galeria: 2 col (mobile) → 3 col (≥768px) → 4 col (≥1024px), gutter 16px.
- Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280`.
- Ritmo de seção: 64px (mobile) / 96px (desktop) de padding vertical.

---

## 6. Movimento (decisão de design system)

Coerente com "comando tranquilo" (brand-book §2/§3): transições **discretas e precisas**, nunca saltitantes.
- Duração: 150–250ms · Easing: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Troca de modo (Eventos↔Balada): transição de cor de fundo/texto em 250ms.
- Balada pode ter um leve pulse de glow em elementos-destaque; Eventos não anima glow (é sóbrio).

---

## 7. Textura: o grão (regra de fundo Osso)

**Regra:** sempre que o fundo for `osso` (#F1EEE8), o efeito de fundo em grão é aplicado, e **só no Modo Eventos** (`[data-mode="eventos"]`). O Modo Balada nunca recebe grão, nem em blocos Osso. Fundos que não são Osso (Superfície Clara, accent) também não recebem.

**O que é:** ruído monocromático fixo, gerado por SVG `feTurbulence` inline (`type="fractalNoise"`, `numOctaves=4`, `stitchTiles="stitch"`, dessaturado por `feColorMatrix saturate 0`). Sem imagem e sem `data:` URI, então não mexe na CSP. Três camadas, todas `pointer-events: none` e `aria-hidden`:

| Camada | Posição | `baseFrequency` | Opacidade (ciclo) | Ciclo |
|---|---|---|---|---|
| Papel | `fixed`, atrás do conteúdo (z -1 dentro do root isolado) | 0.62 | .12 → .16 → .12 | 26s |
| Superfície | `fixed`, por cima do conteúdo (z 90) | 0.44 | .42 → .32 → .42 (mobile <768px: .30 → .24) | 34s |
| Header | `absolute` dentro da barra sticky, que tem fundo opaco | 0.44 | igual à Superfície | 34s |

**Regras do efeito:**
- **O grão nunca se desloca.** Papel não se mexe; grão que rasteja vira chuvisco de TV. A única propriedade animada é `opacity`, `ease-in-out`, `infinite`. Ciclos diferentes evitam que as camadas pulsem juntas.
- Ficam ACIMA da camada Superfície (z 91+): a foto do hero e os botões de contato. A foto não recebe grão.
- Sem gradiente e sem sombra: é textura, não iluminação (brand-book §4.7).
- `prefers-reduced-motion`: grão estático na opacidade média (Papel .14, Superfície .37).

```css
@keyframes grain-paper   { 0%, 100% { opacity: .12; } 50% { opacity: .16; } }
@keyframes grain-surface { 0%, 100% { opacity: .42; } 50% { opacity: .32; } }
.grain-paper   { animation: grain-paper 26s ease-in-out infinite; }
.grain-surface { animation: grain-surface 34s ease-in-out infinite; }
@media (max-width: 767px) {
  @keyframes grain-surface { 0%, 100% { opacity: .30; } 50% { opacity: .24; } }
}
@media (prefers-reduced-motion: reduce) {
  .grain-paper   { animation-name: none; opacity: .14; }
  .grain-surface { animation-name: none; opacity: .37; }
}
```

> **Origem:** decisão de 2026-08-19 (`company/decisoes/log.md`), que definiu o grão para o Modo Eventos. Valores calibrados no design "DJ Gleib One Page" (Claude Design, 2026-10) e implementados em `components/Grain.tsx` do site.
