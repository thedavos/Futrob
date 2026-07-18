import { describe, expect, it } from "vite-plus/test";
import { externalReferenceKey } from "@/modules/game-data/domain/value-objects/external-reference.ts";

describe("externalReferenceKey", () => {
  it("joins provider key and external id", () => {
    expect(externalReferenceKey({ providerKey: "ea-clubs", externalId: "club-42" })).toBe(
      "ea-clubs:club-42",
    );
  });
});
