# assets-raw — fotos cruas da galeria

Entrada do pipeline de imagem (Task 12). As fotos aqui **não** vão para o repo
(gitignored) — são a origem. O que o site serve são os WebP gerados em
`public/gallery/`.

## Fluxo

1. Coloque as fotos de eventos (jpg/png) nesta pasta.
2. Rode `npm run images`.
3. O script gera WebP **P&B** em 400/800/1200px em `public/gallery/` e imprime os
   caminhos + `srcset` prontos.
4. Registre as fotos que for usar em `config/content.ts` (array `gallery`), com
   `alt` descritivo e o `mode` (`eventos`/`balada`).

O tratamento P&B contrastado é regra da marca — a cor vive no accent, nunca na
foto. Fazê-lo no pipeline garante consistência mesmo com fotos de origem
irregular (celular de eventos passados).
