# BF-R06 — Internal Split Probe v0.1

Status: `LOCKED_FOR_RETROSPECTIVE_HARDENING`

## Purpose

Prevent a compound, distributed, or adjacency-pressured candidate from remaining an unresolved macro-scene when the existing evidence already indicates independently testable internal action cores.

## Trigger

Run BF-R06 when any narrative row has one or more of:

- `reconciliation_status = CONFLICT`
- `reconciliation_status = MATCHED_WITH_REVIEW`
- `boundary_gate = HOLD`
- `boundary_gate = REVIEW`
- `conflict_type ∈ {BOUNDARY_MISMATCH, BOUNDARY_PRESSURE, COMPOUND_SCENE, COMPOUND_ACT, CROSS_SURAH_COMPOUND, PARALLEL_VARIATION}`

## Probe sequence

1. `CORE ENUMERATION` — enumerate only action/dialogue/outcome cores already named or evidenced in the source row; do not invent missing cores.
2. `INDEPENDENCE TEST` — ask whether a core has its own bounded trigger, response/action, and immediate outcome.
3. `DISTRIBUTION TEST` — distinguish one local scene from a cross-surah coverage family.
4. `ADJACENCY TEST` — remove merely adjacent material from identity claims.
5. `MINIMUM SUFFICIENT BOUNDARY TEST` — prefer the smallest boundary that preserves the evidenced action core without losing its immediate outcome.
6. `VERDICT` — issue exactly one of:
   - `SPLIT_REQUIRED`: at least two independently testable cores are already evidenced.
   - `RETAIN_COMPOUND`: evidence supports one irreducible compound scene.
   - `ESCALATE_EVIDENCE`: the row signals pressure but does not contain enough evidence to define a safe split.

## Hard constraints

- BF-R06 may propose boundaries; it may not create QFMs.
- BF-R06 may not import a new Quranic witness.
- BF-R06 may not infer an unnamed internal event solely to make a split symmetrical.
- Cross-surah convergence is coverage evidence, never sufficient identity evidence.
- A split child receives no permanent NAR-ID until its witness boundary is independently verified by E01/E03 and reconciled by E09.
- Parent rows are never deleted; they remain provenance containers with `SUPERSEDED_BY_SPLIT` only after child verification.

## Output schema

`probe_id`, `source_rec_id`, `source_entity_id`, `source_status`, `source_conflict_type`, `evidenced_core_count`, `probe_verdict`, `proposed_child_count`, `confidence`, `reason`, `next_action`, `provenance_refs`.

## Promotion gate

A proposed child can become a narrative row only after:

`BF-R06 PROPOSAL → E01 BOUNDARY VERIFICATION → E03 WITNESS VERIFICATION → E09 RECONCILIATION → NAR-ID`
