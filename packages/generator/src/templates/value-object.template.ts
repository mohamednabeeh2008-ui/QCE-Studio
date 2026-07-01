/**
 * Value Object Template
 */

export function valueObjectTemplate(
  className: string
): string {
  return `/**
 * ${className} Value Object
 */

export class ${className} {
  constructor(
    public readonly value: string
  ) {
    if (!value.trim()) {
      throw new Error("${className} cannot be empty.");
    }
  }

  equals(other: ${className}): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
`;
}
