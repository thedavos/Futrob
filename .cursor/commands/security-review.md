# Review Futrob security

1. Trace identity from Better Auth subject to `ActorId`, membership, permission decision, and organization-scoped D1 access.
2. Test cross-organization reads, writes, job claims, and public projections with predictable IDs.
3. Verify browser code has no server secrets, Wrangler secrets, or direct private table access.
4. Review EA sync job auth, idempotency, rate limits, and that provider credentials never reach the client.
5. Review raw EA payload access paths (D1/R2); public portal and telemetry must not leak payloads or tokens.
6. Replay sync jobs, confirmations, outbox events, notifications, and officialization commands to prove no duplicate effects.
7. Pass representative payloads through logs and Sentry redaction; assert secrets and raw provider bodies are absent.
8. Report findings by severity with reproducible evidence and affected acceptance criteria.
