import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { stringify } from "yaml";
import { futrobOpenApiV1 } from "../src/v1/openapi/document.ts";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "../openapi");
mkdirSync(outDir, { recursive: true });

const jsonPath = join(outDir, "openapi.json");
const yamlPath = join(outDir, "openapi.yaml");

writeFileSync(jsonPath, `${JSON.stringify(futrobOpenApiV1, null, 2)}\n`, "utf8");
writeFileSync(yamlPath, stringify(futrobOpenApiV1), "utf8");

console.warn(`Wrote ${jsonPath}`);
console.warn(`Wrote ${yamlPath}`);
