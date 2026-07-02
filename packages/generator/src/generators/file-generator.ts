/**
 * File Generator
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

export function writeGeneratedFile(
  filePath: string,
  content: string
): void {
  mkdirSync(dirname(filePath), {
    recursive: true,
  });

  writeFileSync(filePath, content, "utf8");
}
