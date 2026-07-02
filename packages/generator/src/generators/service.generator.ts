/**
 * Service Generator
 */

import { join } from "node:path";

import {
  GeneratorContext,
  GeneratorOptions,
  GeneratorResult,
} from "../types";

import { serviceTemplate } from "../templates";

export function generateService(
  context: GeneratorContext,
  options: GeneratorOptions
): GeneratorResult {
  return {
    files: [
      {
        path: join(
          context.rootDir,
          options.outputPath,
          `${options.name}.service.ts`
        ),
        content: serviceTemplate(options.name),
      },
    ],
  };
}
