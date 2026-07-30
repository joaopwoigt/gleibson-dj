# gleibson-dj-site

Site-portfólio do **DJ Gleib** (Gleibson Santos Possidonio, @gleibdj) — cliente da w² Agência.

Site estático dual-mode (Eventos / Balada), sem servidor. Deploy na Vercel (plano Pro).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 (CSS-first)
- Export estático (`output: 'export'` → pasta `out/`)
- Deploy: Vercel (plano Pro — uso comercial; Hobby vetado por ToS)

## Rodar localmente

```bash
npm run dev     # dev server em http://localhost:3000
npm run build   # gera o site estático em out/
```

## Documentação (mora no hub da w²)

O código vive aqui; o planejamento, o design system e as tasks vivem no hub, em `clientes/gleibson-dj/`:

- **Plano técnico:** `clientes/gleibson-dj/PLAN.md`
- **Tasks (7 fases, 29 itens):** `clientes/gleibson-dj/task-tracking/`
- **Design system (fonte de verdade dos tokens):** `clientes/gleibson-dj/branding/04-design-system/` → copiado para `design-system/` na raiz deste repo (Task 02)
- **Discovery / dados do cliente:** `clientes/gleibson-dj/discovery.md`

## Convenções

- Perfil B (playbook): estrutura enxuta `app/` + `components/` + `config/` + `lib/`. Sem `src/`.
- Sem SSR em runtime, sem API, sem formulário. CTA é link `wa.me`.
- Dual-mode via `data-mode="eventos" | "balada"` no elemento-raiz; tudo troca por CSS vars `--ds-*`.
