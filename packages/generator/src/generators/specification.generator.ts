/**
 * Specification Generator
 */

import { join } from "node:path";

import {
  GeneratorContext,
  GeneratorOptions,
  GeneratorResult,
} from "../types";

import { specificationTemplate } from "../templates";

export function generateSpecification(
  context: GeneratorContext,
  options: GeneratorOptions
): GeneratorResult {
  return {
    files: [
      {
        path: join(
          context.rootDir,
          options.outputPath,
          `${options.name}.specification.ts`
        ),
        content: specificationTemplate(options.name),
      },
    ],
  };
}
