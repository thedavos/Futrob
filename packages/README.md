# Packages Futrob — guía

Código compartido del monorepo. Los **bounded contexts de negocio** viven en [`apps/web/src/modules`](/apps/web/src/modules); aquí solo va lo que deben reutilizar web, un futuro worker, el SDK o tests.

Documento canónico: [`/docs/architecture/packages-and-sdk.md`](/docs/architecture/packages-and-sdk.md).

## Inventario

| Package                             | npm name                | Rol                                               |
| ----------------------------------- | ----------------------- | ------------------------------------------------- |
| [`api-contracts`](./api-contracts/) | `@futrob/api-contracts` | Schemas Zod / tipos de `/api/v1`                  |
| [`sdk`](./sdk/)                     | `@futrob/sdk`           | Cliente HTTP tipado sobre esos contratos          |
| [`ui`](./ui/)                       | `@futrob/ui`            | Tokens y primitivas shadcn/Base UI                |
| [`shared-kernel`](./shared-kernel/) | `@futrob/shared-kernel` | Result, IDs, DomainEvent (compartible web/worker) |
| [`test-support`](./test-support/)   | `@futrob/test-support`  | Fakes y builders solo para tests                  |

## Reglas

1. **No** mover `results`, `game-data`, `scheduling`, etc. a `packages/` hasta que un segundo deployable necesite el use case in-process.
2. El **dominio hexagonal no importa Zod**. Zod vive en `api-contracts` y en adapters/server de web.
3. El **SDK no importa** `apps/web/src/modules` ni adapters. Solo `api-contracts` + HTTP.
4. **`ui` no conoce** competiciones, EA ni permisos.
5. Preferir imports por nombre de package (`@futrob/sdk`), no deep-imports a `src/` internos salvo el public `exports` del package.
6. En docs del repo, enlaces con ruta absoluta `/packages/...` o `/docs/...`.

## Quién depende de quién

```text
apps/web ─────────────► @futrob/ui
       └──────────────► @futrob/api-contracts
       └──────────────► @futrob/shared-kernel   (opcional; puede seguir en apps/web/src/shared al inicio)

apps/cli ─────────────► @futrob/shared-kernel
       └──────────────► @futrob/test-support
       └──── path @/* ► apps/web/src (dominio; ver apps/cli/README.md)

@futrob/sdk ──────────► @futrob/api-contracts

apps/worker (futuro) ─► @futrob/shared-kernel
                     └► @futrob/api-contracts   (si valida mensajes/HTTP)

tests ────────────────► @futrob/test-support
                     └► @futrob/sdk             (E2E / contract)
```

## Cómo añadir un endpoint al SDK

1. Definir request/response en `@futrob/api-contracts` bajo `src/v1/<resource>/`.
2. Exportar desde `api-contracts/src/v1/index.ts` y el root `index.ts`.
3. Añadir método en `sdk/src/resources/<resource>.ts`.
4. Exponerlo en `createFutrobClient`.
5. Implementar el handler en `apps/web` (server fn o `/api/v1`) mapeando al use case del módulo.
6. Añadir test de contrato (schema) y, si aplica, smoke del SDK con fetch fake.

## Cómo usar el SDK (cuando la API exista)

```ts
import { createFutrobClient } from "@futrob/sdk";

const futrob = createFutrobClient({
  baseUrl: "https://app.example.com/api/v1",
  getAccessToken: async () => token,
});

// Métodos reales se irán añadiendo por resource.
const health = await futrob.meta.ping();
```

Hoy el cliente es un **scaffold**: `meta.ping` es un placeholder; los resources de negocio están stubbed.

## Scripts desde la raíz

```bash
npm install
npm run typecheck          # incluye workspaces con typecheck
```

Typecheck por package:

```bash
npm run typecheck -w @futrob/api-contracts
npm run typecheck -w @futrob/sdk
npm run typecheck -w @futrob/shared-kernel
npm run typecheck -w @futrob/ui
npm run typecheck -w @futrob/test-support
```

## Orden de madurez recomendado

1. Rellenar `api-contracts` al cablear `/api/v1`.
2. Completar `sdk` resource por resource alineado a contratos.
3. Generar componentes en `ui` con shadcn/Base UI.
4. Migrar tipos de `apps/web/src/shared` → `shared-kernel` cuando `apps/worker` exista.
5. Extraer un módulo de negocio a package **solo** si el worker lo necesita in-process.

## Anti-patrones

- Publicar el SDK como API de terceros en el MVP.
- Meter lógica de selección oficial o sync EA dentro del SDK.
- Importar D1 / Wrangler bindings desde cualquier package de `packages/`.
- Deep-import `@futrob/api-contracts/src/v1/.../internal`.
