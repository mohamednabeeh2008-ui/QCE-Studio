/**
 * Policy Generator
 */

import { join } from "node:path";

import {
  GeneratorContext,
  GeneratorOptions,
  GeneratorResult,
} from "../types";

import { policyTemplate } from "../templates";

export function generatePolicy(
  context: GeneratorContext,
  options: GeneratorOptions
): GeneratorResult {
  return {
    files: [
      {
        path: join(
          context.rootDir,
          options.outputPath,
          `${options.name}.policy.ts`
        ),
        content: policyTemplate(options.name),
      },
    ],
  };
}
