/**
 * Value Object Generator
 */

import { valueObjectTemplate } from "../templates/value-object.template";

export function generateValueObject(className: string): string {
  return valueObjectTemplate(className);
}
