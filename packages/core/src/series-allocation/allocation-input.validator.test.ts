import { describe, expect, it } from "vitest";
import type { AllocationInput } from "./series-allocation.engine";
import { assertValidAllocationInput, validateAllocationInput } from "./allocation-input.validator";

const validInput: AllocationInput = {
  allocationId: "SA-J002",
  signature: {
    journeyId: "J002",
    governingProblem: "فساد القربان بالحسد حين لا يضبط القلب بالتقوى",
    dominantTransition: "من الحسد إلى الاعتداء ثم انكشاف العاقبة",
    closure: "تعلم دفن الجسد والوقوع في الندم",
    primaryCapacity: "تمييز منشأ العنف قبل تحوله إلى فعل",
    primaryMovement: "SEE",
    evidenceRefs: ["QURAN:5:27-31"],
  },
  signals: {
    governingProblem: { "RS-01": 90 },
    dominantTransition: { "RS-01": 90 },
    closure: { "RS-01": 90 },
    primaryCapacity: { "RS-01": 90 },
  },
  compatibilityScore: 92,
};

describe("canonical allocation input contract", () => {
  it("accepts a complete Quran-grounded input", () => {
    expect(validateAllocationInput(validInput)).toEqual({ valid: true, errors: [] });
    expect(() => assertValidAllocationInput(validInput)).not.toThrow();
  });

  it("blocks missing Quranic evidence", () => {
    const input = structuredClone(validInput);
    input.signature.evidenceRefs = [];
    expect(validateAllocationInput(input).errors).toContain("QURANIC_EVIDENCE_REQUIRED");
  });

  it("blocks malformed Quranic references", () => {
    const input = structuredClone(validInput);
    input.signature.evidenceRefs = ["5:27-31"];
    expect(validateAllocationInput(input).errors).toContain("INVALID_QURANIC_REFERENCE:5:27-31");
  });

  it("blocks incomplete formation signatures", () => {
    const input = structuredClone(validInput);
    input.signature.primaryCapacity = "";
    expect(validateAllocationInput(input).errors).toContain("PRIMARY_CAPACITY_REQUIRED");
  });

  it("blocks compatibility scores outside 0..100", () => {
    const input = structuredClone(validInput);
    input.compatibilityScore = 101;
    expect(validateAllocationInput(input).errors).toContain("COMPATIBILITY_SCORE_OUT_OF_RANGE");
  });
});
