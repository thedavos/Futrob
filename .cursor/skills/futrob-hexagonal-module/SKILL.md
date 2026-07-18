---
name: futrob-hexagonal-module
description: Create or extend a Futrob hexagonal feature module under apps/web/src/modules with DI only in src/di. Use when adding bounded contexts, use cases, ports, adapters, or server functions.
---

# Futrob hexagonal feature module

## When to use

Adding or changing a bounded context, use case, port, adapter, bridge, server function, or cross-module event in Futrob.

## Canonical layout

```text
apps/web/src/modules/<context>/
├── domain/{entities,value-objects,errors,events,ports,policies}
├── application/<use-case-name>/
├── adapters/{persistence,bridges,observability,providers?}
├── server/
├── presentation/
└── index.ts          # public API only
```

Composition **only** in `apps/web/src/di/<context>.module.ts` (assembled from `create-modules.ts` / request context).

## Module map (MVP)

`identity` · `organizations` · `competitions` · `teams` · `scheduling` · `game-data` · `results` · `statistics` · `analytics` · `notifications` · `public-portal`

Critical separation:

```text
scheduling → when/how many
game-data  → what providers report
results    → what counts officially
statistics → competitive projections
analytics  → premium interpretation
```

Never put EA-specific types in `results`/`statistics`/`scheduling`. EA lives under `game-data/adapters/providers/ea-clubs/`.

## Rules

1. Domain imports only TypeScript + `shared/domain` (+ own types). No Zod, D1, fetch, Sentry, React.
2. Application depends on domain ports; never concrete adapters.
3. `index.ts` exports use cases/types/ports/server fns — never adapters, DB schemas, mappers, HTTP clients.
4. Cross-module: public API, reader ports + bridges in consumer adapters, or versioned events via outbox.
5. Persistence adapters target **D1/R2/Queues** (Cloudflare), not Postgres/Redis/BullMQ names.
6. Tenancy: every tenant write/read scopes by `organizationId` in adapters.
7. Official stats update only after `results.official-result-approved`.

## Checklist for a new use case

1. Place folder under `application/<kebab-name>/` with `*.use-case.ts` (+ input type).
2. Add/adjust domain ports and errors.
3. Wire concrete adapters in `di/<module>.module.ts` only.
4. Add thin `server/*.server.ts` when exposed to UI/API (validate input, call use case, unwrap Result).
5. If cross-module effect: emit domain event name from `shared/contracts/events/catalog.ts`.
6. Update `docs/architecture/module-boundaries.md` if ownership changes.
7. Add domain/application tests with fake ports.

## Imports

Use `@/` aliases for all TypeScript imports (including within the same module). Do not use `../` / `../../`.

## Anti-patterns

- `routes` or `presentation` calling `env.APP_DB` / repositories
- Importing `@/modules/game-data/adapters/providers/ea-clubs/*` from outside `src/di` or game-data itself
- Writing `statistics` tables from `results` use cases
- Naming the provider context `ea-data` or bare `provider`
- Parent-relative import paths (`../`, `../../`)
