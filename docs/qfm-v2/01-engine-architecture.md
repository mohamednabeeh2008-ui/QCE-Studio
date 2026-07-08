# QFM v2 — Quran-Wide Formation Movement Engine Architecture

Status: ACTIVE / CANONICAL OPERATING DESIGN

## Mission
Rebuild the Quranic Formation Movement Encyclopedia from the Quran itself across the complete narrative universe, while preserving historical recovery as a separate evidence class.

## Hard separation
HISTORICAL-RECOVERY != NEW-QURAN-WIDE-RESEARCH != CANONICAL-ADMITTED-KNOWLEDGE

## Engine topology

### E00 — Mission Orchestrator
Splits the corpus into controlled work packets, assigns engines, tracks dependencies, retries failed packets, and prevents premature synthesis.

### E01 — Quranic Narrative Universe Engine
Builds the closed inventory of stories, scenes, narrative units, visions, parables, and distributed narratives.
Output: Narrative Registry.

### E02 — Subject & Character Census Engine
Inventories named and unnamed individuals, prophets, non-prophets, groups, nations, communities, and collective subjects.
Output: Subject Registry.

### E03 — Surah Coverage Sweep Engine
Scans all 114 surahs independently to detect narrative material missed by character- and story-led passes.
Output: Surah Coverage Ledger.

### E04 — Witness Extraction Engine
Extracts Quranic witness references and bounded witness clusters without yet asserting formation.
Output: Witness Registry.

### E05 — Event Segmentation Engine
Segments witness clusters into story events and preserves cross-surah event relations.
Output: Event Registry.

### E06 — State Transition Engine
Tests Initial State -> Pressure/Call/Test -> Response/Choice -> Resulting State.
Output: Transition Candidates.

### E07 — Formation Movement Qualification Engine
Admits only transitions with evidence-supported formation change. Events without proven transformation remain EVENT-NOT-YET-QFM.
Output: QFM Candidate Registry.

### E08 — Boundary & Identity Engine
Determines whether two candidates are duplicates, phases of one movement, parallel movements, or distinct movements.
Output: Resolved QFM Identities.

### E09 — Cross-Axis Reconciliation Engine
Reconciles Character Sweep x Story Sweep x Surah Sweep and detects omissions, duplicates, and contradictions.
Output: Coverage Reconciliation Matrix.

### E10 — Evidence & Provenance Engine
Attaches source, witness range, extraction path, confidence, reviewer state, and evidence class to every record.
Output: Provenance Ledger.

### E11 — Contradiction & Adversarial Audit Engine
Attempts to falsify each QFM by testing missing before-state, missing after-state, weak transition, false merge, false split, and unsupported causality.
Output: Audit Findings.

### E12 — Master Synthesis Engine
Combines only admitted outputs from E01-E11. It cannot invent missing fields or promote blocked records.
Output: Integrated QFM Knowledge Base.

### E13 — Statistical Validation Engine
Runs corpus coverage, overlap, duplication, missingness, distribution, confidence, reviewer agreement, and sensitivity studies.
Output: Validation Report.

### E14 — Canonical Admission Engine
Applies release gates and promotes records only after coverage and statistical validation thresholds are satisfied.
Output: Canonical Formation Movement Encyclopedia v2.

## Processing graph
E01 + E02 + E03 -> E09
E04 -> E05 -> E06 -> E07 -> E08
All engines -> E10
E08 + E09 + E10 -> E11
E11 -> E12 -> E13 -> E14

## Core rule
NO SINGLE ENGINE MAY DISCOVER, VALIDATE, SYNTHESIZE, AND CANONIZE THE SAME CLAIM.

## Independence rule
Discovery engines maximize recall. Qualification engines maximize precision. Audit engines maximize falsification. Synthesis integrates. Statistics tests the whole. Canonical admission decides.
