# Content-Security-Policy — notas de calibração

A CSP mora no `vercel.json` (header de borda; o site é export estático, sem
servidor). JSON não aceita comentário, então cada exceção é justificada aqui.
Método usado: playbook § 13.1 (report-only → caçar `securitypolicyviolation` →
enforced), calibrado na Task 21 (2026-07-31) com Puppeteer sobre o `out/` real.

## Política atual

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://i.ytimg.com;
frame-src https://www.youtube-nocookie.com;
font-src 'self';
connect-src 'self';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
object-src 'none';
```

## Exceções e por quê

| Diretiva | Exceção | Por quê | Gatilho de reavaliação |
|----------|---------|---------|------------------------|
| `script-src` | `'unsafe-eval'` | Next 16 + Turbopack: o runtime cliente de RSC usa `eval` para resolver módulos, em toda rota, mesmo em export estático (playbook § 13.1, confirmado na Lien e aqui). Não é opcional sem trocar de bundler. | A cada major do Next; se o Turbopack parar de usar `eval`. |
| `script-src` | `'unsafe-inline'` | Os `<script>` de bootstrap RSC são inline. Sem servidor, não há nonce por request; hash quebraria a cada build (o conteúdo carrega o payload RSC). Report-only acusou 11 violações `script-src-elem <- inline` sem isto. | Se o Next passar a emitir esses scripts com hash estável no export, trocar `'unsafe-inline'` por `'sha256-...'`. |
| `style-src` | `'unsafe-inline'` | Estilos inline do Next + atributo `style=` do wordmark (Header). | Se a origem dos estilos inline sumir. |
| `img-src` | `data:` | Placeholders/inline eventuais do Next. | — |
| `img-src` | `https://i.ytimg.com` | Thumbnail do facade de vídeo (Task 14). | Se a fonte da thumbnail mudar. |
| `frame-src` | `https://www.youtube-nocookie.com` | Iframe do vídeo carregado on-click (Task 14; domínio sem cookies). | Se trocar o provider de vídeo. |

## Notas

- `wa.me` e Instagram são **navegações** (o usuário sai do site) — não precisam de
  diretiva de conteúdo na CSP.
- Fontes são self-hosted via `next/font` (Task 03) → `font-src 'self'`.
- `frame-ancestors 'none'` reforça o `X-Frame-Options: DENY` (Task 20): ninguém
  embute o site num iframe de terceiro.
- Sem scripts de terceiros além do runtime do Next; sem rota de escrita, form ou
  admin (Perfil B leve) — por isso `connect-src 'self'` basta.

## Validação

Report-only e enforced rodados sobre o `out/` estático (HTTP puro, sem dev server)
com um vídeo de teste injetado temporariamente para exercitar o facade: **zero
violações** em ambos, iframe `youtube-nocookie` carrega ao clicar, thumbnail
`i.ytimg` sem violação de `img-src`. Repetir o smoke na URL pública da Vercel
(Task 22) — a plataforma pode servir assets de forma diferente do local.
