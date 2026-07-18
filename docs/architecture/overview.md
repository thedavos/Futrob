# Arquitectura canónica de Futrob

Estado: canónica para el MVP  
Fecha: 2026-07-17  
Plataforma: Cloudflare Workers + D1 + R2 + Queues + Cron Triggers

## Propósito

Futrob opera competiciones EA SPORTS FC (MVP: FC Clubs) con separación estricta entre:

| Capa           | Responsabilidad                                                                    |
| -------------- | ---------------------------------------------------------------------------------- |
| **scheduling** | Qué debía jugarse y cuándo (jornadas, enfrentamientos, slots, reprogramaciones)    |
| **game-data**  | Lo que fuentes externas dicen que ocurrió (EA Clubs hoy; manual/OCR/otros después) |
| **results**    | Qué registros cuentan oficialmente (candidatos, selección, confirmación, disputas) |
| **statistics** | Consecuencias competitivas (tabla, rankings, stats oficiales)                      |
| **analytics**  | Interpretación premium del rendimiento                                             |

No se agrupa programación, datos de proveedor, selección oficial y stats en un único módulo `matches`.

## Drivers

- TanStack Start + React en `apps/web`, desplegado en **Cloudflare Workers**.
- Hexagonal **por feature module** (vertical slice). Ensamblaje solo en `src/di/`.
- Better Auth (identidad) + Futrob (autorización/orgs).
- D1 / R2 / Queues / Cron. Tenancy scoped en aplicación (sin RLS Postgres).
- shadcn/Base UI, Vite+, Sentry en boundaries.
- `apps/cli` para ejercitar dominio/use cases en local (no es deployable de producto).
- `billing` queda fuera del MVP inicial.

## Forma del sistema

```text
apps/cli/                   # playground local — ver apps/cli/README.md
apps/web/
├── wrangler.jsonc
├── vite.config.ts
└── src/
    ├── di/                     # ÚNICO composition root de módulos
    ├── bootstrap/
    ├── config/
    ├── context/                # auth / organization / permissions (per-request identity)
    ├── modules/                # Bounded contexts (vertical slices)
    │   ├── identity/
    │   ├── organizations/
    │   ├── competitions/
    │   ├── teams/
    │   ├── scheduling/
    │   ├── game-data/
    │   ├── results/
    │   ├── statistics/
    │   ├── analytics/
    │   ├── notifications/
    │   └── public-portal/
    ├── routes/                 # TanStack Router / Start
    ├── shared/
    │   ├── domain/
    │   ├── application/
    │   ├── infrastructure/     # db, cache, queue, observability, outbox, http
    │   ├── presentation/
    │   └── contracts/          # events + read-models versionados
    └── workers/                # consumers Queue/Cron thin handlers
```

Cada módulo:

```text
src/modules/<context>/
├── domain/          # entities, VOs, errors, events, ports
├── application/     # use cases (un folder por caso)
├── adapters/        # persistence, bridges, providers, observability
├── server/          # server functions delgadas
├── presentation/    # UI del feature
└── index.ts         # API pública únicamente
```

`index.ts` no exporta adapters, schemas DB, mappers ni clientes HTTP. Los internals solo se importan desde `src/di/` (alias `@/modules/<ctx>/internal` o path privado).

## Flujo de dependencias

```text
Routes / UI
  → module/server
  → application/use-case
  → domain/entities + domain/ports
  → adapters
  → D1 / R2 / Queues / EA HTTP / email / Sentry
```

Asíncrono:

```text
Use case → Domain event → Outbox → Queue worker → Use case de otro módulo
```

Ejemplo:

```text
SelectOfficialMatches
  → OfficialMatchesSelected
  → notifications worker
ConfirmOfficialSelection
  → OfficialResultApproved
  → statistics projection worker
  → RebuildCompetitionStatistics
  → analytics snapshot worker
```

## Composition roots

| Scope            | Archivo                                        | Rol                           |
| ---------------- | ---------------------------------------------- | ----------------------------- |
| Proceso / Worker | `bootstrap/create-app-context.ts`              | env, bindings, factories base |
| Request          | `bootstrap/create-request-context.ts` + `di/*` | sesión, org, módulos          |
| Jobs             | `bootstrap/register-workers.ts` + `workers/*`  | consumers idempotentes        |

Solo `src/di/*.module.ts` instancia adapters y use cases.

## Identidad y tenancy

- Better Auth → sesión.
- `organizations` → membresías, roles, permisos.
- Toda query tenant-scoped filtra por `organizationId` en adapters D1.
- `public-portal` solo lee proyecciones sanitizadas.

## game-data (proveedores)

`game-data` es el único módulo que conoce adapters de fuentes externas. EA Clubs es un adapter bajo `adapters/providers/ea-clubs/`. El dominio usa modelos neutrales (`ProviderMatch`, `ExternalClub`, `RawProviderObservation`) e identidad `UNIQUE(provider_key, external_id)`.

Proveedores MVP: `ea-clubs`, `manual`. Extensiones futuras (`screenshot-ocr`, comunitarios) no cambian `results` / `statistics` / `scheduling`.

## Propiedad de datos

| Módulo        | Posee                                                             |
| ------------- | ----------------------------------------------------------------- |
| identity      | users/sessions/accounts (vía Better Auth + mapping Actor)         |
| organizations | organizations, memberships, permissions                           |
| competitions  | competitions, rules, stages, entries                              |
| teams         | teams, rosters, external club connections                         |
| scheduling    | rounds, encounters, official slots, reschedules                   |
| game-data     | raw observations, provider matches/clubs, sync jobs, health       |
| results       | candidates, selections, confirmations, disputes, official results |
| statistics    | standings, official player/team stats, rankings                   |
| analytics     | premium snapshots                                                 |
| notifications | notification intents/deliveries                                   |
| public-portal | read models publicados (o proyecciones propias)                   |

Un módulo no escribe tablas ajenas; publica eventos / usa ports de lectura.

## Decisiones relacionadas

- [ADR-0001](/docs/adr/0001-monorepo-and-tanstack-start-deployable.md)
- [ADR-0002](/docs/adr/0002-hexagonal-feature-modules.md)
- [ADR-0003](/docs/adr/0003-better-auth-and-d1-ownership.md)
- [ADR-0004](/docs/adr/0004-multi-tenant-d1-scoping.md)
- [ADR-0005](/docs/adr/0005-typed-private-api.md)
- [ADR-0006](/docs/adr/0006-game-data-provider-port.md)
- [ADR-0007](/docs/adr/0007-immutable-provider-observations.md)
- [ADR-0008](/docs/adr/0008-notifications-web-and-email.md)
- [ADR-0009](/docs/adr/0009-cloudflare-workers-topology.md)
- [module-boundaries.md](/docs/architecture/module-boundaries.md)
- [dependency-graph.md](/docs/architecture/dependency-graph.md)

Producto: [product/prd.md](/product/prd.md) · [domain-glossary.md](/product/domain-glossary.md)

Monorepo packages/SDK (propuesta): [packages-and-sdk.md](/docs/architecture/packages-and-sdk.md)
