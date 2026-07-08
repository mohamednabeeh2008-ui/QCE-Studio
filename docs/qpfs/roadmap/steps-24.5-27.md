# QPFS Execution Campaign — STEP 24.5 to STEP 27

Status: Approved for execution

## Gate condition

The previous phase froze harvest infrastructure, not a fully materialized executable list of every QPC candidate. Therefore the legal campaign begins with STEP 24.5. No candidate counts may be invented.

# STEP 24.5 — Materialize Candidate Freeze Manifest

- 24.5A Reconstruct lexical intake
- 24.5B Materialize structural candidates
- 24.5C Materialize traditional/scholarly candidates
- 24.5D Normalize references
- 24.5E Deduplicate multi-channel entries
- 24.5F Preserve provenance edges
- 24.5G Register overlaps and nested units
- 24.5H Assign stable QPC identities
- 24.5I Validate manifest integrity
- 24.5J Freeze executable candidate manifest

Output: an executable QPC manifest whose rows correspond to actual harvested candidates.

# STEP 25 — Candidate Triage Campaign

Purpose: prioritize review without deciding parable identity.

Allowed triage outputs:

- READY_FOR_BOUNDARY_REVIEW
- NEEDS_SOURCE_REVIEW
- NEEDS_OVERLAP_REVIEW
- NEEDS_IDENTITY_REVIEW
- LOW_SIGNAL
- OUT_OF_SCOPE_CANDIDATE

Triage may not output `CONFIRMED PARABLE`.

# STEP 26 — Boundary Resolution Campaign

Purpose: determine what textual unit is actually under review.

Allowed outputs:

- RESOLVED
- PROVISIONAL
- COMPETING_BOUNDARIES
- UNRESOLVED

Rules:

- Context is not automatically part of the parable.
- Trigger must be contained in the full unit or have an explicit exception.
- Core image must be contained in the full unit.
- Link before merge.
- Boundary resolution must not decide parable identity.

# STEP 27 — Parable Decision Campaign

Purpose: answer whether the resolved unit is a parable under QPFS.

Allowed outputs:

- CONFIRMED
- PROBABLE
- POSSIBLE
- REJECTED
- UNRESOLVED
- OUT_OF_SCOPE

Required evidence layers:

1. Quranic text and context
2. Linguistic / rhetorical evidence where relevant
3. Tafsir / scholarly evidence where relevant
4. Analytical layer clearly marked as analysis

A decision record must preserve dissent, evidence type, confidence, reviewer state, and provenance.

## Final campaign gate

The canonical QPU corpus remains locked until STEPS 24.5–27 are complete and reviewed. Rejection is a successful system outcome when evidence does not support parable identity.
