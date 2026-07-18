import { describe, expect, it } from "vite-plus/test";
import { SystemClock } from "@/shared/application/clock.ts";

describe("SystemClock", () => {
  it("returns the current instant", () => {
    const clock = new SystemClock();
    const before = Date.now();
    const now = clock.now();
    const after = Date.now();

    expect(now.getTime()).toBeGreaterThanOrEqual(before);
    expect(now.getTime()).toBeLessThanOrEqual(after);
  });

  it("returns an ISO timestamp", () => {
    const clock = new SystemClock();
    expect(clock.isoNow()).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
