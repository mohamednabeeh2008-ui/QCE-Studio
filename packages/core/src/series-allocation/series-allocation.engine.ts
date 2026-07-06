import { classifyReaderScale, type ReaderScaleSignals } from "./reader-scale-classifier";
import type {
  JourneyFormationSignature,
  ReaderScaleId,
  SeriesAllocationRecord,
  VolumeId,
} from "./series-allocation.types";

const SCALE_TO_VOLUME: Record<ReaderScaleId, VolumeId> = {
  "RS-01": "VOL-01",
  "RS-02": "VOL-02",
  "RS-03": "VOL-03",
};

export interface AllocationInput {
  allocationId: string;
  signature: JourneyFormationSignature;
  signals: ReaderScaleSignals;
  compatibilityScore: number;
}

export function allocateJourney(input: AllocationInput): SeriesAllocationRecord {
  const scores = classifyReaderScale(input.signature, input.signals);

  if (scores.length === 0) {
    return {
      schema: "qce/series-allocation/v0.1",
      allocationId: input.allocationId,
      journeyId: input.signature.journeyId,
      readerScaleScores: [],
      scaleDecision: { selectedScale: null, topScore: 0, runnerUpScore: 0, scoreGap: 0 },
      homeVolume: null,
      compatibilityScore: input.compatibilityScore,
      transversalFunctions: input.signature.transversalFunctions ?? [],
      status: "BLOCKED_MISSING_DATA",
      reviewReasons: ["Formation signature is incomplete"],
      governance: { engineVersion: "0.1.0", rulesetVersion: "0.1.0", decidedBy: "engine" },
    };
  }

  const [top, runnerUp] = scores;
  const gap = top.score - runnerUp.score;
  let status: SeriesAllocationRecord["status"] = "AUTO_COMMIT";
  const reviewReasons: string[] = [];

  if (top.score < 65) {
    status = "REVIEW_LOW_FIT";
    reviewReasons.push("Top reader-scale score is below 65");
  } else if (gap < 12) {
    status = "REVIEW_SCALE_AMBIGUITY";
    reviewReasons.push("Top-two reader-scale score gap is below 12");
  } else if (input.compatibilityScore < 70) {
    status = "REVIEW_COMPATIBILITY";
    reviewReasons.push("Volume compatibility score is below 70");
  } else if (scores[1].score >= 60) {
    status = "AUTO_COMMIT_WITH_REACH";
  }

  return {
    schema: "qce/series-allocation/v0.1",
    allocationId: input.allocationId,
    journeyId: input.signature.journeyId,
    readerScaleScores: scores,
    scaleDecision: {
      selectedScale: top.scaleId,
      topScore: top.score,
      runnerUpScore: runnerUp.score,
      scoreGap: Math.round(gap * 100) / 100,
    },
    homeVolume: SCALE_TO_VOLUME[top.scaleId],
    compatibilityScore: input.compatibilityScore,
    transversalFunctions: input.signature.transversalFunctions ?? [],
    status,
    reviewReasons,
    governance: { engineVersion: "0.1.0", rulesetVersion: "0.1.0", decidedBy: "engine" },
  };
}
