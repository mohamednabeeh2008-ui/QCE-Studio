# Provenance Chain Gap Audit v0.1

Status: PASS / LOCKED
Operation: PROJECT MEMORY RECOVERY

## Purpose

Audit the complete historical provenance chain without inventing missing links:

QURANIC WITNESS
-> RAW OBSERVATION
-> FORMATION MOVEMENT
-> CANDIDATE UNIT
-> JOURNEY HYPOTHESIS
-> RESOLVED JOURNEY
-> FORMATION STATION
-> BOOK CHAPTER

This step tests edges, not merely nodes. A recovered object does not prove the transitions before or after it.

## Scope freeze

During this audit:

- no new Quranic analysis
- no new story analysis
- no new journey discovery
- no Moses trace continuation
- no new ontology
- no new statistics
- no inferred row creation

## Edge evidence states

Every provenance edge receives exactly one state:

### EXACT
The original row, table, mapping, file, or explicit source statement is recovered.

### CORROBORATED
The original edge is incomplete, but multiple independent traces support the same relationship.

### RECONSTRUCTED
The edge is logically rebuilt from surviving evidence and is explicitly marked non-original.

### MISSING
No sufficient evidence currently establishes the edge.

Rule:

RECONSTRUCTED MUST NEVER MASQUERADE AS EXACT.

MISSING MUST NEVER BE FILLED BY ARCHITECTURAL PLAUSIBILITY.

## Provenance edge audit

### EDGE-01 — Quranic Witness -> Raw Observation

Current status: MISSING at project-wide row level.

Known: the project used Quranic evidence and produced prior research assets.
Not yet recovered: a complete original row-level witness-to-observation matrix for the historical corpus.

Decision: preserve the edge schema; do not regenerate observations from the Quran during recovery.

### EDGE-02 — Raw Observation -> Formation Movement

Current status: MISSING at encyclopedia-wide row level.

Known: a Formation Movement Encyclopedia historically existed as a recovery target.
Not yet recovered: the exact complete transformation from raw observations into movement records.

Decision: encyclopedia existence does not prove row-level derivation.

### EDGE-03 — Formation Movement -> Candidate Unit

Current status: UNRESOLVED / MISSING.

Known: both layers belong to the distributed prior knowledge system.
Not proven: that every movement became a Candidate Unit, that every Candidate Unit came from one movement, or that the encyclopedia temporally preceded the CID corpus.

Decision: no direct derivation edge is canonical until recovered evidence establishes it.

### EDGE-04 — Candidate Unit -> Journey Hypothesis

Current status: MISSING at full-corpus level.

Known: journey-related work existed and Candidate Units existed.
Not recovered: the complete original matrix showing which CIDs generated, supported, merged into, or failed to become journey hypotheses.

Decision: 632 cannot be converted into a journey inventory.

### EDGE-05 — Journey Hypothesis -> Resolved Journey

Current status: MISSING at historical project-wide level.

Known: prior journey candidates, identities, and matrices are recovery targets.
Not recovered: the full original resolution ledger with acceptance, rejection, merge, split, and boundary decisions.

Decision: current Trace Resolution cannot retroactively manufacture the historical ledger.

### EDGE-06 — Resolved Journey -> Formation Station

Current status: MISSING.

Known: current product architecture contains 250 Formation Stations.
Not recovered: exact journey-to-station mappings or cardinality.

Decision: 250 stations cannot be treated as 250 journeys.

### EDGE-07 — Formation Station -> Book Chapter

Current status: CORROBORATED at aggregate architecture level; MISSING at row level.

Known aggregate architecture:
- Book 1: 40 chapters / 85 stations
- Book 2: 45 chapters / 80 stations
- Book 3: 40 chapters / 85 stations
- Total: 125 chapters / 250 stations

Not recovered: complete station-to-chapter membership rows.

Decision: aggregate arithmetic is preserved; row membership remains unrecovered.

## Critical distinction

NODE RECOVERY != EDGE RECOVERY.

Recovering:

- 632 Candidate Units
- 250 Formation Stations
- 125 Book Chapters

would still not prove:

CANDIDATE UNIT -> JOURNEY
JOURNEY -> STATION
STATION -> CHAPTER

without explicit mapping evidence.

## Provenance Gap Matrix

| Edge | From | To | Current status | Recovery requirement |
|---|---|---|---|---|
| EDGE-01 | Quranic Witness | Raw Observation | MISSING | Original witness-observation rows |
| EDGE-02 | Raw Observation | Formation Movement | MISSING | Original observation-movement mapping |
| EDGE-03 | Formation Movement | Candidate Unit | MISSING | Typed cross-layer derivation evidence |
| EDGE-04 | Candidate Unit | Journey Hypothesis | MISSING | CID-to-hypothesis matrix |
| EDGE-05 | Journey Hypothesis | Resolved Journey | MISSING | Historical resolution ledger |
| EDGE-06 | Resolved Journey | Formation Station | MISSING | Journey-station mapping |
| EDGE-07 | Formation Station | Book Chapter | CORROBORATED aggregate / MISSING rows | Station-chapter membership table |

## Gap severity classes

P0 — Identity-threatening gap: may cause one layer to be mistaken for another.
P1 — Lineage-breaking gap: blocks reproducible derivation.
P2 — Membership gap: aggregate exists but row membership is absent.
P3 — Metadata gap: date, version, or source detail missing while identity remains stable.

Current classification:

- EDGE-03: P0
- EDGE-04: P0
- EDGE-05: P1
- EDGE-06: P0
- EDGE-01: P1
- EDGE-02: P1
- EDGE-07: P2

## Recovery rule for each edge

For every candidate edge record, capture:

- edge_id
- from_layer
- from_native_id
- to_layer
- to_native_id
- relation_type
- evidence_source
- evidence_location
- evidence_date
- version
- evidence_status
- historical_status
- canonical_status
- superseded_by
- notes

No edge may be upgraded by confidence language alone.

## Promotion rules

MISSING -> RECONSTRUCTED only when a transparent reconstruction exists.
MISSING -> CORROBORATED only with independent convergent evidence.
MISSING -> EXACT only when the original edge evidence itself is recovered.
RECONSTRUCTED -> EXACT requires recovery of the original evidence.
CORROBORATED -> EXACT requires recovery of the original evidence.

## Locked decisions

- DEC-PCG-001: Provenance is audited edge by edge.
- DEC-PCG-002: Recovered nodes do not prove unrecovered edges.
- DEC-PCG-003: The project-wide witness-to-observation matrix is not currently exact-recovered.
- DEC-PCG-004: The encyclopedia-to-CID relationship remains unresolved.
- DEC-PCG-005: The CID-to-journey relationship remains unresolved.
- DEC-PCG-006: The historical hypothesis-to-resolved-journey ledger remains unrecovered.
- DEC-PCG-007: The journey-to-station relationship remains unresolved.
- DEC-PCG-008: The station-to-chapter architecture is corroborated only in aggregate.
- DEC-PCG-009: Aggregate counts never substitute for row-level mappings.
- DEC-PCG-010: Current Trace work cannot manufacture historical provenance.
- DEC-PCG-011: Architectural plausibility is not evidence.
- DEC-PCG-012: Missing links remain explicitly missing until recovered.

## Result

The first project-wide provenance audit identifies the main recovery truth:

The largest risk is not loss of counts. It is loss of mappings.

Counts can survive while lineage disappears. Therefore the recovery operation must prioritize original matrices, ledgers, row memberships, and typed cross-layer edges before recomputation or canonical integration.

## Closure

STEP 07: PASS / LOCKED
Provenance layers audited: 8
Provenance edges audited: 7
Exact project-wide edges claimed without evidence: 0
Corroborated aggregate edges: 1
Missing/unresolved row-level edges: 7
New Quranic analysis: 0
New journeys: 0
New statistics: 0
Moses trace: frozen

Next: Evidence Source Harvest Plan v0.1 — convert the seven provenance gaps into targeted recovery searches across conversation history, uploaded files, GitHub history, project memory, and current canonical decisions, with explicit search signatures and stop conditions.
