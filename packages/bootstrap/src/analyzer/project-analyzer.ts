/**
 * Project Analyzer
 *
 * Analyzes a ProjectModel and detects
 * architectural issues.
 */

import { ProjectModel } from "../types";

export interface ProjectIssue {
  code: string;

  message: string;
}

export function analyzeProject(
  model: ProjectModel
): ProjectIssue[] {
  void model;

  return [];
}
