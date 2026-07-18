export function print(message: string): void {
  console.log(message);
}

export function printError(message: string): void {
  console.error(message);
}

export function printJson(value: unknown): void {
  console.log(JSON.stringify(value, null, 2));
}
