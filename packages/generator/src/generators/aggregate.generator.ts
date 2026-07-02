/**
 * Aggregate Generator
 */

import { join } from "node:path";

import {
  GeneratorContext,
  GeneratorOptions,
  GeneratorResult,
} from "../types";

import { aggregateTemplate } from "../templates";

export function generateAggregate(
  context: GeneratorContext,
  options: GeneratorOptions
): GeneratorResult {
  return {
    files: [
      {
        path: join(
          context.rootDir,
          options.outputPath,
          `${options.name}.aggregate.ts`
        ),
        content: aggregateTemplate(options.name),
      },
    ],
  };
}
