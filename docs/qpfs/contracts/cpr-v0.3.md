# CPR v0.3 — Canonical Parable Record Contract

Status: Approved

## Design objective

Store the smallest record that preserves every decision proven necessary by the pilot while keeping conditional, relational, and experimental material outside the core.

## CORE

Required for every candidate or canonical unit:

- `identity`
- `source`
- `detection`
- `boundary`
- `discourse_identity`
- `structural_profile`
- `motion_decision`
- `formation_decision`
- `evidence`
- `validation`

A negative decision is a complete decision. For example, `motion: none` is valid and must not be treated as missing analysis.

## CONDITIONAL

Open only when the corresponding eligibility gate passes:

- `journey`
- `stations`
- `reader_operation`
- `correspondence`
- `character_analysis`
- `multi_carrier_analysis`

Rules:

- No motion → no stations.
- No internal journey does not prohibit reader operation analysis.
- Character presence does not prove character formation.
- Image change does not prove reader change.
- Multi-carrier structure is a derived profile, not a primary class.

## RELATIONAL

Stored outside the intrinsic unit core:

- `surah_context`
- `unit_links`
- `group_membership`
- `network_membership`

Relations begin as proposed and require independent review.

## EXPERIMENTAL

Experimental concepts remain external EOL references. They cannot alter canonical state without formal promotion.

Current external concepts include:

- PDU
- CTC
- VAB
- ADP
- FEP

## Validation layers

1. Structural Validity
2. Logical Consistency
3. Evidential Sufficiency
4. Canonical Readiness
5. Discovery Eligibility by dimension

## Result states

- PASS
- PASS_WITH_WARNINGS
- BLOCKED
- INVALID
- UNRESOLVED
- NOT_APPLICABLE

## Promotion constraint

A QPC may become a QPU only after source validity, resolved boundary, confirmed parable decision, structural validation, logical validation, evidence minimum, and reviewer gate all pass. Candidate provenance must be preserved after promotion.
