# PASS-J05 — Canonical Journey Record Schema

Status: LOCKED
Version: 1.0

## Purpose
Define the minimum canonical record for every promoted journey (`J-ID`) without turning analytical convenience into ontology.

## Governing invariant

`JH-ID != J-ID`

A hypothesis record may be preserved, held, split, merged, or blocked. A canonical journey record exists only after promotion and identity lock.

## Required schema

```yaml
journey_id: J-000000
canonical_subject: null
source_hypotheses: []
source_event_families: []
source_witnesses: []

identity:
  canonical_identity: null
  transition_signature: []

formation:
  t0: null
  challenge: null
  transition: []
  t1: null
  resulting_capacity: null

boundaries:
  start: null
  end: null
  excluded_adjacent_arcs: []

naming:
  canonical_name_ar: null
  canonical_name_en: null
  aliases: []
  rejected_names: []

evidence:
  explicit: []
  inferred: []
  interpretive: []
  confidence: null

provenance:
  decisions: []
  predecessor_records: []

relations: []
status: canonical
```

## Validation rules

1. `canonical_subject`, `T0`, `T1`, and transition must be traceable.
2. Resulting capacity cannot be inferred merely from a popular moral.
3. Event title cannot substitute for journey identity.
4. Adjacent arcs remain excluded unless continuity is proven.
5. Every canonical name must preserve the transition rather than merely naming the event.
6. Interpretive claims must never be promoted into the explicit evidence layer.
7. Aliases preserve retrieval history but do not create duplicate journeys.

## Migration of the first five journeys

The following records are schema-ready:

- J-000001 — Adam — Reception and Return After Disruption
- J-000002 — Noah — From Invitation to Construction After Response Closure
- J-000003 — Noah — Corrected Understanding After Loss
- J-000004 — Ibrahim — Peaceful Separation After Exhausted Address
- J-000005 — Ibrahim — From Established Belief to Increased Reassurance

No new journey is created by this pass.

## Lock decision

`CANONICAL_RECORD = IDENTITY + TRACEABLE_TRANSITION + BOUNDARY + EVIDENCE + PROVENANCE`

PASS-J05: PASS / LOCKED
