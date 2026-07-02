/**
 * Project Model Builder
 *
 * Converts a ProjectSnapshot into
 * the canonical ProjectModel.
 */

import {
  ProjectModel,
  ProjectSnapshot,
} from "../types";

export function buildProjectModel(
  snapshot: ProjectSnapshot
): ProjectModel {
  return {
    snapshot,
    packages: [],
    modules: [],
  };
}
