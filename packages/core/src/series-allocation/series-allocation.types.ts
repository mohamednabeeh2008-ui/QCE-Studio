export type ReaderScaleId = "RS-01" | "RS-02" | "RS-03";
export type VolumeId = "VOL-01" | "VOL-02" | "VOL-03";
export type TransversalFunctionId = "TF-01";

export interface ScaleEvidence {
  type: string;
  basis: string;
}

export interface ReaderScaleScore {
  scaleId: ReaderScaleId;
  score: number;
  evidence: ScaleEvidence[];
}

export interface JourneyFormationSignature {
  journeyId: string;
  governingProblem: string;
  dominantTransition: string;
  closure: string;
  primaryCapacity: string;
  secondaryCapacities?: string[];
  primaryMovement: string;
  transversalFunctions?: TransversalFunctionId[];
  evidenceRefs: string[];
}

export type AllocationStatus =
  | "AUTO_COMMIT"
  | "AUTO_COMMIT_WITH_REACH"
  | "REVIEW_SCALE_AMBIGUITY"
  | "REVIEW_LOW_FIT"
  | "REVIEW_COMPATIBILITY"
  | "BLOCKED_MISSING_DATA";

export interface ScaleDecision {
  selectedScale: ReaderScaleId | null;
  topScore: number;
  runnerUpScore: number;
  scoreGap: number;
}

export interface SeriesAllocationRecord {
  schema: "qce/series-allocation/v0.1";
  allocationId: string;
  journeyId: string;
  readerScaleScores: ReaderScaleScore[];
  scaleDecision: ScaleDecision;
  homeVolume: VolumeId | null;
  compatibilityScore: number;
  transversalFunctions: TransversalFunctionId[];
  status: AllocationStatus;
  reviewReasons: string[];
  governance: {
    engineVersion: string;
    rulesetVersion: string;
    decidedBy: "engine" | "human";
  };
}
