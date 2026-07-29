# Componentes — DJ Gleib

> Blocos-base para o site-portfólio de página única (proposta §Escopo). Todos usam **tokens semânticos** (`bg`, `surface`, `fg`, `accent`, `on-accent`, `line`) e funcionam nos dois modos sem reescrever — o modo é dado por `[data-mode="eventos"|"balada"]` num container acima. Exemplos em HTML + classes do preset Tailwind.
>
> Regras de marca aplicadas em todos: **cantos vivos (0px)**, **bordas 1–2px** fazem a separação (sem sombra suave), **glow só no Modo Balada**. Origem: brand-book §4.4/§4.5/§4.7.

Quantidade proporcional ao escopo: 7 componentes-base. Novos surgem conforme as páginas forem construídas (adicionar aqui ao criar).

---

## 1. Button

CTA principal do site = **"Falar no WhatsApp"**. Três variantes.

```html
<!-- Primary: sólido no accent do modo. Texto = on-accent (branco no Eventos, Preto-Tinta no Balada) -->
<a class="inline-flex items-center gap-2 bg-accent text-on-accent font-body font-bold
          px-6 py-3 border-2 border-accent shadow-glow
          transition-colors duration-200 ease-command hover:bg-accent-emphasis hover:border-accent-emphasis">
  Falar no WhatsApp
</a>

<!-- Secondary: contorno. Borda + texto no accent, fundo transparente -->
<a class="inline-flex items-center gap-2 bg-transparent text-accent font-body font-bold
          px-6 py-3 border-2 border-accent
          transition-colors duration-200 ease-command hover:bg-accent hover:text-on-accent">
  Ver o portfólio
</a>

<!-- Ghost: só texto + underline no hover. Para links secundários -->
<a class="inline-flex items-center gap-1 text-fg font-body font-semibold
          border-b-2 border-transparent hover:border-accent transition-colors">
  Instagram @gleibdj
</a>
```

- **Estados:** `hover` migra para `accent-emphasis` (glow reforça no Balada). `disabled`: `opacity-50 pointer-events-none`.
- **Nunca:** cantos arredondados, sombra suave. O `shadow-glow` é `none` no Eventos (sóbrio) e brilho roxo no Balada — resolve sozinho pelo token.
- Origem: brand-book §4.2 (accent/CTA), §4.5 (cantos/borda).

---

## 2. Mode Tabs — o switcher Eventos / Balada (assinatura)

O componente que materializa "dois modos, um comando". Troca o `data-mode` do container-raiz da página. É a peça-âncora da navegação.

```html
<div role="tablist" aria-label="Modo de atuação"
     class="inline-flex border-2 border-line font-mono text-label uppercase tracking-[0.16em]">
  <button role="tab" aria-selected="true" data-set-mode="eventos"
          class="px-5 py-2.5 bg-accent text-on-accent">Modo Eventos</button>
  <button role="tab" aria-selected="false" data-set-mode="balada"
          class="px-5 py-2.5 bg-transparent text-fg-2 hover:text-fg border-l-2 border-line">Modo Balada</button>
</div>
```

```js
// Troca o modo no container-raiz (ex.: <body data-mode="eventos">)
document.querySelectorAll('[data-set-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.documentElement.setAttribute('data-mode', btn.dataset.setMode);
    // atualizar aria-selected dos tabs...
  });
});
```

- A aba ativa fica sólida no accent; a inativa é texto `fg-2`. Ao trocar, **a página inteira** troca de temperatura (fundo, texto, accent, glow) via CSS vars — em 250ms.
- **Acessibilidade:** `role="tablist"/"tab"`, `aria-selected`, navegável por teclado.
- Origem: brand-book §4.1 (dois modos, um comando) + proposta §Escopo (duas abas).

---

## 3. Card

Bloco de conteúdo sobre `surface`, separado por borda (não por sombra). Base da galeria e de blocos de texto.

```html
<article class="bg-surface border border-line p-6
                transition-colors duration-200 ease-command hover:border-accent">
  <span class="font-mono text-label uppercase tracking-[0.16em] text-accent">Casamento</span>
  <h3 class="font-display font-semibold text-h3 text-fg mt-2">Sítio Recanto · 2025</h3>
  <p class="font-body text-small text-fg-2 mt-2">300 convidados · cerimônia + festa</p>
</article>
```

- **Interativo (galeria):** adicionar `cursor-pointer` e `hover:border-accent`; no Balada, `hover:shadow-glow` para o brilho de energia.
- **Elevação = borda + surface**, nunca `box-shadow` difuso. Origem: brand-book §4.5/§4.7.

---

## 4. Testimonial Card — prova social

Depoimentos de noivos/empresas/contratantes (proposta: até 8). A "prova visível" é o coração da estratégia (brand-book §1 RTB).

```html
<figure class="bg-surface border-l-2 border-accent pl-5 py-4 pr-6">
  <blockquote class="font-body text-body text-fg leading-relaxed">
    "Não precisei me preocupar com nada no nosso dia. Tudo aconteceu no tempo certo."
  </blockquote>
  <figcaption class="font-mono text-label uppercase tracking-[0.16em] text-fg-2 mt-3">
    Marina &amp; Rafa · Casamento
  </figcaption>
</figure>
```

- Borda-esquerda no `accent` marca a citação sem enfeite. Aspas fazem parte do texto.
- Origem: brand-book §3 (aforismo, aspas) + §4.2 (accent como marca).

---

## 5. Kicker / Badge

Rótulo técnico em IBM Plex Mono — dá o ar "preciso/no comando" e organiza as seções.

```html
<!-- Kicker de seção -->
<span class="font-mono text-label uppercase tracking-[0.16em] text-accent">01 · Apresentação</span>

<!-- Badge de tag (galeria/filtro) -->
<span class="inline-block font-mono text-label uppercase tracking-[0.16em]
             text-fg-2 border border-line px-2 py-1">Corporativo</span>
```

- Sempre UPPERCASE, tracking largo (0.16em). Nunca em frase corrida.
- Origem: brand-book §4.3 (label/kicker IBM Plex Mono).

---

## 6. Section

Envelope de seção com kicker + título + conteúdo e ritmo vertical consistente.

```html
<section class="bg-bg text-fg py-16 lg:py-24 transition-colors duration-250 ease-command">
  <div class="max-w-content mx-auto px-4">
    <span class="font-mono text-label uppercase tracking-[0.16em] text-accent">02 · Portfólio</span>
    <h2 class="font-display font-bold text-h2 text-fg mt-3 max-w-[24ch]">
      Cada evento, uma prova.
    </h2>
    <div class="mt-8"><!-- conteúdo --></div>
  </div>
</section>
```

- `py-16` mobile / `lg:py-24` desktop. Largura de conteúdo `max-w-content` (1120px).
- Título curto, aforismo (brand-book §3). Origem: brand-book §4.3 + tokens §5.

---

## 7. Header / Nav + Footer

```html
<!-- Header: wordmark + mode tabs + CTA. Fundo = bg do modo -->
<header class="bg-bg/95 backdrop-blur border-b-2 border-line sticky top-0 z-50">
  <div class="max-w-content mx-auto px-4 h-16 flex items-center justify-between">
    <span class="font-display font-extrabold text-fg text-xl tracking-[-0.01em]">
      GLE<span style="-webkit-text-stroke:1.5px var(--ds-accent); color:transparent;">IB</span>
    </span>
    <!-- mode tabs (componente 2) -->
    <a class="hidden sm:inline-flex bg-accent text-on-accent font-body font-bold px-5 py-2.5 border-2 border-accent shadow-glow">
      WhatsApp
    </a>
  </div>
</header>

<!-- Footer: assinatura curta + contato -->
<footer class="bg-pretotinta text-osso py-12 border-t-2 border-borda-escura">
  <div class="max-w-content mx-auto px-4 flex flex-col sm:flex-row justify-between gap-4">
    <span class="font-display font-bold text-xl">No comando do seu momento.</span>
    <span class="font-mono text-label uppercase tracking-[0.16em] text-lavanda">DJ Gleib · @gleibdj</span>
  </div>
</footer>
```

- O wordmark reproduz o "GLE" cheio + "IB" vazado (contorno no accent) — brand-book §4.4.
- Footer fixo em Preto-Tinta (independe do modo) com a assinatura curta "No comando do seu momento." (brand-book §1). Origem: brand-book §1/§4.4.

---

## Checklist ao criar um novo componente

- [ ] Usa tokens semânticos (funciona nos dois modos sem `if`)?
- [ ] Cantos vivos (0px), exceto círculos? Borda 1–2px em vez de sombra suave?
- [ ] Kickers/labels em IBM Plex Mono UPPERCASE tracking 0.16em?
- [ ] Contraste do texto passa AA no modo em que aparece (ver tokens.md §3)?
- [ ] Documentado aqui com exemplo e origem no brand book?
