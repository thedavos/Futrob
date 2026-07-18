# `@futrob/cli`

CLI local para **probar dominio y use cases** mientras construyes Futrob. No es un deployable de producto (eso sigue siendo `apps/web`).

## Para qué sirve

- Ejercitar entidades, value objects y reglas puras sin UI ni Workers.
- Correr use cases con **fakes en memoria** (ports) antes de tener D1/R2.
- Smoke rápido de flujos (encuentro → candidatos EA → selección oficial) desde la terminal.

## Qué no es

- No sustituye Vitest (los tests siguen en el módulo / `packages/test-support`).
- No es API pública ni herramienta de ops en producción.
- No importa adapters de Cloudflare (D1, Queues, EA HTTP real) salvo comandos explícitos de integración más adelante.
- No mueve el dominio fuera de `apps/web/src/modules` — solo lo consume.

## Cómo corre el dominio de web

Los módulos viven en `apps/web/src/modules`. El CLI resuelve el alias `@/*` → `apps/web/src/*` (ver `tsconfig.json`) para poder importar dominio/application igual que web.

```ts
import type { Encounter } from "@/modules/scheduling/domain/entities/encounter.ts";
import { ok } from "@futrob/shared-kernel";
```

Cuando un segundo deployable necesite el mismo código in-process de forma estable, se evalúa extraer a `packages/` (ver `/docs/architecture/packages-and-sdk.md`). Hasta entonces, este path alias es intencional.

## Uso

Desde la raíz del monorepo:

```bash
npm install
npm run cli -- help
npm run cli -- ping
npm run cli -- domain-smoke
```

Desde el workspace:

```bash
npm run cli -w @futrob/cli -- help
```

## Comandos

| Comando        | Descripción                                               |
| -------------- | --------------------------------------------------------- |
| `help`         | Lista comandos                                            |
| `ping`         | Comprueba que el CLI arranca                              |
| `domain-smoke` | Smoke del kernel + tipos de dominio de scheduling/results |

## Añadir un comando de dominio

1. Crea `src/commands/<nombre>.ts` que exporte `run(args: string[]): Promise<number>` (exit code).
2. Regístralo en `src/main.ts`.
3. Importa solo `domain` / `application` (+ fakes). Evita `adapters` de web.
4. Usa `@futrob/test-support` para builders compartidos cuando existan.
5. Documenta el comando en esta tabla.

Ejemplo de composición en el comando:

```ts
// fake ports → use case → print Result
const result = await selectOfficialMatches.execute(command);
if (!result.ok) {
  console.error(result.error);
  return 1;
}
console.log(result.value);
return 0;
```

## Layout

```text
apps/cli/
├── README.md
├── package.json
├── tsconfig.json
└── src/
    ├── main.ts
    ├── commands/
    │   ├── help.ts
    │   ├── ping.ts
    │   └── domain-smoke.ts
    └── lib/
        └── print.ts
```

## Vite+ / quality tooling

`apps/cli` **does not** install `vite-plus` or run as a Vite app. It stays on `tsx` + TypeScript.

Fmt / lint / `vp check` for CLI sources come from the **repo-root** `vite.config.ts` (Node override with `no-console` off). Use:

```bash
vp fmt
vp lint
vp check
```

## Typecheck

```bash
npm run typecheck -w @futrob/cli
# or from root:
npm run typecheck
```
