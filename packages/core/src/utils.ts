/**
 * QCE Studio
 * Shared Utilities
 */

export function isDefined<T>(
  value: T | null | undefined
): value is T {
  return value !== null && value !== undefined;
}

export function generateId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}
