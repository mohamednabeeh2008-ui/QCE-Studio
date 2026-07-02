/**
 * Project Scanner
 *
 * Scans the project filesystem and produces
 * a ProjectSnapshot.
 */

import { readdirSync } from "node:fs";
import { join } from "node:path";

import { ProjectSnapshot } from "../types";

export function scanProject(
  root: string
): ProjectSnapshot {
  return {
    root,
    packages: [],
    files: readdirSync(root),
    directories: readdirSync(root).map(
      (entry) => join(root, entry)
    ),
  };
}
