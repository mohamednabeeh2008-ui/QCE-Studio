/**
 * Value Object Generator
 */

import { join } from "node:path";

import {
  GeneratorContext,
  GeneratorOptions,
  GeneratorResult,
} from "../types";

import { valueObjectTemplate } from "../templates";

export function generateValueObject(
  context: GeneratorContext,
  options: GeneratorOptions
): GeneratorResult {
  return {
    files: [
      {
        path: join(
          context.rootDir,
          options.outputPath,
          `${options.name}.value-object.ts`
        ),
        content: valueObjectTemplate(options.name),
      },
    ],
  };
}
