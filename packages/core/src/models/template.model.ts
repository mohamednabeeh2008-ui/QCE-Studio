/**
 * Template Model
 */

import type { KnowledgeObject } from "./knowledge-object.model";

export interface TemplateModel extends KnowledgeObject {
  templateType: string;
  schemaVersion: string;
  fields: string[];
}
