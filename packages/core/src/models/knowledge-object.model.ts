/**
 * Knowledge Object
 */

import type { BaseModel } from "./base.model";
import type { Language } from "../types";

export interface KnowledgeObject extends BaseModel {
  identifier: string;
  title: string;
  description?: string;
  language: Language;
  tags: string[];
  status: "draft" | "review" | "approved";
}
