/**
 * Generator Registry
 */

import { GeneratorDefinition } from "./generator-definition";

export const generatorRegistry: GeneratorDefinition[] = [
  {
    type: "value-object",
    suffix: ".value-object.ts",
    template: "value-object",
  },
];
