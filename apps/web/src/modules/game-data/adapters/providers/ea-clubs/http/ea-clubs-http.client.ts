import { err, ok, type Result } from "@/shared/domain/result.ts";
import {
  eaClubsHttpError,
  type EaClubsHttpError,
} from "@/modules/game-data/adapters/providers/ea-clubs/errors/ea-clubs.errors.ts";

export interface EaClubsHttpClientOptions {
  readonly fetcher: typeof fetch;
  readonly baseUrl: string;
  readonly timeoutMs: number;
}

export class EaClubsHttpClient {
  private readonly fetcher: typeof fetch;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(options: EaClubsHttpClientOptions) {
    this.fetcher = options.fetcher;
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.timeoutMs = options.timeoutMs;
  }

  async getJson(
    path: string,
    query: Record<string, string | number | undefined>,
  ): Promise<Result<unknown, EaClubsHttpError>> {
    const url = new URL(`${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`);
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await this.fetcher(url.toString(), {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      const raw: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        return err(
          eaClubsHttpError("game_data.ea_clubs_http_error", "EA Clubs request failed", {
            status: response.status,
            path,
            body: raw,
          }),
        );
      }

      return ok(raw);
    } catch (cause) {
      const aborted = cause instanceof Error && cause.name === "AbortError";
      return err(
        eaClubsHttpError(
          aborted ? "game_data.ea_clubs_timeout" : "game_data.ea_clubs_network_error",
          aborted ? "EA Clubs request timed out" : "EA Clubs network error",
          { path, cause: cause instanceof Error ? cause.message : String(cause) },
        ),
      );
    } finally {
      clearTimeout(timer);
    }
  }
}
