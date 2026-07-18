import { apiErrorSchema } from "../errors.ts";
import { pingResponseSchema } from "../meta/ping.response.ts";
import {
  externalClubSchema,
  getClubMatchesResponseSchema,
  providerMatchSchema,
  searchClubsResponseSchema,
} from "../game-data/schemas.ts";

/** OpenAPI 3.1 document for Futrob private `/api/v1`. Regenerated via `npm run generate:openapi -w @futrob/api-contracts`. */
export const futrobOpenApiV1 = {
  openapi: "3.1.0",
  info: {
    title: "Futrob Private API",
    version: "0.1.0",
    description:
      "Private HTTP API for Futrob clients (web, Flutter, scripts). Not a public third-party API.",
  },
  servers: [{ url: "/api/v1", description: "Same Worker as apps/web" }],
  security: [{ bearerAuth: [] }],
  tags: [
    { name: "meta", description: "Health and discovery" },
    {
      name: "game-data",
      description: "Provider observations (neutral DTOs; EA stays server-side)",
    },
  ],
  paths: {
    "/meta/ping": {
      get: {
        operationId: "metaPing",
        tags: ["meta"],
        summary: "Health ping",
        security: [],
        responses: {
          "200": {
            description: "Service is up",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PingResponse" },
              },
            },
          },
        },
      },
    },
    "/openapi.json": {
      get: {
        operationId: "getOpenApiJson",
        tags: ["meta"],
        summary: "OpenAPI document (JSON)",
        security: [],
        responses: {
          "200": {
            description: "OpenAPI 3.1 JSON",
            content: { "application/json": { schema: { type: "object" } } },
          },
        },
      },
    },
    "/openapi.yaml": {
      get: {
        operationId: "getOpenApiYaml",
        tags: ["meta"],
        summary: "OpenAPI document (YAML)",
        security: [],
        responses: {
          "200": {
            description: "OpenAPI 3.1 YAML",
            content: { "application/yaml": { schema: { type: "string" } } },
          },
        },
      },
    },
    "/game-data/clubs/search": {
      get: {
        operationId: "searchExternalClubs",
        tags: ["game-data"],
        summary: "Search external clubs via a game-data provider",
        parameters: [
          {
            name: "query",
            in: "query",
            required: true,
            schema: { type: "string", minLength: 1 },
          },
          {
            name: "providerKey",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["ea-clubs", "manual", "screenshot-ocr"],
              default: "ea-clubs",
            },
          },
          {
            name: "platform",
            in: "query",
            required: false,
            schema: { type: "string", default: "common-gen5" },
          },
          {
            name: "gameEdition",
            in: "query",
            required: false,
            schema: { type: "string", default: "fc26" },
          },
        ],
        responses: {
          "200": {
            description: "Matching clubs",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SearchClubsResponse" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ApiError" },
          "502": { $ref: "#/components/responses/ApiError" },
        },
      },
    },
    "/game-data/clubs/{externalClubId}": {
      get: {
        operationId: "getExternalClub",
        tags: ["game-data"],
        summary: "Get external club info",
        parameters: [
          {
            name: "externalClubId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "providerKey",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["ea-clubs", "manual", "screenshot-ocr"],
              default: "ea-clubs",
            },
          },
          {
            name: "platform",
            in: "query",
            required: false,
            schema: { type: "string", default: "common-gen5" },
          },
          {
            name: "gameEdition",
            in: "query",
            required: false,
            schema: { type: "string", default: "fc26" },
          },
        ],
        responses: {
          "200": {
            description: "Club",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ExternalClub" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ApiError" },
          "404": { $ref: "#/components/responses/ApiError" },
          "502": { $ref: "#/components/responses/ApiError" },
        },
      },
    },
    "/game-data/clubs/{externalClubId}/matches": {
      get: {
        operationId: "getRecentProviderMatches",
        tags: ["game-data"],
        summary: "List recent provider matches for a club",
        parameters: [
          {
            name: "externalClubId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "providerKey",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["ea-clubs", "manual", "screenshot-ocr"],
              default: "ea-clubs",
            },
          },
          {
            name: "platform",
            in: "query",
            required: false,
            schema: { type: "string", default: "common-gen5" },
          },
          {
            name: "gameEdition",
            in: "query",
            required: false,
            schema: { type: "string", default: "fc26" },
          },
          {
            name: "matchType",
            in: "query",
            required: false,
            schema: { type: "string", default: "friendlyMatch" },
          },
          {
            name: "maxResultCount",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, maximum: 100, default: 50 },
          },
        ],
        responses: {
          "200": {
            description: "Matches",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/GetClubMatchesResponse" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ApiError" },
          "502": { $ref: "#/components/responses/ApiError" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Optional in MVP scaffold; required when identity is wired.",
      },
    },
    schemas: {
      PingResponse: {
        type: "object",
        required: ["ok", "service", "apiVersion"],
        properties: {
          ok: { type: "boolean", const: true },
          service: { type: "string", const: "futrob" },
          apiVersion: { type: "string", const: "v1" },
        },
      },
      ApiError: {
        type: "object",
        required: ["code", "messageKey"],
        properties: {
          code: { type: "string" },
          messageKey: { type: "string" },
          requestId: { type: "string" },
          details: { type: "object", additionalProperties: true },
        },
      },
      ExternalClub: {
        type: "object",
        required: ["providerKey", "externalClubId", "name", "platform", "gameEdition"],
        properties: {
          providerKey: {
            type: "string",
            enum: ["ea-clubs", "manual", "screenshot-ocr"],
          },
          externalClubId: { type: "string" },
          name: { type: "string" },
          platform: { type: "string" },
          gameEdition: { type: "string" },
        },
      },
      ProviderMatch: {
        type: "object",
        required: ["id", "provider", "game", "occurredAt", "home", "away", "players", "metadata"],
        properties: {
          id: { type: "string" },
          provider: {
            type: "object",
            required: ["key", "externalMatchId"],
            properties: {
              key: { type: "string", enum: ["ea-clubs", "manual", "screenshot-ocr"] },
              externalMatchId: { type: "string" },
            },
          },
          game: {
            type: "object",
            required: ["edition", "platform", "mode"],
            properties: {
              edition: { type: "string" },
              platform: { type: "string" },
              mode: { type: "string" },
            },
          },
          occurredAt: { type: "string", format: "date-time" },
          home: { $ref: "#/components/schemas/ProviderMatchTeam" },
          away: { $ref: "#/components/schemas/ProviderMatchTeam" },
          players: {
            type: "array",
            items: { $ref: "#/components/schemas/ProviderPlayerMatchStats" },
          },
          metadata: {
            type: "object",
            required: ["durationSeconds", "wasDisconnected", "winnerByForfeit", "completeness"],
            properties: {
              durationSeconds: { type: ["number", "null"] },
              wasDisconnected: { type: "boolean" },
              winnerByForfeit: { type: "boolean" },
              completeness: { type: "string", enum: ["complete", "partial", "unknown"] },
            },
          },
        },
      },
      ProviderMatchTeam: {
        type: "object",
        required: ["externalClubId", "name", "goals"],
        properties: {
          externalClubId: { type: "string" },
          name: { type: "string" },
          goals: { type: "number" },
        },
      },
      ProviderPlayerMatchStats: {
        type: "object",
        required: ["externalPlayerId", "displayName", "goals", "assists", "rating"],
        properties: {
          externalPlayerId: { type: "string" },
          displayName: { type: "string" },
          goals: { type: ["number", "null"] },
          assists: { type: ["number", "null"] },
          rating: { type: ["number", "null"] },
        },
      },
      SearchClubsResponse: {
        type: "object",
        required: ["clubs"],
        properties: {
          clubs: {
            type: "array",
            items: { $ref: "#/components/schemas/ExternalClub" },
          },
        },
      },
      GetClubMatchesResponse: {
        type: "object",
        required: ["matches"],
        properties: {
          matches: {
            type: "array",
            items: { $ref: "#/components/schemas/ProviderMatch" },
          },
        },
      },
    },
    responses: {
      ApiError: {
        description: "API error",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ApiError" },
          },
        },
      },
    },
  },
} as const;

/** Keep Zod schemas referenced so drift is harder during refactors. */
void apiErrorSchema;
void pingResponseSchema;
void externalClubSchema;
void providerMatchSchema;
void searchClubsResponseSchema;
void getClubMatchesResponseSchema;
