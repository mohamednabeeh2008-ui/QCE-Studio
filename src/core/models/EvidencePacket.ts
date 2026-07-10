export interface EvidencePacket {
  id: string;
  referenceIds: string[];
  verseRefs: string[];
  metadata: Record<string, unknown>;
}
