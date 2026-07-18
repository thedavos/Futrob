# `@futrob/ui`

Tokens y primitivas shadcn/Base UI. Sin conocimiento de competiciones, EA ni permisos.

- `styles.css`: fuentes autohospedadas, reset y estilos globales.
- `tokens.css`: paleta OKLCH Pitch Ops, tokens semánticos light/dark, tipo, espacio y movimiento.
- `components/`: primitivas shadcn (`base-nova` sobre Base UI).
- `Logo`: mark accesible con variante de marca o `monochrome`.

```tsx
import { Button, Logo } from "@futrob/ui";
// or: import { Button } from "@futrob/ui/components/button"
import "@futrob/ui/styles.css";

<Logo className="h-8 w-auto" />
<Button>Continuar</Button>
```

Añadir primitivas desde la raíz del monorepo (instala en `packages/ui`):

```bash
npx shadcn@latest add dialog -y -c apps/web
```

Guía: [`/packages/README.md`](/packages/README.md).
