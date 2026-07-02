/**
 * Project Snapshot
 *
 * Raw representation of the project immediately after scanning
 * the filesystem. This is the input to the Project Model Builder.
 */

export interface ProjectSnapshot {
  root: string;

  packages: string[];

  files: string[];

  directories: string[];
}
