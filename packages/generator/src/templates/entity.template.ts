/**
 * Entity Template
 */

export function entityTemplate(
  className: string
): string {
  return `/**
 * ${className} Entity
 */

export class ${className} {
  constructor(
    public readonly id: string
  ) {}
}
`;
}
