export interface DomainEvent<
  TName extends string = string,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> {
  readonly eventName: TName;
  readonly occurredAt: string;
  readonly correlationId?: string;
  readonly payload: TPayload;
}
