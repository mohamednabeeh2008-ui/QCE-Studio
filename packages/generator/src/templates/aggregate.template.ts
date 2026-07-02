/**
 * Aggregate Template
 */

export function aggregateTemplate(
  className: string
): string {
  return `/**
 * ${className} Aggregate
 */

export class ${className} {
  constructor(
    public readonly id: string
  ) {}
}
`;
}
