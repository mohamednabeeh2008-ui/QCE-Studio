import { describe, expect, it } from "vitest";
import { allocateJourney, type AllocationInput } from "./series-allocation.engine";
import type { JourneyFormationSignature, ReaderScaleId } from "./series-allocation.types";

const uniformSignals = (rs1: number, rs2: number, rs3: number) => {
  const values: Record<ReaderScaleId, number> = { "RS-01": rs1, "RS-02": rs2, "RS-03": rs3 };
  return {
    governingProblem: values,
    dominantTransition: values,
    closure: values,
    primaryCapacity: values,
    secondarySupport: values,
  };
};

const cases: Array<{
  name: string;
  input: AllocationInput;
  expectedVolume: "VOL-01" | "VOL-02" | "VOL-03";
  expectedStatus: "AUTO_COMMIT" | "AUTO_COMMIT_WITH_REACH";
}> = [
  {
    name: "J002 — ابنا آدم",
    input: {
      allocationId: "SA-J002",
      signature: {
        journeyId: "J002",
        governingProblem: "فساد القربان بالحسد حين لا يُضبط القلب بالتقوى",
        dominantTransition: "من المقارنة والحسد إلى الاعتداء ثم انكشاف عاقبة الفعل",
        closure: "تعلم دفن الجسد والوقوع في الندم",
        primaryCapacity: "تمييز منشأ العنف قبل تحوله إلى فعل",
        primaryMovement: "SEE",
        evidenceRefs: ["QURAN:5:27-31"],
      },
      signals: uniformSignals(90, 55, 25),
      compatibilityScore: 92,
    },
    expectedVolume: "VOL-01",
    expectedStatus: "AUTO_COMMIT",
  },
  {
    name: "يوسف — الرحلة الممتدة",
    input: {
      allocationId: "SA-CAL-QUR-YUSUF",
      signature: {
        journeyId: "CAL-QUR-YUSUF",
        governingProblem: "كيف يُحمل الابتلاء الطويل دون فقد البوصلة الأخلاقية",
        dominantTransition: "من الضعف والإبعاد إلى التمكين مع حفظ العفة والأمانة",
        closure: "اجتماع الأسرة وظهور تأويل الرؤيا",
        primaryCapacity: "حمل الأمانة عبر تحولات زمنية ومؤسسية ممتدة",
        secondaryCapacities: ["الصبر", "العفة", "العفو"],
        primaryMovement: "CARRY",
        transversalFunctions: ["TF-01"],
        evidenceRefs: ["QURAN:12:4-101"],
      },
      signals: uniformSignals(30, 62, 91),
      compatibilityScore: 94,
    },
    expectedVolume: "VOL-03",
    expectedStatus: "AUTO_COMMIT_WITH_REACH",
  },
  {
    name: "موسى — النشأة والخروج إلى مدين",
    input: {
      allocationId: "SA-CAL-QUR-MUSA-MIDIAN",
      signature: {
        journeyId: "CAL-QUR-MUSA-MIDIAN",
        governingProblem: "كيف ينتقل الإنسان بعد الخوف والخطأ إلى مسار جديد من المسؤولية",
        dominantTransition: "من الخطر والاندفاع إلى الهجرة والخدمة والاستقرار",
        closure: "إتمام الأجل والتحرك بأهله",
        primaryCapacity: "التحرك المسؤول بعد الانكسار",
        primaryMovement: "MOVE",
        evidenceRefs: ["QURAN:28:3-29"],
      },
      signals: uniformSignals(35, 92, 50),
      compatibilityScore: 90,
    },
    expectedVolume: "VOL-02",
    expectedStatus: "AUTO_COMMIT",
  },
  {
    name: "موسى — النداء ومواجهة فرعون",
    input: {
      allocationId: "SA-CAL-QUR-MUSA-CALL",
      signature: {
        journeyId: "CAL-QUR-MUSA-CALL",
        governingProblem: "كيف تُحمل الرسالة أمام سلطة طاغية",
        dominantTransition: "من رهبة التكليف إلى البلاغ والمواجهة بالحجة والآية",
        closure: "ثبوت الحجة واستمرار الصراع بعد رفض فرعون",
        primaryCapacity: "حمل التكليف العام تحت الضغط",
        primaryMovement: "CARRY",
        evidenceRefs: ["QURAN:20:9-56", "QURAN:26:10-51", "QURAN:28:29-35"],
      },
      signals: uniformSignals(25, 58, 90),
      compatibilityScore: 91,
    },
    expectedVolume: "VOL-03",
    expectedStatus: "AUTO_COMMIT",
  },
  {
    name: "سحرة فرعون — من المنافسة إلى الإيمان",
    input: {
      allocationId: "SA-CAL-QUR-MAGICIANS",
      signature: {
        journeyId: "CAL-QUR-MAGICIANS",
        governingProblem: "ماذا يحدث حين تنكشف الحقيقة داخل منظومة الولاء للسلطة",
        dominantTransition: "من خدمة المشهد السلطوي إلى الاعتراف بالحق والثبات عليه",
        closure: "إعلان الإيمان رغم التهديد",
        primaryCapacity: "التحول العملي عند انكشاف الحقيقة",
        primaryMovement: "MOVE",
        evidenceRefs: ["QURAN:7:109-126", "QURAN:20:56-73", "QURAN:26:34-51"],
      },
      signals: uniformSignals(40, 88, 60),
      compatibilityScore: 93,
    },
    expectedVolume: "VOL-02",
    expectedStatus: "AUTO_COMMIT_WITH_REACH",
  },
];

describe("SAE-002 first real Quranic allocation records", () => {
  it.each(cases)("allocates $name", ({ input, expectedVolume, expectedStatus }) => {
    const result = allocateJourney(input);
    expect(result.homeVolume).toBe(expectedVolume);
    expect(result.status).toBe(expectedStatus);
    expect(result.journeyId).toBe(input.signature.journeyId);
    expect(result.readerScaleScores).toHaveLength(3);
    expect(input.signature.evidenceRefs.every((ref) => ref.startsWith("QURAN:"))).toBe(true);
  });

  it("preserves the transversal function on the extended Yusuf journey", () => {
    const result = allocateJourney(cases[1].input);
    expect(result.transversalFunctions).toEqual(["TF-01"]);
  });
});
