# R-02 — CID ↔ Formation Map Reconciliation

Status: LOCKED
Project: QCE Studio
Repair Program: R-01 to R-10
Depends on: R-01 Witness Completeness Gate

## 1. Problem

The project already contains a Candidate Unit inventory. Formation analysis must therefore reconcile with the existing CID layer rather than create a parallel story system.

The critical failure mode is:

CID INVENTORY
≠
FORMATION MAP

This can cause duplicate records, invisible omissions, silent replacement of earlier units, and formation claims that cannot be traced back to the original inventory.

## 2. Governing Decision

CID is an inventory identity, not a Journey identity.

A Candidate Unit may later resolve as:

- one complete Event Family;
- one witness inside an Event Family;
- part of a larger Event Family;
- a range spanning more than one event;
- a synthesis witness;
- a retrospective witness;
- a duplicate candidate;
- an unresolved trace gap.

Therefore:

CID COUNT
≠
EVENT FAMILY COUNT
≠
JOURNEY COUNT

No numerical equality may be assumed between these layers.

## 3. Preservation Rule

During reconciliation:

NO CID DELETION
NO CID RENUMBERING
NO SILENT REPLACEMENT
NO LOSS OF ORIGINAL RANGE
NO LOSS OF ORIGINAL LABEL
NO LOSS OF DECISION HISTORY

If a CID is superseded, merged, split, deprecated, or reclassified, its original identity remains preserved in provenance.

## 4. Canonical Reconciliation Record

Each CID must be represented by a mapping record containing at minimum:

- cid
- original_label
- original_surah
- original_range
- original_status
- linked_witness_ids
- linked_event_family_ids
- linked_character_constellation_ids
- linked_macro_phase_ids, if applicable
- formation_subject_candidates
- journey_hypothesis_links
- reconciliation_status
- reconciliation_relation
- evidence_level
- decision_id
- provenance
- decision_history

Unknown values remain unresolved.

## 5. Allowed Reconciliation Relations

A CID may have one or more of the following governed relations:

- EXACT_MATCH
- PART_OF
- CONTAINS
- OVERLAPS
- WITNESS_OF
- SYNTHESIS_OF
- RETROSPECTIVE_OF
- DUPLICATE_CANDIDATE_OF
- SPLIT_REQUIRED
- MERGE_CANDIDATE
- UNRESOLVED

These are relations, not destructive operations.

## 6. Reconciliation Order

The mandatory order is:

CID PRESERVATION
→ WITNESS ATTACHMENT
→ RANGE COMPARISON
→ EVENT-FAMILY RELATION
→ SUBJECT RESOLUTION
→ FORMATION LINK
→ DUPLICATION AUDIT
→ ORPHAN AUDIT
→ LOCK

Formation hypotheses may receive links only after the CID has been preserved and attached upstream.

## 7. Many-to-Many Model

The mapping is explicitly many-to-many.

One CID may link to:

- multiple witnesses;
- multiple Event Families when its original range spans boundaries;
- multiple formation subjects;
- multiple hypotheses.

One Event Family may link to:

- multiple CIDs;
- multiple witnesses;
- multiple subjects.

Therefore a single `cid -> journey` field is prohibited as the canonical model.

## 8. Split Without Destruction

If one CID spans two natural Event Families:

CID-XXXX
→ TRACE SPLIT
   ├── witness segment A
   └── witness segment B

The original CID remains preserved.

The split creates trace segments or relations; it does not erase or renumber the original record.

## 9. Merge Without Erasure

If two or more CIDs appear to describe the same underlying event:

CID-A
CID-B
→ LINK AS MERGE CANDIDATES
→ VERIFY WITNESS IDENTITY
→ RESOLVE EVENT FAMILY
→ PRESERVE BOTH PROVENANCE CHAINS

Only the resolved Event Family may unify them conceptually.

The source CIDs remain historically traceable.

## 10. Orphan Audit

Before any formation map is promoted, the system must detect:

### CID Orphans

Existing CIDs with no witness or Event Family relation.

### Formation Orphans

Event Families, Formation Arcs, or Journey Hypotheses with no upstream CID relation where a relevant CID should exist.

### Range Orphans

Quranic witness ranges discovered in R-01 that are absent from the CID inventory.

Each orphan must be:

- resolved;
- explicitly justified;
- or left open as a governed trace gap.

## 11. Duplicate Audit

Duplicate detection must distinguish:

APPARENT DUPLICATE
from
TRUE DUPLICATE

Repeated Quranic witnesses, compressed retellings, synthesis passages, and overlapping ranges must not be deleted merely because their labels are similar.

Default rule:

LINK BEFORE MERGE

## 12. Evidence Direction

Permitted:

CID
→ WITNESS
→ EVENT FAMILY
→ FORMATION ARC
→ JOURNEY HYPOTHESIS

Prohibited:

JOURNEY HYPOTHESIS
→ FORCE CID INTERPRETATION
→ DELETE CONFLICTING CANDIDATE

The downstream model may test the inventory, but it cannot rewrite evidence silently.

## 13. Moses Quarantine Consequence

The existing Moses formation map remains quarantined until every proposed:

- Macro-Phase;
- Event Family;
- Formation Arc;
- Journey Hypothesis

is reconciled against the existing CID inventory.

Required output:

Moses witness range
↔ witness_id
↔ existing CID(s)
↔ provisional Event Family
↔ formation subject
↔ hypothesis status

Until then:

MOSES COMPLETE FORMATION MAP v0.1
=
PRESERVED
+
NON-CANONICAL
+
NON-GOVERNING

## 14. Reconciliation Status Machine

UNMAPPED
→ CID_PRESERVED
→ WITNESS_LINKED
→ EVENT_RELATION_RESOLVED
→ SUBJECT_RESOLVED
→ FORMATION_LINKED
→ AUDITED
→ LOCKED

Exception states:

- UNRESOLVED
- CONFLICT
- ORPHAN
- DUPLICATE_CANDIDATE
- SPLIT_REQUIRED

No exception state may be silently promoted to LOCKED.

## 15. Closure Criteria

R-02 passes for a trace target only when:

1. every existing relevant CID is preserved;
2. every relevant CID has a trace status;
3. every discovered witness has a CID relation or explicit range-orphan justification;
4. every Event Family has upstream evidence links;
5. every formation hypothesis is traceable through Event Family and witness layers;
6. split and merge decisions preserve provenance;
7. orphan and duplicate audits are complete;
8. no silent deletion or renumbering occurred.

## 16. Closure Decision

R-02 is solved at the governance level.

Operational closure remains target-specific:

R-02-GOVERNANCE: LOCKED
R-02-MOSES: PENDING CID RECONCILIATION
R-02-FUTURE TARGETS: REQUIRED BEFORE FORMATION PROMOTION

## 17. Invariants Added

- CID identity is preserved permanently.
- Inventory identity is not Journey identity.
- Reconciliation is many-to-many.
- Split does not destroy source identity.
- Merge does not erase provenance.
- Every downstream formation claim must have an upstream trace path.
- Orphans remain visible until resolved.
- Link before merge.

## 18. Exact Next Repair Gate

R-03 — Evidence-Level Separation

Objective:

Create a mandatory evidence architecture that prevents Quranic explicit content, structural inference, formation hypotheses, interpretive claims, and editorial language from being stored at the same epistemic level.

Required sequence:

EVIDENCE CLASS DEFINITIONS
→ FIELD-LEVEL EVIDENCE TAGGING
→ PROMOTION RULES
→ DOWNGRADE RULES
→ CLAIM PROVENANCE
→ LANGUAGE SAFETY TEST
→ CONTAMINATION AUDIT
→ LOCK
