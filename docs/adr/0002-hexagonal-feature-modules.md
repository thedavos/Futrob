# ADR-0002: Hexágonos por feature module

- Estado: Aceptada
- Fecha: 2026-07-10
- Actualizada: 2026-07-17

## Contexto

Futrob necesita vertical slices independientes y un composition root único, sin mezclar scheduling, game-data, results y statistics.

## Decisión

Adoptar arquitectura hexagonal **por feature module** bajo `apps/web/src/modules/<context>/` con capas `domain` / `application` / `adapters` / `server` / `presentation` y API pública en `index.ts`.

El ensamblaje de adapters y use cases ocurre **exclusivamente** en `apps/web/src/di/`.

Kernel compartido mínimo en `apps/web/src/shared/{domain,application,infrastructure,contracts}`.

## Consecuencias

- Separación clara de ownership y tests sin I/O en dominio.
- Cross-module solo por ports, APIs públicas y eventos versionados.
- Más boilerplate de DI y bridges; se acepta.

## Alternativas rechazadas

- Un único módulo `matches` que mezcle fixture, EA, selección y stats.
- Packages por capa técnica (`domain/`, `infra/`) sin vertical slice.
- DI/reflectivo global o importar adapters desde routes.
