/**
 * Generator Input
 */

export interface GeneratorInput {
  name: string;

  type:
    | "string"
    | "boolean"
    | "number"
    | "enum";

  required: boolean;

  defaultValue?: unknown;

  description: string;
}
