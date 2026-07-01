/**
 * QCE Studio
 * Core Package Entry Point
 */

export * from "./constants";
export * from "./types";
export * from "./utils";

export * from "./enums/knowledge-status.enum";

export * from "./errors/validation.error";

export * from "./models/base.model";
export * from "./models/knowledge-object.model";
export * from "./models/template.model";
export * from "./models/ontology-entity.model";

export * from "./repositories/knowledge.repository";
export * from "./repositories/memory-knowledge.repository";

export * from "./services/knowledge.service";

export * from "./validators/knowledge.validator";

export * from "./engines/validation.engine";
export * from "./engines/template.engine";
export * from "./engines/identifier.engine";
export * from "./engines/knowledge-graph.engine";
export * from "./engines/review.engine";

export const QCE_VERSION = "0.1.0";
export const QCE_NAME = "QCE Studio";

export function getVersion(): string {
  return QCE_VERSION;
}
