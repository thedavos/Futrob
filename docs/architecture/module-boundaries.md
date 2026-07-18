# Límites de módulos

Estado: canónico  
Relacionado: [overview](/docs/architecture/overview.md) · [dependency-graph](/docs/architecture/dependency-graph.md)

## Bounded contexts (MVP)

| Módulo          | Responsabilidad                                                               |
| --------------- | ----------------------------------------------------------------------------- |
| `identity`      | Usuarios, sesiones, autenticación, perfil básico                              |
| `organizations` | Organizaciones, membresías, roles y permisos                                  |
| `competitions`  | Ligas/copas, formatos, etapas, reglas, edición FC                             |
| `teams`         | Equipos, plantillas, capitanes, jugadores, vínculo club externo               |
| `scheduling`    | Jornadas, rondas, enfrentamientos, slots oficiales, reprogramaciones          |
| `game-data`     | Proveedores externos, sync, payloads crudos, datos normalizados, health       |
| `results`       | Candidatos, selección oficial, confirmaciones, disputas, resultados oficiales |
| `statistics`    | Stats oficiales, tablas, rankings, premios                                    |
| `analytics`     | Analíticas premium (equipo, jugador, organizador)                             |
| `notifications` | Web, email (WhatsApp/push como ampliación)                                    |
| `public-portal` | Lecturas públicas sanitizadas                                                 |

`billing` está fuera del MVP.

## Capas dentro de un módulo

| Capa           | Puede                                             | No puede                                    |
| -------------- | ------------------------------------------------- | ------------------------------------------- |
| `domain`       | TS, `shared/domain`, tipos propios                | React, Zod, D1, fetch, Wrangler env, Sentry |
| `application`  | domain + ports                                    | adapters concretos, routes, UI              |
| `adapters`     | application/domain, `shared/infrastructure`, SDKs | UI de otro módulo; internals ajenos         |
| `server`       | use cases vía DI context; Zod input               | reglas de dominio                           |
| `presentation` | view models / server fns públicas                 | repositories concretos, `getDb()`           |
| `index.ts`     | exportar server fns, types públicos, ports        | adapters, schemas DB, mappers               |

## Separación crítica

```text
scheduling   → cuándo / cuántos partidos
game-data    → qué dicen las fuentes externas
results      → qué cuenta oficialmente
statistics   → consecuencias competitivas
analytics    → interpretación premium
```

## Cross-module permitido

```text
results application
  → ProviderMatchReaderPort
  → GameDataMatchReaderAdapter (bridge)
  → game-data public application API

statistics worker
  → OfficialResultReaderPort
  → ResultsOfficialResultReaderAdapter
  → results public API

scheduling
  → CompetitionScheduleRulesReaderPort
  → competitions public API
```

## Cross-module prohibido

```text
results → game-data/adapters/providers/ea-clubs/*
statistics → results/adapters/persistence/schemas
teams → identity DB tables
routes → getDb() / env.APP_DB
presentation → repository concrete
```

## Eventos versionados (contratos)

Publicados vía outbox; consumers idempotentes.

```text
organizations.member-role-changed
competitions.competition-created
competitions.competition-started
teams.external-club-connected
teams.roster-locked
scheduling.encounter-created
scheduling.reschedule-requested
scheduling.encounter-rescheduled
scheduling.encounter-ready-for-sync
game-data.provider-matches-synced
game-data.provider-match-discovered
results.official-matches-selected
results.official-selection-confirmed
results.match-dispute-opened
results.official-result-approved
statistics.competition-stats-rebuilt
statistics.rankings-updated
analytics.snapshot-generated
```

## Nomenclatura

| Dominio                                                         | Ports                  | Use cases                      | Adapters                               |
| --------------------------------------------------------------- | ---------------------- | ------------------------------ | -------------------------------------- |
| `Encounter`, `ProviderMatch`, `OfficialMatchSelection`          | `*Repository`, `*Port` | `SelectOfficialMatchesUseCase` | `D1*Adapter`, `EaClubsGameDataAdapter` |
| Específicos EA solo en `game-data/adapters/providers/ea-clubs/` |                        |                                |                                        |

## Persistencia Cloudflare

Adapters de persistencia usan D1 (no Postgres). Cache/opcional: KV o Cache API. Colas: Cloudflare Queues. Objetos grandes: R2. Los ejemplos con nombres `Postgres*` / `Redis*` / `BullMq*` en discusiones históricas se mapean a `D1*` / `Kv*` / `Queue*`.
