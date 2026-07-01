/**
 * Knowledge Repository Contract
 */

import type { KnowledgeObject } from "../models/knowledge-object.model";

export interface KnowledgeRepository {
  findById(id: string): Promise<KnowledgeObject | null>;

  save(object: KnowledgeObject): Promise<void>;

  delete(id: string): Promise<void>;

  list(): Promise<KnowledgeObject[]>;
}
