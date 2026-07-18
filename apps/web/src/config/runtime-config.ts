import type { AppEnv } from "@/config/env.ts";
import type { FeatureFlags } from "@/config/feature-flags.ts";

export interface RuntimeConfig {
  readonly env: AppEnv;
  readonly flags: FeatureFlags;
}
