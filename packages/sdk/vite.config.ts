import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    name: "sdk",
    environment: "node",
    include: ["src/**/*.{test,spec}.ts"],
  },
});
