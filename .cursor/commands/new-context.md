# Add a Futrob hexagonal feature module

Use when a capability cannot belong to an existing module under `apps/web/src/modules`.

1. Confirm ownership in `docs/architecture/module-boundaries.md`. Prefer extending an existing module.
2. Create `apps/web/src/modules/<context>/` with `domain`, `application`, `adapters`, `server`, `presentation`, and public `index.ts`.
3. Add `apps/web/src/di/<context>.module.ts` and wire it from `create-modules.ts` / request composition.
4. Keep provider names and D1/R2 types in adapters; keep domain pure.
5. Cross-module only via public API, reader ports/bridges, or versioned events in `shared/contracts/events`.
6. Update module-boundaries + dependency-graph if the DAG changes; ADR if material.
7. Follow `.cursor/skills/futrob-hexagonal-module/SKILL.md`.
8. Add focused domain/application tests with fake ports.
