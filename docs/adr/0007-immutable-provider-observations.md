# ADR-0007: Observaciones de proveedor inmutables

- Estado: Aceptada
- Fecha: 2026-07-17
- Reemplaza: ADR de payloads EA con tablas `ea_raw_*` exclusivas

## Contexto

Hay que reprocesar y auditar datos de cualquier proveedor sin mutar el original.

## Decisión

Tabla conceptual `raw_provider_observations` (D1 + R2 si el blob es grande) con:

- `provider_key`, `resource_type`, `external_resource_id`
- `endpoint_key`, `payload_json` / object key, `payload_hash`
- `observed_at`, `http_status`, `schema_version`

El registro raw es inmutable. Nuevas observaciones versionan cambios. Modelos normalizados (`provider_matches`, etc.) se reconstruyen desde raw cuando sea posible.

## Consecuencias

- Reproceso sin reconsultar al proveedor.
- Retención y redaction obligatorias (no en portal/telemetría).

## Alternativas rechazadas

- Tablas solo `ea_raw_*`.
- Sobrescribir el JSON original.
