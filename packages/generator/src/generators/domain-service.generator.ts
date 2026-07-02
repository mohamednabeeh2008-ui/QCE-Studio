/**
 * Domain Service Generator
 */

import { join } from "node:path";

import {
  GeneratorContext,
  GeneratorOptions,
  GeneratorResult,
} from "../types";

import { domainServiceTemplate } from "../templates";

export function generateDomainService(
  context: GeneratorContext,
  options: GeneratorOptions
): GeneratorResult {
  return {
    files: [
      {
        path: join(
          context.rootDir,
          options.outputPath,
          `${options.name}.domain-service.ts`
        ),
        content: domainServiceTemplate(options.name),
      },
    ],
  };
}
