# Evidence Source Harvest Plan v0.1

Status: PASS / LOCKED
Operation: PROJECT MEMORY RECOVERY
Predecessor: 07-provenance-chain-gap-audit.md

## Purpose

Convert the seven provenance gaps into targeted archaeological recovery searches across five evidence domains without generating new Quranic analysis or inventing historical mappings.

Evidence domains:

1. CONVERSATION HISTORY
2. UPLOADED FILES
3. GITHUB HISTORY
4. PROJECT MEMORY
5. CURRENT CANONICAL DECISIONS

## Governing principle

SEARCH FOR EVIDENCE, NOT FOR A DESIRED ANSWER.

A search succeeds only when it recovers an artifact, row, mapping, decision, version trace, or independent corroborating statement. Semantic plausibility is not a recovery result.

## Source priority

### Tier S1 — Original artifacts

- original tables
- original files
- original row exports
- original registries
- original commits
- original decision records

Maximum possible status: EXACT-RECOVERED.

### Tier S2 — Near-original traces

- quoted tables
- copied rows
- screenshots with readable data
- messages reporting completed counts with explicit version context
- commit diffs preserving deleted or superseded content

Maximum possible status: EXACT or CORROBORATED depending on completeness.

### Tier S3 — Independent corroboration

- repeated statements from separate dates
- matching summaries across independent assets
- later audits explicitly citing earlier artifacts

Maximum possible status: CORROBORATED-RECOVERED.

### Tier S4 — Reconstruction evidence

- architecture inferred from surviving relationships
- partial aggregates
- logical compatibility

Maximum possible status: RECONSTRUCTED.

## Search discipline

Each search packet must contain:

- gap_id
- target_edge
- target_artifact
- source_domains
- exact_signatures
- semantic_signatures
- identifier_signatures
- date/version clues
- acceptance criteria
- rejection criteria
- stop condition
- escalation path

## Harvest Packet HP-01

Target edge: Quranic Witness -> Raw Observation
Gap class: P1

Target artifacts:

- witness inventory
- verse/range columns
- observation rows
- surah-pass exports
- 114-surah scan matrices

Exact signatures:

- PASS-1C
- PASS-1C.1
- 604 Candidate Units
- 632 Candidate Units
- 80 / 114
- 114 / 114
- witness_id
- surah
- ayah
- range
- raw observation

Semantic signatures:

- Quran-wide scan
- verse evidence row
- observation extracted from witness
- candidate harvesting

Priority order:

Conversation History -> Uploaded Files -> GitHub History -> Project Memory -> Canonical Decisions

Acceptance criteria:

At least one artifact containing both a Quranic reference and its historical raw observation in the same recoverable record.

Stop condition:

EXACT: original row-level matrix recovered.
CORROBORATED: multiple independent partial matrices converge.
UNRESOLVED: all five domains exhausted with no row-level evidence.

## Harvest Packet HP-02

Target edge: Raw Observation -> Formation Movement
Gap class: P1

Target artifacts:

- Formation Movement Encyclopedia
- movement taxonomy
- character movement tables
- observation-to-movement mappings

Exact signatures:

- Formation Movement Encyclopedia
- موسوعة الحركات التكوينية
- formation movement
- movement_id
- before
- trigger
- response
- after
- transition

Semantic signatures:

- all Quranic characters
- all prophetic stories
- movement for each character
- transformation inventory
- statistical study of movements

Acceptance criteria:

An original record showing a raw observation and the movement record derived from or attached to it.

Stop condition:

Do not stop at proof that the encyclopedia existed. Continue until the edge itself is recovered or all source domains are exhausted.

## Harvest Packet HP-03

Target edge: Formation Movement -> Candidate Unit
Gap class: P0

Target artifacts:

- crosswalk tables
- shared identifiers
- migration notes
- schema conversion documents
- pass transition records

Exact signatures:

- CID-
- Candidate Unit
- formation movement
- migration
- converted to candidate
- source movement
- derived_from
- parent_id

Semantic signatures:

- encyclopedia became candidate inventory
- movement harvested into CID
- relationship between movement records and 632 units

Acceptance criteria:

A typed mapping proving at least one historical relation between a movement record and a CID, plus evidence describing whether the relation is one-to-one, one-to-many, many-to-one, or partial.

Rejection criteria:

Coexistence of both layers is not proof of derivation.

Stop condition:

No canonical edge until relation type is evidenced.

## Harvest Packet HP-04

Target edge: Candidate Unit -> Journey Hypothesis
Gap class: P0

Target artifacts:

- CID attachment matrices
- journey candidate registries
- hypothesis records
- merge/split tables

Exact signatures:

- Journey Hypothesis
- JH-
- CID attachment
- existing_cids
- candidate journey
- journey candidate
- source_cids
- supporting_cids

Semantic signatures:

- units grouped into journey
- candidate units supporting a journey
- journey identity testing

Acceptance criteria:

At least one original mapping with both CID identifier(s) and Journey Hypothesis identifier or explicit historical journey candidate identity.

Stop condition:

Do not infer journey count from CID count.

## Harvest Packet HP-05

Target edge: Journey Hypothesis -> Resolved Journey
Gap class: P1

Target artifacts:

- journey resolution ledger
- identity audit
- merge/split/reject decisions
- boundary test results

Exact signatures:

- resolved journey
- journey identity
- MERGE
- SPLIT
- REJECT
- ACCEPT
- boundary test
- continuity test
- journey lock

Semantic signatures:

- candidate became final journey
- two journeys merged
- one candidate split
- hypothesis rejected

Acceptance criteria:

A historical decision record linking a hypothesis/candidate to a resolution outcome.

Stop condition:

Current Trace decisions must be separated from historical pre-recovery decisions.

## Harvest Packet HP-06

Target edge: Resolved Journey -> Formation Station
Gap class: P0

Target artifacts:

- 250-station architecture
- station source mappings
- product conversion matrices
- journey-to-station selection records

Exact signatures:

- 250 Formation Stations
- 250 محطة تكوينية
- formation station
- station_id
- journey_id
- source journey
- selected for book

Semantic signatures:

- journey converted into station
- station selected from journey inventory
- product station mapping

Acceptance criteria:

An original row connecting at least one resolved journey identity to one or more product stations, with relation type preserved.

Rejection criteria:

The number 250 alone proves no journey count and no one-to-one mapping.

## Harvest Packet HP-07

Target edge: Formation Station -> Book Chapter
Gap class: P2

Target artifacts:

- chapter outline
- table of contents
- station membership table
- three-book architecture

Exact signatures:

- 125 chapters
- 250 stations
- 40 chapters / 85 stations
- 45 chapters / 80 stations
- Book 1
- Book 2
- Book 3
- chapter_id
- station_id

Semantic signatures:

- stations inside chapter
- chapter contains stations
- trilogy architecture

Acceptance criteria:

A row-level chapter/station membership artifact.

Stop condition:

Aggregate architecture is already corroborated; search continues only for row membership and version lineage.

## Cross-domain harvest protocol

For each hit:

1. Capture exact source location.
2. Capture date or commit timestamp when available.
3. Preserve original wording and identifiers.
4. Assign asset category.
5. Assign evidence tier.
6. Determine whether it proves a node, an edge, or only context.
7. Check for superseding evidence.
8. Record confidence state.
9. Never overwrite an older version.
10. Add to the Master Recovery Matrix.

## Search order optimization

The recovery operation uses a value-weighted order:

P0 identity-threatening gaps first:

HP-03 -> HP-04 -> HP-06

Then P1 lineage-breaking gaps:

HP-01 -> HP-02 -> HP-05

Then P2 membership gap:

HP-07

This order is intentionally different from the provenance chain order. It prioritizes the gaps most likely to cause false equivalence between the four historical layers:

632 Candidate Units
!= Formation Movement Encyclopedia
!= Natural Journeys
!= 250 Formation Stations

## Stop rules

A harvest packet closes only as one of:

- EXACT-RECOVERED
- CORROBORATED-RECOVERED
- RECONSTRUCTED-WITH-GAPS
- EXHAUSTED-UNRESOLVED

Forbidden closure states:

- probably recovered
- likely the same
- close enough
- architecturally obvious

## Negative evidence rule

Failure to find an artifact means only:

NOT YET RECOVERED

It does not mean:

NEVER EXISTED

A source domain may be inaccessible, incomplete, deleted, unindexed, or outside the current recovery surface.

## Duplicate and version handling

When two hits conflict:

1. Do not choose the newer automatically.
2. Determine dates.
3. Determine asset identity.
4. Determine whether one supersedes the other.
5. Preserve both.
6. Create a decision-lineage edge only with evidence.

Example:

604 Candidate Units / 80 of 114 surahs
-> SUPERSEDED BY
632 Candidate Units / 114 of 114 surahs

This relationship is accepted only as version lineage, not contradiction.

## Locked decisions

- DEC-ESH-001: Recovery searches target artifacts and mappings, not desired conclusions.
- DEC-ESH-002: Every provenance gap has a dedicated harvest packet.
- DEC-ESH-003: P0 gaps are searched before P1 and P2 gaps.
- DEC-ESH-004: Proof of a node never substitutes for proof of an edge.
- DEC-ESH-005: Proof that an encyclopedia existed does not recover its rows.
- DEC-ESH-006: Coexistence of movements and CIDs does not prove derivation.
- DEC-ESH-007: CID count never implies journey count.
- DEC-ESH-008: Station count never implies journey count.
- DEC-ESH-009: Aggregate chapter architecture does not recover station membership.
- DEC-ESH-010: Negative search results mean not yet recovered, not never existed.
- DEC-ESH-011: Conflicting versions are preserved before lineage resolution.
- DEC-ESH-012: Current analysis cannot be used to backfill historical evidence.

## Result

The recovery program now has an executable search design for every missing provenance edge.

The next operation is no longer broad memory recall. It is controlled evidence harvesting:

TARGET GAP
-> SEARCH SIGNATURE
-> SOURCE DOMAIN
-> ARTIFACT HIT
-> EVIDENCE TIER
-> VERSION CHECK
-> MATRIX ENTRY
-> STOP OR ESCALATE

## Closure

STEP 08: PASS / LOCKED
Harvest packets: 7
Evidence domains: 5
Priority classes operationalized: P0, P1, P2
New Quranic analysis: 0
New journeys: 0
New statistics: 0
Moses trace: frozen

Next: P0 Evidence Harvest Run v0.1 — execute HP-03, HP-04, and HP-06 first, record actual evidence hits and misses, and update the Master Recovery Matrix without reconstructing missing rows.
