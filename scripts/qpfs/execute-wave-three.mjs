import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const runtime = path.join(root, 'knowledge/qpfs/structural-harvest/runtime');
const wave3 = path.join(root, 'knowledge/qpfs/wave-3/runtime');
const report = JSON.parse(fs.readFileSync(path.join(runtime, 'wave-2-execution-report-v2.json'), 'utf8'));
const proposals = JSON.parse(fs.readFileSync(path.join(runtime, 'structural-candidate-proposals-v2.json'), 'utf8'));

const gate = [
  ['status', report.status === 'CLOSED_WITH_UNRESOLVED_ROUTED_FORWARD'],
  ['lexical_rows', report.lexical_rows === 169],
  ['unique_ids', report.unique_ids === 169],
  ['unique_row_keys', report.unique_row_keys === 169],
  ['proposal_count', report.proposal_count === 69],
  ['unresolved', report.validation?.unresolved === 69],
  ['no_parable_decisions', report.canonical_parable_decisions_created === false],
  ['no_qpu', report.qpu_created === false],
  ['next_wave', report.next_wave === 'WAVE_3_CONTEXTUAL_RECONSTRUCTION_CLASSIFICATION_AND_ROOT_BLIND_DISCOVERY'],
  ['proposal_file_count', proposals.candidate_count === 69 && proposals.candidates?.length === 69]
];
const failed = gate.filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) throw new Error(`Wave 3 entry gate failed: ${failed.join(', ')}`);

const ids = proposals.candidates.map(c => c.candidate_id);
if (new Set(ids).size !== 69) throw new Error('Wave 3 candidate identity uniqueness gate failed');
if (proposals.candidates.some(c => c.parable_decision !== null || c.qpu_id !== null)) throw new Error('Premature canonical decision/QPU detected');

const queue = proposals.candidates.map((c, index) => ({
  queue_position: index + 1,
  candidate_id: c.candidate_id,
  discovery_channels: c.discovery_channels,
  anchor_ids: c.anchor_ids,
  source_locators: c.source_locators,
  initial_boundary: c.initial_boundary,
  entry_status: 'ACCEPTED_FROM_WAVE_2',
  context_hydration_status: 'BLOCKED_PENDING_REGISTERED_QURAN_CONTEXT_AUTHORITY',
  boundary_reconstruction_status: 'NOT_EXECUTED',
  structural_classification_status: 'NOT_EXECUTED',
  evidence_pack_status: 'NOT_EXECUTED',
  independent_validation_status: 'UNRESOLVED',
  parable_decision: null,
  qpu_id: null
}));

const wave3Report = {
  schema: 'qpfs/wave-3-execution-report/v1.0',
  wave: 'WAVE_3_CONTEXTUAL_RECONSTRUCTION_CLASSIFICATION_AND_ROOT_BLIND_DISCOVERY',
  status: 'OPEN_BLOCKED_ON_EXTERNAL_AUTHORITIES',
  entry_gate: 'PASS',
  wave_2_authority: report.authority,
  root_aware_queue_count: queue.length,
  unique_candidate_ids: new Set(ids).size,
  context_hydration: {
    status: 'BLOCKED',
    reason: 'NO_REGISTERED_TRACEABLE_QURAN_CONTEXT_AUTHORITY_IN_WAVE_3_INPUTS'
  },
  root_blind_discovery: {
    status: 'BLOCKED',
    reason: 'NO_REGISTERED_CORPUS_WIDE_DISCOVERY_AUTHORITY_IN_WAVE_3_INPUTS'
  },
  completed_now: ['WAVE_2_ENTRY_GATE', 'ROOT_AWARE_INVESTIGATION_QUEUE_MATERIALIZATION', 'IDENTITY_UNIQUENESS_GATE', 'PREMATURE_DECISION_QPU_GUARD'],
  canonical_parable_decisions_created: false,
  qpu_created: false,
  next_required_action: 'REGISTER_TRACEABLE_QURAN_CONTEXT_AND_CORPUS_WIDE_DISCOVERY_AUTHORITIES'
};

fs.mkdirSync(wave3, { recursive: true });
fs.writeFileSync(path.join(wave3, 'root-aware-investigation-queue-v1.json'), JSON.stringify({schema:'qpfs/wave-3-investigation-queue/v1.0', count:queue.length, records:queue}, null, 2) + '\n');
fs.writeFileSync(path.join(wave3, 'wave-3-execution-report-v1.json'), JSON.stringify(wave3Report, null, 2) + '\n');
console.log(`PASS: Wave 3 entry verified and ${queue.length} candidates queued; execution blocked safely pending registered context and corpus-wide authorities.`);
