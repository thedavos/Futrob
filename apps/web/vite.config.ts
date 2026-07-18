import path from "node:path";
import { fileURLToPath } from "node:url";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const isVitest = process.env.VITEST != null;

async function createAppPlugins() {
  if (isVitest) {
    return [viteReact()];
  }

  const [{ cloudflare }, { tanstackStart }] = await Promise.all([
    import("@cloudflare/vite-plugin"),
    import("@tanstack/react-start/plugin/vite"),
  ]);

  return [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    // React plugin must come after tanstackStart.
    viteReact(),
  ];
}

/**
 * App Vite config for @futrob/web.
 * Runtime: TanStack Start + Cloudflare Workers.
 * Quality (fmt/lint/check) is owned by the repo-root vite.config.ts (oxfmt/oxlint via Vite+).
 */
export default defineConfig({
  root: rootDir,
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  plugins: [createAppPlugins()],
  test: {
    name: "web",
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
