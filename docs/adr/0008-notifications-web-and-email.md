# ADR-0008: Notificaciones web y email en el MVP

- Estado: Aceptada
- Fecha: 2026-07-17

## Contexto

El PRD exige notificar inscripción, reprogramaciones, candidatos EA, selecciones, resultados, disputas y sanciones. WhatsApp/push son ampliaciones.

## Decisión

- `communications` acepta `NotificationIntent` desde otros contextos.
- Canales MVP: in-app/web y email.
- Providers de email viven en adapters; el dominio solo conoce intents y templates versionados.
- Entrega at-least-once con idempotency key por `(event_id, channel, recipient)`, preferiblemente vía Queue.
- WhatsApp, Telegram y push pueden añadirse después detrás del mismo puerto de salida.

## Consecuencias

- Menor complejidad operativa en el MVP.
- No se bloquea el E2E de resultados por un canal de mensajería.

## Alternativas rechazadas

- WhatsApp/Telegram como Must del MVP.
- Enviar emails directamente desde use cases de results/scheduling.
