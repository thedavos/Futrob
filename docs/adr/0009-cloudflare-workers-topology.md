# ADR-0009: Topología Cloudflare Workers

- Estado: Aceptada
- Fecha: 2026-07-17
- Reemplaza: ADR-0009 Vercel + Realtime Supabase (retirado con el pivot de plataforma)

## Contexto

Se necesita hosting del web/BFF, jobs de sync EA y frescura de UI sin convertir un bus realtime en fuente de verdad. La plataforma elegida es Cloudflare.

## Decisión

- **Cloudflare Workers** hospeda TanStack Start (`apps/web`) con `@cloudflare/vite-plugin` y Wrangler.
- Bindings: D1 (`APP_DB`), R2 (`MEDIA_BUCKET`), Queues (`JOB_QUEUE` / outbox), Cron Triggers (despertar sync), secrets (auth, EA, email, Sentry).
- Preview y production usan bases/buckets/queues/secrets aislados.
- Invalidación de UI: refetch autorizado tras mutación; KV/DO opcionales como ayuda, nunca como verdad competitiva.
- Migraciones D1 se aplican con Wrangler fuera del request path.

## Consecuencias

- Operación alineada al edge de Cloudflare.
- Jobs deben ser resumibles e idempotentes dentro de límites de Worker/Queue.
- Si el sync crece, se puede particionar consumers sin cambiar puertos de dominio.

## Alternativas rechazadas

- Vercel como host Must.
- Supabase Queue/Cron/`pg_net` como orquestación Must.
- Clientes suscritos a tablas privadas como verdad.
