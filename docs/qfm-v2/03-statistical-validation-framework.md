# QFM v2 — Statistical Validation Framework

Status: ACTIVE / PRE-ADMISSION GATE

Statistics are used to detect incompleteness, instability, bias and classification failure. They do not prove Quranic meaning by themselves.

## Study families

### 1. Coverage studies
- Surah coverage: 114/114 required before final release.
- Narrative coverage: every registered narrative has a terminal processing state.
- Subject coverage: every registered subject has a terminal processing state.
- Triple-axis coverage: Character x Story x Surah reconciliation.

### 2. Capture-recapture style omission diagnostics
Compare independently discovered units from Character, Story and Surah sweeps. Large unique-only sets indicate likely blind spots and trigger rescan. Estimates are diagnostic, never canonical counts.

### 3. Overlap and convergence studies
Measure how often the three axes independently recover the same witnesses, events and QFMs. Low convergence triggers ontology or extraction review.

### 4. Duplicate and identity studies
Track exact duplicates, near duplicates, false merges, false splits and cross-surah distributed identities.

### 5. Missing-data studies
For every QFM field calculate null rate and structural missingness. High missingness in Initial State, Transition or Resulting State blocks admission.

### 6. Distribution studies
Inspect QFM counts by subject type, narrative type, surah, movement type, evidence status and confidence. Outliers trigger review; they are not automatically errors.

### 7. Reviewer agreement studies
On sampled records measure agreement on event boundary, transition existence, movement identity and evidence sufficiency. Disagreement hotspots trigger rule refinement and re-review.

### 8. Sensitivity studies
Recompute totals under strict, standard and permissive admission thresholds. If conclusions change materially, the ontology is not stable enough for canonical release.

### 9. Negative-control studies
Sample events classified EVENT-NOT-YET-QFM and test whether the engine is missing genuine transformations. This measures false-negative risk.

### 10. Adversarial precision studies
Sample admitted QFMs and attempt to disprove the before-state, pressure, response, transition and after-state chain. This measures false-positive risk.

## Release gates
G1: 114/114 surah sweep complete.
G2: all Narrative Universe records terminally processed.
G3: all Subject Registry records terminally processed.
G4: unresolved duplicate rate below approved threshold.
G5: critical-field missingness below approved threshold.
G6: reviewer disagreement hotspots resolved or explicitly held.
G7: sensitivity analysis stable.
G8: adversarial audit passed on required sample.
G9: all canonical QFMs have full provenance.
G10: final statistics reproducible from row-level data.

## Prohibition
NO AGGREGATE MAY BECOME CANONICAL IF IT CANNOT BE RECOMPUTED FROM ROW-LEVEL RECORDS.
