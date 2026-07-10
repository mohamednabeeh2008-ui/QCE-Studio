export interface ParentCase {
  id: string;
  packetIds: string[];
  dossierIds: string[];
  metadata: Record<string, unknown>;
}
