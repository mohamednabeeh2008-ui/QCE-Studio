# PASS-J17 — Duplicate and Near-Duplicate Audit

Status: LOCKED

## Purpose
Detect duplicate and near-duplicate journey records before inventory expansion.

## Comparison dimensions

```text
subject
source event
initial state
trigger
challenge
correction mode
resulting state
capacity
closure
```

## Decisions

```text
EXACT_DUPLICATE
NEAR_DUPLICATE
SAME_FAMILY
RELATED_ONLY
DISTINCT
HOLD
```

## Rules

- Shared theme is not duplication.
- Shared capacity is not duplication.
- Shared character is not duplication.
- Different correction modes normally preserve distinct identity.
- Exact duplicates preserve one canonical record and aliases.
- Near duplicates require boundary and challenge comparison before any merge.

## Current audit

```text
JOURNEYS TESTED: 5
PAIRWISE COMPARISONS: 10
EXACT DUPLICATES: 0
NEAR DUPLICATES REQUIRING MERGE: 0
SAME-FAMILY PAIRS: 1
RELATED-ONLY PAIRS: 2
DISTINCT PAIRS: 7
```

## Lock

`SIMILARITY CREATES A COMPARISON DUTY, NOT A MERGE PERMISSION.`

PASS-J17: PASS / LOCKED
