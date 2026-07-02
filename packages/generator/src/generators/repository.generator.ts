/**
 * Repository Generator
 */

import { join } from "node:path";

import {
  GeneratorContext,
  GeneratorOptions,
  GeneratorResult,
} from "../types";

import { repositoryTemplate } from "../templates";

export function generateRepository(
  context: GeneratorContext,
  options: GeneratorOptions
): GeneratorResult {
  return {
    files: [
      {
        path: join(
          context.rootDir,
          options.outputPath,
          `${options.name}.repository.ts`
        ),
        content: repositoryTemplate(options.name),
      },
    ],
  };
}
