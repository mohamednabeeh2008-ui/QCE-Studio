/**
 * In-Memory Knowledge Repository
 */

import type { KnowledgeObject } from "../models/knowledge-object.model";
import type { KnowledgeRepository } from "./knowledge.repository";

export class MemoryKnowledgeRepository implements KnowledgeRepository {
  private readonly storage = new Map<string, KnowledgeObject>();

  async findById(id: string): Promise<KnowledgeObject | null> {
    return this.storage.get(id) ?? null;
  }

  async save(object: KnowledgeObject): Promise<void> {
    this.storage.set(object.identifier, object);
  }

  async delete(id: string): Promise<void> {
    this.storage.delete(id);
  }

  async list(): Promise<KnowledgeObject[]> {
    return [...this.storage.values()];
  }
}
