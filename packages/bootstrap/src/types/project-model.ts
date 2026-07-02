/**
 * Project Model
 *
 * Canonical in-memory representation of the project.
 */

import { ProjectSnapshot } from "./project-snapshot";

export interface ProjectModel {
  snapshot: ProjectSnapshot;

  packages: ProjectPackage[];

  modules: ProjectModule[];
}

export interface ProjectPackage {
  name: string;

  path: string;
}

export interface ProjectModule {
  name: string;

  type: string;
}
