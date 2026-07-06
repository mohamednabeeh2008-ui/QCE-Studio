import { describe, expect, it } from "vitest";
import { allocateJourney } from "./series-allocation.engine";
import type { JourneyFormationSignature } from "./series-allocation.types";

const signature = (journeyId: string, transversal = false): JourneyFormationSignature => ({
  journeyId,
  governingProblem: "governing problem",
  dominantTransition: "dominant transition",
  closure: "closure",
  primaryCapacity: "RC-TEST",
  primaryMovement: "FM-TEST",
  transversalFunctions: transversal ? ["TF-01"] : [],
  evidenceRefs: ["QURAN-REF-TEST"],
});

const signals = (rs1: number, rs2: number, rs3: number) => ({
  governingProblem: { "RS-01": rs1, "RS-02": rs2, "RS-03": rs3 },
  dominantTransition: { "RS-01": rs1, "RS-02": rs2, "RS-03": rs3 },
  closure: { "RS-01": rs1, "RS-02": rs2, "RS-03": rs3 },
  primaryCapacity: { "RS-01": rs1, "RS-02": rs2, "RS-03": rs3 },
  secondarySupport: { "RS-01": rs1, "RS-02": rs2, "RS-03": rs3 },
});

describe("SAE-001 vertical slice", () => {
  it.each([
    ["J-CAL-SEE", 92, 48, 20, "VOL-01"],
    ["J-CAL-MOVE", 35, 91, 42, "VOL-02"],
    ["J-CAL-CARRY", 20, 46, 93, "VOL-03"],
  ] as const)("auto-commits clear case %s", (id, rs1, rs2, rs3, volume) => {
    const result = allocateJourney({ allocationId: `SA-${id}`, signature: signature(id), signals: signals(rs1, rs2, rs3), compatibilityScore: 85 });
    expect(result.status).toBe("AUTO_COMMIT");
    expect(result.homeVolume).toBe(volume);
  });

  it("preserves a transversal function without changing the home volume", () => {
    const result = allocateJourney({ allocationId: "SA-J-CAL-TRANSVERSAL", signature: signature("J-CAL-TRANSVERSAL", true), signals: signals(25, 90, 40), compatibilityScore: 88 });
    expect(result.homeVolume).toBe("VOL-02");
    expect(result.transversalFunctions).toEqual(["TF-01"]);
  });

  it("routes an ambiguous case to human review", () => {
    const result = allocateJourney({ allocationId: "SA-J-CAL-AMB", signature: signature("J-CAL-AMB"), signals: signals(82, 76, 20), compatibilityScore: 90 });
    expect(result.status).toBe("REVIEW_SCALE_AMBIGUITY");
    expect(result.scaleDecision.scoreGap).toBeLessThan(12);
  });
});
