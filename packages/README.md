# Packages Futrob — guía

Código compartido del monorepo. Los **bounded contexts de negocio** viven en [`apps/web/src/modules`](/apps/web/src/modules); aquí solo va lo que deben reutilizar web, un futuro worker, el SDK o tests.

Documento canónico: [`/docs/architecture/packages-and-sdk.md`](/docs/architecture/packages-and-sdk.md).

## Inventario

| Package                             | npm / pub name          | Rol                                                |
| ----------------------------------- | ----------------------- | -------------------------------------------------- |
| [`api-contracts`](./api-contracts/) | `@futrob/api-contracts` | Schemas Zod / OpenAPI de `/api/v1`                 |
| [`sdk`](./sdk/)                     | `@futrob/sdk`           | Cliente HTTP tipado (TypeScript, estilo Stainless) |
| [`sdk_dart`](./sdk_dart/)           | `futrob_sdk` (pub)      | Cliente HTTP tipado (Dart, mismo contrato)         |
| [`ui`](./ui/)                       | `@futrob/ui`            | Tokens y primitivas shadcn/Base UI                 |
| [`shared-kernel`](./shared-kernel/) | `@futrob/shared-kernel` | Result, IDs, DomainEvent (compartible web/worker)  |
| [`test-support`](./test-support/)   | `@futrob/test-support`  | Fakes y builders solo para tests                   |

## Reglas

1. **No** mover `results`, `game-data`, `scheduling`, etc. a `packages/` hasta que un segundo deployable necesite el use case in-process.
2. El **dominio hexagonal no importa Zod**. Zod vive en `api-contracts` y en adapters/server de web.
3. Los **SDKs no importan** `apps/web/src/modules` ni adapters. Solo contratos + HTTP hacia Futrob `/api/v1`.
4. **EA Clubs** vive solo en `apps/web/.../game-data/adapters/providers/ea-clubs/`. Ni `api-contracts` ni los SDKs conocen proclubs.ea.com.
5. **`ui` no conoce** competiciones, EA ni permisos.
6. Preferir imports por nombre de package (`@futrob/sdk`), no deep-imports a `src/` internos salvo el public `exports` del package.
7. **No crear `apps/api`** (ADR-0001). `/api/v1` vive en `apps/web` sobre use cases, no sobre el SDK.
8. En docs del repo, enlaces con ruta absoluta `/packages/...` o `/docs/...`.

## OpenAPI

Fuente: `@futrob/api-contracts` (`src/v1/openapi/document.ts`).

```bash
npm run generate:openapi -w @futrob/api-contracts
```

Artefactos en `packages/api-contracts/openapi/{openapi.json,openapi.yaml}`.

Servidos por `apps/web`:

- `GET /api/v1/openapi.json`
- `GET /api/v1/openapi.yaml`

## Quién depende de quién

```text
apps/web ─────────────► @futrob/ui
       └──────────────► @futrob/api-contracts
       └──────────────► @futrob/shared-kernel   (opcional)

apps/cli ─────────────► @futrob/shared-kernel
       └──────────────► @futrob/test-support
       └──── path @/* ► apps/web/src

@futrob/sdk ──────────► @futrob/api-contracts
futrob_sdk (Dart) ────► HTTP /api/v1 (mismos contratos)

Flutter / E2E ────────► SDKs
```

## Cómo añadir un endpoint

1. Definir request/response en `@futrob/api-contracts` bajo `src/v1/<resource>/`.
2. Actualizar `src/v1/openapi/document.ts` y regenerar OpenAPI.
3. Añadir método en `sdk/src/resources/<resource>.ts` y mirror en `sdk_dart`.
4. Exponerlo en `createFutrobClient` / `FutrobClient`.
5. Implementar handler en `apps/web/src/routes/api/v1/...` mapeando al use case.
6. Tests de contrato + smoke SDK con fetch/http fake.

## Cómo usar el SDK TypeScript

```ts
import { createFutrobClient } from "@futrob/sdk";

const futrob = createFutrobClient({
  baseUrl: "https://app.example.com/api/v1",
  getAccessToken: async () => token,
});

await futrob.meta.ping();
const { clubs } = await futrob.gameData.clubs.search({ query: "Fera" });
```

## Cómo usar el SDK Dart

```dart
final futrob = FutrobClient(
  baseUrl: 'https://app.example.com/api/v1',
  getAccessToken: () async => token,
);

final result = await futrob.gameData.clubs.search(query: 'Fera');
```

## Scripts desde la raíz

```bash
npm install
npm run check
npm run test
npm run typecheck
npm run generate:openapi -w @futrob/api-contracts
```

Dart (desde `packages/sdk_dart`):

```bash
dart pub get
dart analyze
dart test
```

## Anti-patrones

- Publicar el SDK como API de terceros en el MVP.
- Meter lógica de selección oficial o sync EA dentro del SDK.
- Servir el OpenAPI no oficial de EA como contrato Futrob.
- Importar D1 / Wrangler bindings desde cualquier package de `packages/`.
- Deep-import `@futrob/api-contracts/src/v1/.../internal`.
- Crear `apps/api` que consuma el SDK para servir la misma API.
