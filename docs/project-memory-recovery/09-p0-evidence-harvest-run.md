# P0 Evidence Harvest Run v0.1

Status: PASS / LOCKED AS HARVEST RESULT
Operation: PROJECT MEMORY RECOVERY
Scope: HP-03, HP-04, HP-06
Predecessor: 08-evidence-source-harvest-plan.md

## Purpose

Execute the first real evidence harvest against the three identity-threatening provenance gaps. This pass records actual evidence hits and misses. It does not reconstruct missing historical rows.

## Search scope executed

Primary accessible domain in this run:

- GitHub History
- Current repository decisions and surviving repository artifacts

Search signatures executed:

- Candidate Unit
- CID
- journey
- station
- 250
- formation movement

Relevant commits and artifacts were inspected rather than treating search-result existence as proof.

## Result summary

| Packet | Edge | Result | Confidence |
|---|---|---|---|
| HP-03 | Formation Movement -> Candidate Unit | NOT YET RECOVERED | high |
| HP-04 | Candidate Unit -> Journey Hypothesis | PARTIAL GOVERNANCE EVIDENCE ONLY | high |
| HP-06 | Resolved Journey -> Formation Station | NOT YET RECOVERED | high |

No P0 edge is promoted to EXACT-RECOVERED.

No P0 edge is promoted to CORROBORATED-RECOVERED.

This is a successful harvest pass because it prevented false recovery.

---

# HP-03 — Formation Movement -> Candidate Unit

## Evidence sought

A historical mapping proving a relation between:

FORMATION MOVEMENT RECORD
and
CID / CANDIDATE UNIT

## Hits

### HIT-03-A — CID reconciliation governance exists

Artifact:

`docs/repair-program/03-cid-formation-reconciliation.md`

Commit:

`0d1e347328b6aa4cac5186e299413cfdb27c1d38`

Recovered facts:

- the repository recognizes an existing Candidate Unit inventory;
- CID is explicitly defined as inventory identity, not Journey identity;
- the relation model is many-to-many;
- CID records must preserve original label, surah, range, status, witnesses, Event Families, formation subjects, Journey Hypotheses, provenance, and decision history;
- allowed relations include EXACT_MATCH, PART_OF, CONTAINS, OVERLAPS, WITNESS_OF, SYNTHESIS_OF, RETROSPECTIVE_OF, DUPLICATE_CANDIDATE_OF, SPLIT_REQUIRED, MERGE_CANDIDATE, and UNRESOLVED;
- the permitted evidence direction is CID -> Witness -> Event Family -> Formation Arc -> Journey Hypothesis.

Evidence value:

STRONG GOVERNANCE EVIDENCE

What it does not prove:

- no historical Formation Movement row is present;
- no movement identifier is linked to a CID;
- no original movement-to-CID crosswalk is recovered;
- no relation cardinality between the historical encyclopedia and the 632 CIDs is established.

Classification:

NODE/ARCHITECTURE EVIDENCE, NOT EDGE RECOVERY.

### MISS-03-A — exact phrase search

Searches for:

- `formation movement`
- movement-to-CID conversion signatures

returned no historical commit hit proving the edge.

### Decision

HP-03 status:

`NOT_YET_RECOVERED`

Reason:

The repository proves that a CID layer exists and that formation reconciliation must occur, but it does not yet prove that the historical Formation Movement Encyclopedia generated, mapped to, preceded, or overlapped the Candidate Unit inventory.

Locked non-inference:

`FORMATION MOVEMENT ENCYCLOPEDIA -> 632 CANDIDATE UNITS`

remains prohibited as a historical fact.

---

# HP-04 — Candidate Unit -> Journey Hypothesis

## Evidence sought

A historical row or mapping containing both:

- CID identifier(s)
- Journey Hypothesis identifier or explicit journey-candidate identity

## Hits

### HIT-04-A — CID reconciliation schema contains journey hypothesis links

Artifact:

`docs/repair-program/03-cid-formation-reconciliation.md`

Commit:

`0d1e347328b6aa4cac5186e299413cfdb27c1d38`

Recovered facts:

The canonical reconciliation record requires:

- `cid`
- `linked_witness_ids`
- `linked_event_family_ids`
- `formation_subject_candidates`
- `journey_hypothesis_links`

It also states that one CID may link to multiple hypotheses and prohibits a canonical single `cid -> journey` field.

Evidence value:

EXACT GOVERNANCE EVIDENCE FOR THE REQUIRED MAPPING MODEL.

What it does not prove:

- no original populated CID-to-JH row was recovered;
- no historical CID identifiers were attached to historical JH identifiers in the inspected artifact;
- the document is a repair governance artifact, not proof that the old inventory already contained those mappings.

### HIT-04-B — canonical journey schema separates JH-ID from J-ID

Artifact:

`docs/journey-pipeline/05-canonical-journey-record-schema.md`

Commit:

`cc950c0e9b5e6ed39fbcf5e517fc9d204b726824`

Recovered facts:

- `JH-ID != J-ID`;
- a hypothesis may be preserved, held, split, merged, or blocked;
- a canonical Journey exists only after promotion and identity lock;
- canonical Journey records preserve `source_hypotheses`, `source_event_families`, and `source_witnesses`;
- five schema-ready canonical journeys are explicitly listed.

Evidence value:

EXACT EVIDENCE FOR JOURNEY-LAYER SEPARATION.

What it does not prove:

- it does not contain CID identifiers;
- it does not recover the historical CID-to-JH mapping edge.

### HIT-04-C — journey pipeline commit cluster exists

Commit-history search recovered a dense sequence of journey-pipeline artifacts, including:

- canonical journey record schema
- journey capacity extraction
- challenge identity resolution
- journey boundary stress test
- counter-journey registry
- composite and relational subject protocol
- cross-event journey resolution
- journey family clustering
- full pipeline regression
- held candidate re-resolution
- duplicate audit
- cross-character pattern test

Evidence value:

CORROBORATES THAT JOURNEY IDENTITY RESOLUTION WAS IMPLEMENTED AS A DISTINCT LAYER.

What it does not prove:

It does not recover CID attachment rows.

### Decision

HP-04 status:

`PARTIAL_GOVERNANCE_EVIDENCE_ONLY`

The edge is architecturally defined but historically unpopulated in the recovered evidence.

Therefore:

`CID -> JOURNEY HYPOTHESIS`

is a valid required relation type in the current governed model, but historical CID-to-JH mappings remain:

`NOT_YET_RECOVERED`

---

# HP-06 — Resolved Journey -> Formation Station

## Evidence sought

A historical row connecting:

RESOLVED JOURNEY
and
FORMATION STATION

## Hits

### HIT-06-A — canonical journey records exist

Artifact:

`docs/journey-pipeline/05-canonical-journey-record-schema.md`

Commit:

`cc950c0e9b5e6ed39fbcf5e517fc9d204b726824`

Recovered facts:

Five schema-ready canonical journeys are named:

- J-000001 Adam
- J-000002 Noah
- J-000003 Noah
- J-000004 Ibrahim
- J-000005 Ibrahim

Evidence value:

EXACT NODE EVIDENCE FOR RESOLVED/CANONICAL JOURNEYS.

What it does not prove:

- no station identifier appears;
- no journey-to-station mapping appears;
- no product selection relation appears.

### HIT-06-B — Master Archive proves recovery caution, not station mapping

Artifact:

`archives/Quranic_Formation_Journeys_Master_Archive_v1.0/README.md`

Commit:

`1ce0cc91d703ff847383fce1b76652e62e2aa52b`

Recovered facts:

- organized recovery was already recognized as necessary;
- missing content must not be invented;
- historical references are not automatically canonical.

Evidence value:

METHOD/DECISION EVIDENCE.

What it does not prove:

No Journey-to-Station edge.

### MISS-06-A — station signatures

Searches for:

- `station`
- `250`
- formation station mapping signatures

returned no historical commit hit proving a Journey-to-Station row.

### Decision

HP-06 status:

`NOT_YET_RECOVERED`

Locked non-inference:

The existence of canonical journeys and the remembered 250 Formation Stations must remain separate until an original product crosswalk is recovered.

Prohibited:

`1 RESOLVED JOURNEY = 1 FORMATION STATION`

Prohibited:

`NUMBER OF JOURNEYS = 250`

---

# Master Recovery Matrix update

## MRM-P0-001

Claim:

The Formation Movement Encyclopedia historically maps to the Candidate Unit inventory.

Status:

NOT_YET_RECOVERED

Evidence:

CID reconciliation governance exists, but no movement-to-CID row exists in recovered GitHub evidence.

Confidence in status:

HIGH

## MRM-P0-002

Claim:

Candidate Units can link many-to-many to Journey Hypotheses in the governed architecture.

Status:

EXACT-RECOVERED AS GOVERNANCE

Evidence:

R-02 reconciliation schema and rules.

Historical populated mappings:

NOT_YET_RECOVERED

Confidence:

HIGH

## MRM-P0-003

Claim:

Journey Hypotheses and canonical Journeys are distinct identity layers.

Status:

EXACT-RECOVERED

Evidence:

Canonical Journey Record Schema: `JH-ID != J-ID`.

Confidence:

HIGH

## MRM-P0-004

Claim:

Resolved Journeys historically map to the 250 Formation Stations.

Status:

NOT_YET_RECOVERED

Evidence:

Canonical Journey node evidence exists; station crosswalk does not.

Confidence in status:

HIGH

---

# Critical discovery

The first P0 harvest reveals a new distinction that must govern the entire recovery program:

`GOVERNANCE RECOVERY != DATA RECOVERY`

The repository currently preserves powerful rules describing how layers must relate. That is valuable, but those rules cannot be mistaken for the historical populated mappings themselves.

Therefore every future recovery record must distinguish:

- SCHEMA RECOVERED
- RULE RECOVERED
- NODE RECOVERED
- EDGE RECOVERED
- ROWS RECOVERED
- AGGREGATE RECOVERED

This prevents a governance document from masquerading as a recovered dataset.

# New locked decisions

- DEC-P0-001: Governance evidence never substitutes for populated historical mapping rows.
- DEC-P0-002: The CID layer is recovered as a governed inventory identity layer.
- DEC-P0-003: The CID-to-Journey relation is many-to-many in the current governed architecture.
- DEC-P0-004: Historical populated CID-to-JH mappings remain unrecovered.
- DEC-P0-005: JH-ID and J-ID separation is exactly recovered.
- DEC-P0-006: Canonical Journey node evidence does not prove Journey-to-Station mapping.
- DEC-P0-007: The 250 Formation Stations remain a Product Asset claim, not a Journey count.
- DEC-P0-008: No P0 edge may be promoted merely because its surrounding nodes exist.

# Closure

P0 EVIDENCE HARVEST RUN v0.1: PASS / LOCKED

Meaning of PASS:

- searches were executed;
- evidence was classified correctly;
- false edge recovery was prevented;
- actual hits and misses were recorded;
- Master Recovery Matrix received four controlled entries.

Meaning of PASS does not mean:

- all P0 gaps are solved.

Current state:

HP-03: NOT_YET_RECOVERED
HP-04: PARTIAL_GOVERNANCE_EVIDENCE_ONLY
HP-06: NOT_YET_RECOVERED

Next exact operation:

P0 DEEP ARTIFACT TRACE v0.1

Sequence:

1. trace the full file paths and predecessor artifacts behind the journey-pipeline commit cluster;
2. search for deleted, renamed, archived, or superseded crosswalk artifacts;
3. inspect candidate inventories and archive inventories for identifier co-occurrence;
4. search Arabic signatures for `الحركات التكوينية`, `المحطات`, `الرحلات`, and historical product labels;
5. update only when an actual edge or row is recovered.

The project remains frozen for new Quranic analysis, new Journey discovery, Moses tracing, new ontology, and new statistics.
