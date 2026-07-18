# ADR-0001: Monorepo y un deployable TanStack Start en Cloudflare Workers

- Estado: Aceptada
- Fecha: 2026-07-10
- Actualizada: 2026-07-17

## Contexto

El producto necesita UI, BFF, API privada, auth y jobs de sincronización EA. Separar `apps/api` y `apps/worker` desde el día uno duplica configuración sin una necesidad de escalado demostrada. El runtime objetivo es Cloudflare Workers.

## Decisión

Usar workspaces npm con `apps/web` (TanStack Start + `@cloudflare/vite-plugin` + Wrangler) como único **deployable de producto** del MVP. Los bounded contexts viven como feature modules en `apps/web/src/modules/*` con composition exclusiva en `apps/web/src/di/`. El mismo Worker expone server functions, `/api/v1`, `/api/auth`, consumers de Queues y Cron Triggers sobre los mismos use cases.

`apps/cli` es un workspace de tooling local para probar dominio/use cases con fakes; no se despliega y no sustituye a web.

No crear `apps/api`. No crear `apps/worker` mientras los stages de sync EA quepan en los límites medidos del Worker/Queue. La cola permanece durable (Cloudflare Queues).

## Consecuencias

- Un solo build/preview/release reduce drift.
- Los límites se cumplen por packages e import rules.
- Un consumer/worker dedicado podrá extraerse sin mover dominio si duración o runtime lo exigen.

## Alternativas rechazadas

- Tres apps desde el día uno.
- Client-only SPA.
- Vercel + Supabase como plataforma Must.
