/**
 * Ontology Entity Model
 */

import type { KnowledgeObject } from "./knowledge-object.model";

export interface OntologyEntity extends KnowledgeObject {
  entityType: string;
  canonicalName: string;
  aliases: string[];
  references: string[];
}
