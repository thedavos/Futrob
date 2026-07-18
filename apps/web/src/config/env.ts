export interface AppEnv {
  readonly APP_BASE_URL: string;
  readonly BETTER_AUTH_SECRET: string;
  readonly BETTER_AUTH_URL: string;
  readonly EA_CLUBS_BASE_URL: string;
  readonly INTERNAL_JOB_SECRET: string;
}

export function parseAppEnv(source: Record<string, string | undefined>): AppEnv {
  const required = [
    "APP_BASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "EA_CLUBS_BASE_URL",
    "INTERNAL_JOB_SECRET",
  ] as const;

  for (const key of required) {
    if (!source[key]) {
      // Soft parse during scaffold — harden when Worker boots for real.
      console.warn(`[env] missing ${key}`);
    }
  }

  return {
    APP_BASE_URL: source.APP_BASE_URL ?? "http://localhost:3000",
    BETTER_AUTH_SECRET: source.BETTER_AUTH_SECRET ?? "",
    BETTER_AUTH_URL: source.BETTER_AUTH_URL ?? "http://localhost:3000",
    EA_CLUBS_BASE_URL: source.EA_CLUBS_BASE_URL ?? "https://proclubs.ea.com/api/fc",
    INTERNAL_JOB_SECRET: source.INTERNAL_JOB_SECRET ?? "",
  };
}
