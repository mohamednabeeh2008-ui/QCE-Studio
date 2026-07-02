/**
 * Execute Generator Command
 */

import {
  GeneratorCommand,
  GeneratorContext,
} from "../types";

import {
  generate,
  generateValueObject,
} from "../generators";

export function executeCommand(
  context: GeneratorContext,
  command: GeneratorCommand
): void {
  switch (command.type) {
    case "value-object":
      generate(
        generateValueObject(context, {
          name: command.name,
          outputPath: command.outputPath,
        })
      );
      break;

    default:
      throw new Error(
        `Unknown generator type: ${command.type}`
      );
  }
}
