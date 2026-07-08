# QFM v2 — Work Division and Synthesis Protocol

Status: ACTIVE / LOCKED

## Work packets
The Quran-wide task is divided simultaneously by three independent axes:

A. SUBJECT PACKETS — prophets, other individuals, groups and nations.
B. NARRATIVE PACKETS — stories, scenes, parables, visions and distributed narratives.
C. SURAH PACKETS — 114 independent surah sweeps.

A record is not considered coverage-secure until its expected axis intersections have been tested.

## Engine roles
DISCOVERY: E01, E02, E03, E04, E05.
ANALYSIS: E06, E07, E08.
RECONCILIATION: E09, E10.
FALSIFICATION: E11.
SYNTHESIS: E12.
STATISTICS: E13.
ADMISSION: E14.
ORCHESTRATION: E00.

## Packet lifecycle
QUEUED -> DISCOVERED -> WITNESSED -> SEGMENTED -> TRANSITION-TESTED -> QFM-QUALIFIED or EVENT-NOT-YET-QFM -> IDENTITY-RESOLVED -> RECONCILED -> AUDITED -> SYNTHESIZED -> STATISTICALLY-VALIDATED -> CANONICAL or HELD.

## Master Synthesis Engine rules
E12 receives immutable snapshots from upstream engines.
It must:
1. preserve every source record identifier;
2. retain disagreement instead of averaging it away;
3. merge only after E08 identity resolution;
4. expose missing fields as NULL;
5. keep historical-recovery evidence in a separate namespace;
6. generate a complete lineage from witness to canonical QFM;
7. produce both machine-readable and human-review views.

## Required synthesis outputs
- Master Narrative Universe Map
- Master Subject Registry
- Master Witness Registry
- Master Event Registry
- QFM Candidate Registry
- Resolved QFM Registry
- Coverage Reconciliation Matrix
- Provenance Ledger
- Adversarial Audit Ledger
- Statistical Validation Dataset
- Canonical QFM Registry

## Failure containment
A failed packet blocks only its dependent branch, not the whole corpus.
A disputed QFM remains HELD while the rest of the corpus continues.
A missing historical asset never contaminates new research.

## Scale strategy
Pilot -> calibration batch -> prophet corpus -> non-prophetic individuals -> groups/nations -> remaining narrative scenes -> 114-surah closure sweep -> global reconciliation -> statistics -> canonical release.
