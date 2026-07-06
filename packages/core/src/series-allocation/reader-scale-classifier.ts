import type {
  JourneyFormationSignature,
  ReaderScaleId,
  ReaderScaleScore,
  ScaleEvidence,
} from "./series-allocation.types";

export interface ReaderScaleSignals {
  governingProblem: Partial<Record<ReaderScaleId, number>>;
  dominantTransition: Partial<Record<ReaderScaleId, number>>;
  closure: Partial<Record<ReaderScaleId, number>>;
  primaryCapacity: Partial<Record<ReaderScaleId, number>>;
  secondarySupport?: Partial<Record<ReaderScaleId, number>>;
  evidence?: Partial<Record<ReaderScaleId, ScaleEvidence[]>>;
}

const SCALE_IDS: ReaderScaleId[] = ["RS-01", "RS-02", "RS-03"];

const clamp = (value: number): number => Math.max(0, Math.min(100, value));

export function classifyReaderScale(
  signature: JourneyFormationSignature,
  signals: ReaderScaleSignals,
): ReaderScaleScore[] {
  if (!signature.journeyId || !signature.governingProblem || !signature.dominantTransition) {
    return [];
  }

  return SCALE_IDS.map((scaleId) => {
    const score =
      (signals.governingProblem[scaleId] ?? 0) * 0.3 +
      (signals.dominantTransition[scaleId] ?? 0) * 0.3 +
      (signals.closure[scaleId] ?? 0) * 0.2 +
      (signals.primaryCapacity[scaleId] ?? 0) * 0.15 +
      (signals.secondarySupport?.[scaleId] ?? 0) * 0.05;

    return {
      scaleId,
      score: Math.round(clamp(score) * 100) / 100,
      evidence: signals.evidence?.[scaleId] ?? [],
    };
  }).sort((a, b) => b.score - a.score);
}
