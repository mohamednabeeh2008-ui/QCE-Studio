/**
 * QCE Generator CLI
 */

import {
  executeCommand,
  parseCommand,
} from "./commands";

export function runCli(): void {
  const [, , type, name, outputPath = "src"] = process.argv;

  if (!type || !name) {
    console.log(
      "Usage: qce <type> <name> [outputPath]"
    );
    return;
  }

  executeCommand(
    {
      rootDir: process.cwd(),
      packageName: "@qce/generator",
    },
    parseCommand(
      type,
      name,
      outputPath
    )
  );
}

runCli();
