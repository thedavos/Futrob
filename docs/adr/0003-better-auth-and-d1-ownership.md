# ADR-0003: Ownership de Better Auth y D1

- Estado: Aceptada
- Fecha: 2026-07-17
- Reemplaza: ADR-0003 Better Auth + Supabase (retirado con el pivot de plataforma)

## Contexto

Se necesita autenticación web moderna y autorización multi-tenant por organización/competición/equipo. Cloudflare D1 es el SQL primario. No se usa Supabase Auth.

## Decisión

- Better Auth posee credenciales, sesiones, verificaciones y tablas de autenticación en D1.
- Futrob posee `Actor`, `IdentitySubject`, organizations, memberships, roles y permisos.
- `(provider, subject)` se resuelve a `ActorId` estable.
- No se usa el plugin de organizations de Better Auth como modelo de negocio.
- La sesión demuestra identidad; los use cases determinan autorización.

## Consecuencias

- Schema auth y negocio coexisten en D1 con ownership claro.
- Migraciones auth siguen el flujo Wrangler D1 junto al schema de producto.
- Los aggregates nunca referencian tablas de Better Auth directamente.

## Alternativas rechazadas

- Supabase Auth / Postgres RLS como autoridad.
- JWT con roles embebidos editables por el cliente.
- Organizations plugin de Better Auth como tenant model.
