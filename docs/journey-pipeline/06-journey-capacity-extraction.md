# PASS-J06 — Journey Capacity Extraction

Status: LOCKED
Version: 1.0

## Purpose
Extract the formation capacity evidenced at `T1` without converting moral lessons, reader applications, or thematic labels into canonical facts.

## Capacity test

A capacity is admitted only when the record can answer:

> What can the formation subject now receive, do, sustain, relinquish, or understand in a way that is structurally different from T0?

## Admission gates

```text
C1 T0 is locked
C2 T1 is locked
C3 the transition is traceable
C4 the capacity is evidenced by the transition
C5 the capacity is not merely a virtue label
C6 the capacity is not a reader projection
C7 the wording preserves evidence distance
```

## First extraction set

### J-000001 — Adam

- T0: pre-disruption state
- T1: received-and-returned state
- Capacity candidate: receiving guidance/correction after disruption and returning
- Decision: ADMIT

### J-000002 — Noah

- T0: invitation mode
- T1: construction mode after response closure
- Capacity candidate: changing mission mode without abandoning mission purpose
- Decision: ADMIT

### J-000003 — Noah

- T0: relational expectation
- T1: corrected orientation
- Capacity candidate: receiving correction after relational loss and revising understanding
- Decision: ADMIT

### J-000004 — Ibrahim

- T0: active relational appeal
- T1: peaceful separation
- Capacity candidate: ending rejected relational address without surrendering truth or peace
- Decision: ADMIT

### J-000005 — Ibrahim

- T0: established belief
- T1: increased reassurance
- Capacity candidate: seeking deeper reassurance without falsifying established belief as prior doubt
- Decision: ADMIT

## Canonical capacity register v0.1

```yaml
capacities:
  - id: CAP-000001
    source_journey: J-000001
    label: receive_correction_after_disruption

  - id: CAP-000002
    source_journey: J-000002
    label: shift_mission_mode_without_purpose_loss

  - id: CAP-000003
    source_journey: J-000003
    label: revise_understanding_after_relational_loss

  - id: CAP-000004
    source_journey: J-000004
    label: separate_peacefully_after_exhausted_address

  - id: CAP-000005
    source_journey: J-000005
    label: deepen_reassurance_within_established_belief
```

## Critical separation

`SUBJECT CAPACITY != READER CAPACITY`

Reader projection remains blocked until PASS-J13. This pass records only the capacity resolved inside the Quranic formation subject.

## Lock decision

`CAPACITY = T1-DIFFERENCE EXPLAINED BY A TRACEABLE TRANSITION`

PASS-J06: PASS / LOCKED
