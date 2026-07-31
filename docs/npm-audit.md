# npm audit — advisories em aberto

Registro do baseline de segurança de dependências (playbook § 13, item 10).
Última verificação: **2026-07-31** (Task 23).

## Resultado

`npm audit`: **12 high** (dev + build). `npm audit --omit=dev`: **3 high** (só `sharp`).

| Pacote | Via | Severidade | Natureza | Runtime servido? |
|--------|-----|-----------|----------|------------------|
| `sharp` <0.35.0 | `next` (opcional) | high | CVEs do libvips (processamento de imagem) | **Não** — site estático |
| `postcss` <=8.5.17 | `next`, eslint | high | XSS/path-traversal ao processar CSS | **Não** — build-time |
| `minimatch` | `eslint-plugin-react` | — | ReDoS | **Não** — lint, dev |

## Por que não aplicamos o "fix" oferecido

`npm audit fix --force` propõe **`next@9.3.3`** — rebaixaria o Next de 16 para 9
(breaking total). Recusado: o risco do downgrade é ordens de grandeza maior que o
dos advisories neste contexto.

## Por que o risco real é baixo aqui

O site é **export estático** (`output: 'export'`, sem servidor). `sharp` e `postcss`
rodam **só no build**, sobre **conteúdo nosso e confiável** (as fotos do DJ e o nosso
CSS) — nunca sobre input de terceiro em runtime. Os CVEs do `sharp`/libvips exigem
processar imagem maliciosa; os do `postcss`, CSS malicioso. Nada disso acontece no
site publicado (HTML/CSS/JS servidos da CDN da Vercel). Superfície de ataque em
produção para esses advisories ≈ **zero**.

## Gatilho de reavaliação

- A cada **release do Next 16.x**: rodar `npm audit` de novo — o fix não-quebrante
  chega quando o Next atualizar o `postcss`/`sharp` embutidos.
- Se algum dia o projeto ganhar **runtime de servidor** (deixar de ser estático) ou
  passar a processar imagem/CSS de terceiro: reavaliar como bloqueante.
