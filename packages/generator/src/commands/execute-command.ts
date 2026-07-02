/**
 * Execute Generator Command
 */

import {
  GeneratorCommand,
  GeneratorContext,
} from "../types";

import {
  generate,
  generateAggregate,
  generateEntity,
  generateRepository,
  generateService,
  generateValueObject,
} from "../generators";

export function executeCommand(
  context: GeneratorContext,
  command: GeneratorCommand
): void {
  switch (command.type) {
    case "value-object":
      generate(generateValueObject(context,{name:command.name,outputPath:command.outputPath}));
      break;
    case "entity":
      generate(generateEntity(context,{name:command.name,outputPath:command.outputPath}));
      break;
    case "aggregate":
      generate(generateAggregate(context,{name:command.name,outputPath:command.outputPath}));
      break;
    case "repository":
      generate(generateRepository(context,{name:command.name,outputPath:command.outputPath}));
      break;
    case "service":
      generate(generateService(context,{name:command.name,outputPath:command.outputPath}));
      break;
    default:
      throw new Error(`Unknown generator type: ${command.type}`);
  }
}
