# AGENTS.md

## Mission

Build Futrob MVP (FC Clubs) per `product/`. Architecture: hexagonal feature modules on Cloudflare Workers.

## Read first

1. `product/prd.md`, requirements, glossary, open-decisions
2. `docs/architecture/overview.md`, module-boundaries, dependency-graph, ADRs
3. `.cursor/skills/futrob-hexagonal-module/SKILL.md`

## Preferred skills (by phase)

| Skill                     | Use for                                      |
| ------------------------- | -------------------------------------------- |
| `futrob-hexagonal-module` | Any module / use case                        |
| shadcn (+ Base UI)        | `packages/ui` primitives                     |
| better-ui                 | Screen visual quality                        |
| gsap                      | Landing / bracket motion (presentation only) |
| layers-domain             | Domain vocabulary before code                |
| layers-interaction-flow   | Captain / sync / officialize flows           |
| web-perf                  | Portal, lists, Workers budgets               |
| seo                       | Public landing + competition portal          |

Also: Cloudflare/wrangler, Sentry, TypeScript best practices. See `.cursor/rules/agent-skills.mdc`.

## Code shape

- Deployable: `apps/web` (TanStack Start → Cloudflare Workers)
- CLI local: `apps/cli` — playground de dominio/use cases (no deployable de producto); ver `/apps/cli/README.md`
- Modules: `apps/web/src/modules/<context>/`
- Composition: `apps/web/src/{di,bootstrap,config,context}/`
- Shared: `apps/web/src/shared/`
- Workers: `apps/web/src/workers/`
- Packages: `packages/{api-contracts,sdk,ui,shared-kernel,test-support}` — ver `/packages/README.md`

MVP modules: identity, organizations, competitions, teams, scheduling, **game-data**, results, statistics, analytics, notifications, public-portal. `billing` out of MVP.

## Rules

- Domain pure; adapters own D1/R2/Queues/HTTP/EA.
- `index.ts` public API only; never export adapters.
- Cross-module via ports/bridges/events — never foreign tables.
- EA specifics only in `game-data/adapters/providers/ea-clubs/`.
- Official stats only after `results.official-result-approved`.
- Organization-scoped D1 queries; no Postgres RLS / Supabase / Vercel as Must.

## Separation

```text
scheduling ≠ game-data ≠ results ≠ statistics ≠ analytics
```

## Commands

```bash
vp install          # preferred (or npm ci)
npm run check       # vp check — fmt + lint + type-aware
npm run test        # vp test
npm run typecheck   # tsc across workspaces
npm run dev         # vp dev apps/web
npm run build       # vp build apps/web
npm run cli -- help
```

`apps/cli` has no local Vite+ app config — only root fmt/lint. Do not claim Workers/EA integrations work without direct evidence.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
