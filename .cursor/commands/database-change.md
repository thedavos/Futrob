# Create a Cloudflare D1 database change

1. Read current Cloudflare D1 / Wrangler docs for migration and binding behavior.
2. Run `npx wrangler --help` and the relevant subgroup `--help`; do not guess flags.
3. Create the migration with the supported Wrangler D1 migration command.
4. Use expand/migrate/contract for incompatible changes.
5. Every tenant table includes `organization_id` (or equivalent) and adapters always scope by it.
6. Auth schema changes for Better Auth are reviewed SQL checked into D1 migrations.
7. Add adapter mapping and two-organization isolation tests when code exists.
8. Apply migrations to a clean local D1, then run relevant tests and `npm run check`.
