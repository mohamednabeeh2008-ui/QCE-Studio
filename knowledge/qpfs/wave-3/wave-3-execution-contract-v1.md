# QPFS Wave 3 Execution Contract v1

Status: ACTIVE
Wave: WAVE_3_CONTEXTUAL_RECONSTRUCTION_CLASSIFICATION_AND_ROOT_BLIND_DISCOVERY

## Entry authority
Wave 3 may enter only from `knowledge/qpfs/structural-harvest/runtime/wave-2-execution-report-v2.json` when all of the following hold:

- status = `CLOSED_WITH_UNRESOLVED_ROUTED_FORWARD`
- lexical_rows = 169
- unique_ids = 169
- unique_row_keys = 169
- proposal_count = 69
- validation.unresolved = 69
- canonical_parable_decisions_created = false
- qpu_created = false
- next_wave names Wave 3

## Inputs
- Wave 2 execution report v2
- Structural candidate proposals v2
- A traceable Quranic text/context authority for contextual reconstruction
- A corpus-wide discovery authority for root-blind recovery

## Pipeline
1. Verify Wave 2 entry gate.
2. Register all 69 QPC proposals in an immutable investigation queue.
3. Hydrate Quranic context from a registered traceable source.
4. Reconstruct candidate boundaries.
5. Classify structural evidence and exclusions.
6. Execute corpus-wide root-blind discovery.
7. Audit collisions between root-aware and root-blind channels.
8. Build evidence packs.
9. Independently validate every candidate.
10. Emit only `PASS_TO_INVESTIGATION`, `REJECT`, or `UNRESOLVED`.

## Safety invariants
Wave 3 MUST NOT create canonical parable decisions or QPUs. Missing context or corpus-wide evidence MUST produce a blocked/unresolved state, never guessed content.

## Closure rule
Wave 3 is CLOSED_PASS only when every root-aware proposal has a disposition, root-blind discovery has been executed against a registered corpus-wide authority, collision audit is complete, and every surviving candidate has a reproducible evidence pack.
