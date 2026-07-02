/**
 * Value Object Generator
 */

import { GeneratorOptions } from "../types";
import { valueObjectTemplate } from "../templates";

export function generateValueObject(
  options: GeneratorOptions
): string {
  return valueObjectTemplate(options.name);
}
