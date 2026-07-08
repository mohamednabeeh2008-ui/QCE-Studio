# Cross-Batch Factory Audit v0.1

Audit ID: `CBFA-0001`

## Scope

Adam × Noah × Abraham, covering `REC-000001` through `REC-000018`.

Boundary accuracy uses 17 narrative rows. `REC-000006` is a SUBJECT reconciliation row and is excluded from boundary-rate calculations.

## Results

| Population | MATCHED | REVIEW | CONFLICT |
|---|---:|---:|---:|
| All 18 reconciliation rows | 9 | 4 | 5 |
| 17 narrative rows | 8 | 4 | 5 |

For Batches 002–003, where explicit boundary gates exist: `PASS=5`, `REVIEW=4`, `HOLD=3`.

Batch profiles:

- Adam: 5 narratives → 3 matched, 2 conflict.
- Noah: 6 narratives → 2 matched, 2 review, 2 conflict.
- Abraham: 6 narratives → 3 matched, 2 review, 1 conflict.

## Rule audit

- `BF-R01 — KEEP`: bounded trigger + response + immediate outcome repeatedly aligns with stable local scenes.
- `BF-R02 — KEEP_HARD`: cross-surah convergence must never establish scene identity by itself.
- `BF-R03 — KEEP_HARD`: compound sequential acts remain the main source of HOLD/REVIEW.
- `BF-R04 — KEEP`: adjacency pressure recurs across the three batches and must remain distinct from identity.
- `BF-R05 — KEEP_HARD`: all 17 narrative rows converge across A∩B∩C, yet 5 still conflict. Coverage confirmation is therefore not boundary confirmation.

## Statistical reading

Observed narrative conflict rate: `5/17 = 29.41%`.

Before full calibration, Batches 001–002 show `4/11 = 36.36%` conflict. Batch 003 under the full five-rule factory shows `1/6 = 16.67%` conflict.

This is a promising operational signal, not proof of causal improvement: the sample is small and the three narrative populations are heterogeneous.

## Decision

`FACTORY STATUS = APPROVED_WITH_HARDENING`

No existing rule is removed. No existing rule is weakened.

The missing mechanism is a mandatory internal split test for compound or distributed candidates. Therefore the next factory rule is opened:

`BF-R06 — INTERNAL SPLIT PROBE`

A candidate that reaches `HOLD` or `REVIEW` because of compound acts, distributed scenes, boundary pressure, or cross-surah variation must be tested for the smallest independently bounded sub-scenes before it can enter the next production batch as unresolved.

## Next gate

Define and lock `BF-R06`, then retro-run it on the nine non-clean narrative cases: five `CONFLICT` plus four `MATCHED_WITH_REVIEW`. Batch 004 starts only after that hardening pass produces a split/retain verdict for every one of the nine cases.
