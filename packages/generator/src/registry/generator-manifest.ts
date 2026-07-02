/**
 * Generator Manifest
 */

import { GeneratorInput } from "./generator-input";

export interface GeneratorManifest {
  // Identity
  id: string;
  displayName: string;
  description: string;
  version: string;

  // Classification
  category:
    | "domain"
    | "application"
    | "infrastructure";

  tags: string[];
  keywords: string[];
  icon: string;

  // Runtime
  enabled: boolean;
  experimental: boolean;

  // Output
  output: {
    suffix: string;
    extension: string;
    overwrite: boolean;
  };

  // Inputs
  inputs: GeneratorInput[];

  // Dependencies
  requires: string[];
  produces: string[];

  // CLI
  aliases: string[];
  examples: string[];

  // Documentation
  docs?: string;
}
