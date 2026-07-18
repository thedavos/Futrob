# Bootstrap Futrob (greenfield Cloudflare)

Prepare a clean checkout for the upcoming Workers scaffold. Application code is not present yet.

1. Read `README.md`, `AGENTS.md`, `product/prd.md`, and `docs/architecture/overview.md`.
2. Confirm Node satisfies `package.json#engines`.
3. Copy `.env.example` to `.env.local` / `.dev.vars` when scaffolding; keep placeholders until services are provisioned.
4. When creating the app, follow the Cloudflare TanStack Start Workers guide (`@cloudflare/vite-plugin`, Wrangler, `nodejs_compat`).
5. Bind D1, R2, Queues, and Cron in `wrangler.jsonc`; put secrets in Wrangler secrets / `.dev.vars`, never in git.
6. Apply D1 migrations with the supported Wrangler workflow from an empty local database.
7. Report which integrations are configured, intentionally disabled, or blocked. Never invent successful connectivity.
8. If a stale `node_modules/` from the previous stack remains, remove it locally before installing the new workspace.
