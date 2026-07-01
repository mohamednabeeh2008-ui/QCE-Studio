/**
 * Knowledge Service
 */

import type { KnowledgeObject } from "../models/knowledge-object.model";
import { KnowledgeValidator } from "../validators/knowledge.validator";

export class KnowledgeService {
  private readonly validator = new KnowledgeValidator();

  create(object: KnowledgeObject): KnowledgeObject {
    if (!this.validator.validate(object)) {
      throw new Error("Invalid Knowledge Object");
    }

    return object;
  }

  validate(object: KnowledgeObject): boolean {
    return this.validator.validate(object);
  }
}