/**
 * Domain Error Template
 */

export function domainErrorTemplate(
  className: string
): string {
  return `/**
 * ${className} Domain Error
 */

export class ${className}Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = "${className}Error";
  }
}
`;
}
