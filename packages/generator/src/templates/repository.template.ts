/**
 * Repository Template
 */

export function repositoryTemplate(
  className: string
): string {
  return `/**
 * ${className} Repository
 */

export interface ${className}Repository {
  save(entity: ${className}): Promise<void>;
  findById(id: string): Promise<${className} | null>;
}
`;
}
