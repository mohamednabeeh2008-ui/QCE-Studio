import type { AllocationInput } from "./series-allocation.engine";

export interface AllocationInputValidation {
  valid: boolean;
  errors: string[];
}

const QURAN_REF = /^QURAN:\d{1,3}:\d{1,3}(?:-\d{1,3})?$/;

export function validateAllocationInput(input: AllocationInput): AllocationInputValidation {
  const errors: string[] = [];
  const signature = input.signature;

  if (!input.allocationId.trim()) errors.push("ALLOCATION_ID_REQUIRED");
  if (!signature.journeyId.trim()) errors.push("JOURNEY_ID_REQUIRED");
  if (!signature.governingProblem.trim()) errors.push("GOVERNING_PROBLEM_REQUIRED");
  if (!signature.dominantTransition.trim()) errors.push("DOMINANT_TRANSITION_REQUIRED");
  if (!signature.closure.trim()) errors.push("CLOSURE_REQUIRED");
  if (!signature.primaryCapacity.trim()) errors.push("PRIMARY_CAPACITY_REQUIRED");
  if (!signature.primaryMovement.trim()) errors.push("PRIMARY_MOVEMENT_REQUIRED");
  if (signature.evidenceRefs.length === 0) errors.push("QURANIC_EVIDENCE_REQUIRED");

  for (const ref of signature.evidenceRefs) {
    if (!QURAN_REF.test(ref)) errors.push(`INVALID_QURANIC_REFERENCE:${ref}`);
  }

  if (!Number.isFinite(input.compatibilityScore) || input.compatibilityScore < 0 || input.compatibilityScore > 100) {
    errors.push("COMPATIBILITY_SCORE_OUT_OF_RANGE");
  }

  return { valid: errors.length === 0, errors };
}

export function assertValidAllocationInput(input: AllocationInput): void {
  const result = validateAllocationInput(input);
  if (!result.valid) throw new Error(`INVALID_ALLOCATION_INPUT:${result.errors.join(",")}`);
}
