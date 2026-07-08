# Candidate Harvest Protocol v1.0

Status: Frozen

## Purpose

Retrieve broadly while preventing retrieval from becoming premature parable confirmation.

## Harvest channels

### Channel A — Lexical
Captures lexical signals and root/formula occurrences. Lexical occurrence is evidence for retrieval only.

### Channel B — Structural
Uses retrieval indicators:

- domain transfer
- image–meaning relation
- comparative architecture
- constructed scenario
- evaluative disclosure
- analogy-like function

No indicator count automatically confirms a parable.

### Channel C — Traditional / Scholarly
Captures units identified or discussed as parables in recognized tafsir, balagha, and parable literature. Traditional classification is evidence, not automatic canonical identity.

## Candidate intake fields

Every intake record must contain:

- `candidate_id`
- `source`
- `harvest_channel`
- `entry_basis`
- `trigger`
- `initial_scope`
- `boundary_status`
- `overlap_status`
- `provenance`

Candidate intake must not contain:

- journey
- stations
- formation subject
- canonical network membership

## Provenance rule

Multi-channel entry does not create duplicate candidates.

`ONE CANDIDATE + MULTIPLE PROVENANCE EDGES`

Every discovery route is preserved even when a stronger route is later found.

## Deduplication protocol

1. Normalize Quran references.
2. Detect exact duplicates.
3. Detect overlapping candidates.
4. Detect nested candidates.
5. Detect competing boundaries.
6. Link before merge.
7. Preserve every provenance edge.
8. Assign stable QPC identity only after normalization.

## Overlap states

- `overlaps_with`
- `contains`
- `contained_by`
- `possibly_same_unit`
- `boundary_competing`

No overlap state authorizes automatic merge.

## False-positive protection

Structural harvest must maintain deliberate negative controls:

- FP-STORY
- FP-SCENE
- FP-ARGUMENT
- FP-DESCRIPTION

Imagery, scenario, comparison, and narrative are not by themselves parable identity.

## Boundary cases

Allowed competing identities include:

- Parable ↔ Story
- Parable ↔ Analogy
- Parable ↔ Rhetorical Scene
- Parable ↔ Argumentative Image
- One Unit ↔ Multiple Units
- Core Image ↔ Full Discourse Unit

`UNRESOLVED` is a valid legal state.
