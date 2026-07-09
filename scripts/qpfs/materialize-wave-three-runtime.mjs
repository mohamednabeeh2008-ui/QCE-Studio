import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const input=path.join(root,'knowledge/qpfs/structural-harvest/runtime/structural-candidate-proposals-v2.json');
const reportPath=path.join(root,'knowledge/qpfs/structural-harvest/runtime/wave-2-execution-report-v2.json');
const out=path.join(root,'knowledge/qpfs/wave-3/runtime');
const proposals=JSON.parse(fs.readFileSync(input,'utf8'));
const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));

const failures=[];
if(report.lexical_rows!==169) failures.push('lexical_rows');
if(report.unique_ids!==169) failures.push('unique_ids');
if(report.unique_row_keys!==169) failures.push('unique_row_keys');
if(report.proposal_count!==69) failures.push('proposal_count');
if(report.validation?.unresolved!==69) failures.push('unresolved');
if(report.canonical_parable_decisions_created!==false) failures.push('premature_parable_decisions');
if(report.qpu_created!==false) failures.push('premature_qpu');
if(proposals.candidate_count!==69 || proposals.candidates?.length!==69) failures.push('candidate_file_count');
if(failures.length) throw new Error(`ENTRY_GATE_FAILED:${failures.join(',')}`);

const ids=proposals.candidates.map(x=>x.candidate_id);
if(new Set(ids).size!==69) throw new Error('DUPLICATE_CANDIDATE_ID');

const records=proposals.candidates.map((c,i)=>({
  queue_position:i+1,
  candidate_id:c.candidate_id,
  discovery_channels:c.discovery_channels??[],
  anchor_ids:c.anchor_ids??[],
  source_locators:c.source_locators??[],
  initial_boundary:c.initial_boundary??null,
  wave_2_disposition:c.disposition??'UNRESOLVED',
  context_status:'PENDING_AUTHORITY_SNAPSHOT',
  boundary_status:'NOT_EXECUTED',
  classification_status:'NOT_EXECUTED',
  evidence_pack_status:'NOT_EXECUTED',
  independent_validation:'UNRESOLVED',
  parable_decision:null,
  qpu_id:null
}));

fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'root-aware-investigation-queue-v1.json'),JSON.stringify({
  schema:'qpfs/wave-3-investigation-queue/v1.0',
  status:'MATERIALIZED_PENDING_CONTEXT',
  count:records.length,
  unique_candidate_ids:new Set(ids).size,
  records
},null,2)+'\n');
fs.writeFileSync(path.join(out,'wave-3-entry-reconciliation-v1.json'),JSON.stringify({
  schema:'qpfs/wave-3-entry-reconciliation/v1.0',
  status:'CLOSED_PASS',
  wave_2_lexical_rows:169,
  wave_2_candidate_proposals:69,
  queue_records:records.length,
  unique_candidate_ids:new Set(ids).size,
  lost_candidates:0,
  duplicate_candidate_ids:0,
  canonical_parable_decisions_created:false,
  qpu_created:false,
  next_gate:'QURAN_CONTEXT_SNAPSHOT_FREEZE'
},null,2)+'\n');
console.log('PASS: Wave 3 entry reconciled 69/69 with zero loss and zero duplicate IDs.');
