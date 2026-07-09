# QPFS Root-Blind Discovery Protocol v1

Status: ACTIVE_CONTRACT

## Purpose
Discover structural parable candidates that may contain no occurrence of root م ث ل, without using memory, fame, or a precompiled parable list.

## Discovery unit
The unit is a Quranic text window, not a lexical token.

## Allowed positive structural signals
A proposal requires a reproducible combination of signals, never one weak cue alone:

1. explicit comparison architecture between source and image domains;
2. sustained analogical mapping across clauses or events;
3. scene construction whose elements map to a stated or textually recoverable target;
4. explanatory closure that returns from image to target;
5. paired contrast structures where two constructed scenes function analogically.

## Negative controls
The following do not qualify alone:

- ordinary description;
- historical narration without analogical mapping;
- isolated metaphorical wording;
- lexical similarity;
- thematic resemblance supplied by the reviewer;
- famous-parable status from secondary lists.

## Deterministic scan pipeline

Corpus windows → structural feature extraction → positive-signal threshold → negative-control pass → root-aware collision check → proposal materialization → evidence pack → independent validation.

## Required record
Each root-blind proposal must contain:

- root_blind_candidate_id;
- exact source boundary;
- source snapshot authority and checksum;
- positive signals with text spans;
- negative controls tested;
- discovery rule version;
- collision status against the 69 root-aware queue records;
- disposition: PROPOSED / REJECTED_BY_NEGATIVE_CONTROL / COLLISION / UNRESOLVED.

## Completeness rule
No claim of root-blind completeness is permitted until every corpus window defined by the scan configuration has a recorded scan disposition.

## Canonical prohibition
Root-blind proposals are not canonical parables and may not create QPUs in Wave 3.
