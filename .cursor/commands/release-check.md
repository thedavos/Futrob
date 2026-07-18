# Run the Futrob release gate

1. Confirm requested Must/Should acceptance IDs and explicitly list deferred work.
2. When the workspace exists, run `npm ci`, `npm run check`, `npm test`, and `npm run build` from the repository root.
3. Apply clean local D1 migrations and execute isolation, contract, integration, and E2E suites that exist for the release.
4. Verify landing, authenticated shell, Match Center selection flow, standings/bracket/rankings, and public portal in both locales.
5. Check no secret or unsanitized production EA payload is tracked and telemetry redaction tests pass.
6. Confirm preview and production Cloudflare bindings/secrets are isolated; do not report deploy healthy without direct evidence.
7. Report command outputs, skipped checks, open risks, migration order, and rollback/recovery steps.

If `apps/` is not scaffolded yet, report that the release gate cannot run and stop after documenting the blocker.
