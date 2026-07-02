/**
 * Policy Template
 */

export function policyTemplate(
  className: string
): string {
  return `/**
 * ${className} Policy
 */

export interface ${className}Policy {
  execute(): void;
}
`;
}
