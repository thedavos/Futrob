import { describe, expect, it } from "vite-plus/test";
import { CryptoIdGenerator } from "@/shared/application/id-generator.ts";

describe("CryptoIdGenerator", () => {
  it("generates unique UUID strings", () => {
    const generator = new CryptoIdGenerator();
    const a = generator.generate();
    const b = generator.generate();

    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    expect(b).not.toBe(a);
  });
});
