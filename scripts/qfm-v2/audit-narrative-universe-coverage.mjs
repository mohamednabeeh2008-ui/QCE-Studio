import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const allowedRoots=['data/qfm-v2','knowledge'];
const exts=new Set(['.json','.jsonl','.md','.txt','.yaml','.yml']);
const skip=new Set(['node_modules','.git','generated']);
const files=[];
function walk(p){if(!fs.existsSync(p))return;for(const e of fs.readdirSync(p,{withFileTypes:true})){if(skip.has(e.name))continue;const q=path.join(p,e.name);if(e.isDirectory())walk(q);else if(exts.has(path.extname(e.name)))files.push(q);}}
for(const r of allowedRoots)walk(path.join(root,r));files.sort();
const marker=/\b(NAR-\d{6}|CID-\d{6}|B\d{3}-LI-\d{3}|B\d{3}-CAND-\d{3}|REC-\d{6})\b/g;
const lane=/\b(EVENT|JOURNEY|WITNESS|SUBJECT|CHARACTER|PEOPLE|NATION|GROUP|HOLD|REVIEW)\b/gi;
const rows=[];
for(const file of files){const rel=path.relative(root,file).replaceAll('\\','/');const text=fs.readFileSync(file,'utf8');const ids=[...new Set(text.match(marker)||[])].sort();const lanes=[...new Set((text.match(lane)||[]).map(x=>x.toUpperCase()))].sort();if(ids.length||lanes.length)rows.push({source:rel,sha256:crypto.createHash('sha256').update(text).digest('hex'),ids,lanes});}
const narIds=[...new Set(rows.flatMap(r=>r.ids.filter(x=>x.startsWith('NAR-'))))].sort();
const cidIds=[...new Set(rows.flatMap(r=>r.ids.filter(x=>x.startsWith('CID-'))))].sort();
const localIds=[...new Set(rows.flatMap(r=>r.ids.filter(x=>/^B\d{3}-LI-/.test(x))))].sort();
const classifySource=source=>{const s=source.toLowerCase();if(/permanent-narrative-registry[^/]*\.jsonl$/.test(s))return'ALLOCATION_AUTHORITY';if(/hold|quarantine|blocked/.test(s))return'HOLD_EVIDENCE';if(/promotion|promot|migration|upgrade/.test(s))return'PROMOTION_EVIDENCE';if(/production|produced|batch|ledger|registry/.test(s))return'PRODUCTION_EVIDENCE';return'REFERENCE_ONLY';};
const evidenceRank={ALLOCATION_AUTHORITY:5,PRODUCTION_EVIDENCE:4,PROMOTION_EVIDENCE:3,HOLD_EVIDENCE:2,REFERENCE_ONLY:1};
const allocationRows=rows.filter(r=>classifySource(r.source)==='ALLOCATION_AUTHORITY');
const allocatedNarIds=[...new Set(allocationRows.flatMap(r=>r.ids.filter(x=>x.startsWith('NAR-'))))].sort();
const nar000039ReferenceRows=rows.filter(r=>r.ids.includes('NAR-000039')).map(r=>r.source);
const nar000039AllocationRows=allocationRows.filter(r=>r.ids.includes('NAR-000039')).map(r=>r.source);
const narNum=id=>Number(id.slice(4));
const observedPermanentNarIds=narIds.filter(id=>narNum(id)<=38);
const expectedPermanentNarIds=Array.from({length:38},(_,i)=>`NAR-${String(i+1).padStart(6,'0')}`);
const missingObservedPermanentNarIds=expectedPermanentNarIds.filter(id=>!observedPermanentNarIds.includes(id));
const referencedButNotAuthorityAllocatedNarIds=observedPermanentNarIds.filter(id=>!allocatedNarIds.includes(id));
const narReconciliation=expectedPermanentNarIds.map(nar_id=>{const sources=rows.filter(r=>r.ids.includes(nar_id)).map(r=>({source:r.source,sha256:r.sha256,evidence_class:classifySource(r.source),lanes:r.lanes}));sources.sort((a,b)=>evidenceRank[b.evidence_class]-evidenceRank[a.evidence_class]||a.source.localeCompare(b.source));const classes=[...new Set(sources.map(s=>s.evidence_class))];const status=classes.includes('ALLOCATION_AUTHORITY')?'AUTHORITY_PROVEN':classes.includes('PRODUCTION_EVIDENCE')?'PRODUCTION_PROVEN':classes.includes('PROMOTION_EVIDENCE')?'PROMOTION_PROVEN':classes.includes('HOLD_EVIDENCE')?'HOLD_EVIDENCE_ONLY':sources.length?'REFERENCE_ONLY':'MISSING';return{nar_id,status,authority_proven:classes.includes('ALLOCATION_AUTHORITY'),evidence_classes:classes,source_count:sources.length,sources};});
const reconciliationCounts=Object.fromEntries([...new Set(narReconciliation.map(r=>r.status))].sort().map(status=>[status,narReconciliation.filter(r=>r.status===status).length]));
const narReconciliationManifest={schema:'qfm-v2/nar-evidence-reconciliation/v0.1',generated_by:'scripts/qfm-v2/audit-narrative-universe-coverage.mjs',scope:{first:'NAR-000001',last:'NAR-000038',count:38},rules:{promotion_requires_evidence_chain:true,reference_is_not_allocation:true,authority_rule:'Only permanent-narrative-registry*.jsonl files prove permanent NAR allocation.',classification_precedence:['ALLOCATION_AUTHORITY','PRODUCTION_EVIDENCE','PROMOTION_EVIDENCE','HOLD_EVIDENCE','REFERENCE_ONLY']},counts:reconciliationCounts,unresolved_authority_ids:narReconciliation.filter(r=>!r.authority_proven).map(r=>r.nar_id),records:narReconciliation};

const recoveredAuthorityRecords=narReconciliation.map(r=>({
  nar_id:r.nar_id,
  authority_status:r.authority_proven?'ORIGINAL_AUTHORITY_PROVEN':'RECOVERED_AUTHORITY',
  historical_evidence_status:r.status,
  recovery_basis:r.authority_proven?'CANONICAL_ALLOCATION_AUTHORITY':'VERIFIED_HISTORICAL_EVIDENCE_CHAIN',
  original_allocation_claimed:r.authority_proven,
  strongest_evidence_class:r.evidence_classes[0]||null,
  evidence_source_count:r.source_count,
  evidence_chain:r.sources.map(s=>({source:s.source,sha256:s.sha256,evidence_class:s.evidence_class}))
}));
const recoveredNarAuthorityLedger={
  schema:'qfm-v2/recovered-nar-authority-ledger/v0.1',
  generated_by:'scripts/qfm-v2/audit-narrative-universe-coverage.mjs',
  scope:{first:'NAR-000001',last:'NAR-000038',count:38},
  semantics:{recovered_authority:'Administrative recovery of continuity from verified historical evidence; never a claim that the lost original allocation event was recovered.',original_authority:'Allocation proven by canonical permanent registry evidence.'},
  invariants:{one_record_per_nar:true,no_duplicate_ids:true,continuous_range_required:true,no_recovered_record_without_evidence_chain:true,nar_000039_forbidden:true},
  counts:{ORIGINAL_AUTHORITY_PROVEN:recoveredAuthorityRecords.filter(r=>r.authority_status==='ORIGINAL_AUTHORITY_PROVEN').length,RECOVERED_AUTHORITY:recoveredAuthorityRecords.filter(r=>r.authority_status==='RECOVERED_AUTHORITY').length},
  records:recoveredAuthorityRecords
};
const ledgerIds=recoveredAuthorityRecords.map(r=>r.nar_id);
const ledgerPass=recoveredAuthorityRecords.length===38&&new Set(ledgerIds).size===38&&expectedPermanentNarIds.every((id,i)=>ledgerIds[i]===id)&&recoveredAuthorityRecords.every(r=>r.authority_status==='ORIGINAL_AUTHORITY_PROVEN'||r.evidence_chain.length>0)&&!ledgerIds.includes('NAR-000039');
if(!ledgerPass)throw new Error('Recovered NAR authority ledger invariant failure');

const provenance={observed_nar_universe:{status:missingObservedPermanentNarIds.length===0?'CONTIGUOUS_REFERENCE_COVERAGE':'REFERENCE_GAPS_PRESENT',scope:'Repository-observed NAR references only; references do not by themselves prove permanent allocation.',expected_range:['NAR-000001','NAR-000038'],observed_ids:observedPermanentNarIds,missing_ids:missingObservedPermanentNarIds},authoritative_nar_allocations:{status:referencedButNotAuthorityAllocatedNarIds.length===0?'FULLY_RECONCILED':'RECOVERY_LAYER_REQUIRED',authority_rule:'Original authority remains distinct from recovered authority.',allocated_ids:allocatedNarIds,observed_but_not_authority_allocated_ids:referencedButNotAuthorityAllocatedNarIds},cid_corpus:{status:cidIds.length===0?'NOT_MATERIALIZED_IN_SCANNED_SOURCE_ROOTS':'OBSERVED_IN_REPOSITORY',scope:'No historical CID count is inferred or fabricated. Recovery requires repository evidence or an explicit canonical manifest.',observed_ids:cidIds,scanned_source_roots:allowedRoots}};
const out={schema:'qfm-v2/narrative-universe-source-census/v0.4',generated_by:'scripts/qfm-v2/audit-narrative-universe-coverage.mjs',source_roots:allowedRoots,source_file_count:files.length,evidence_file_count:rows.length,recovered_counts:{nar_references:narIds.length,allocated_nar_ids:allocatedNarIds.length,recovered_nar_authority_ids:recoveredAuthorityRecords.length,cid_ids:cidIds.length,local_instance_ids:localIds.length},provenance,nar_reconciliation_summary:{counts:reconciliationCounts,unresolved_original_authority_count:narReconciliationManifest.unresolved_authority_ids.length,recovered_authority_coverage:ledgerPass?'38_OF_38':'FAILED'},mission_gate:{mission:'MISSION 005-PRE',complete:false,blockers:[...(missingObservedPermanentNarIds.length?['NAR_REFERENCE_GAPS']:[]),...(ledgerPass?[]:['NAR_AUTHORITY_RECOVERY_INCOMPLETE']),...(cidIds.length===0?['CID_CORPUS_NOT_MATERIALIZED']:[])]},invariants:{last_nar_id_expected:'NAR-000038',next_nar_id_expected:'NAR-000039',nar_000039_must_not_be_allocated:true},safety:{nar_000039_referenced:nar000039ReferenceRows.length>0,nar_000039_reference_rows:nar000039ReferenceRows,nar_000039_allocated:nar000039AllocationRows.length>0,nar_000039_allocation_rows:nar000039AllocationRows,pass:nar000039AllocationRows.length===0},evidence:rows};
const outDir=path.join(root,'data/qfm-v2/audits/generated');fs.mkdirSync(outDir,{recursive:true});
fs.writeFileSync(path.join(outDir,'narrative-universe-source-census-v0.1.json'),JSON.stringify(out,null,2)+'\n');
fs.writeFileSync(path.join(outDir,'nar-evidence-reconciliation-v0.1.json'),JSON.stringify(narReconciliationManifest,null,2)+'\n');
fs.writeFileSync(path.join(outDir,'recovered-nar-authority-ledger-v0.1.json'),JSON.stringify(recoveredNarAuthorityLedger,null,2)+'\n');
if(!out.safety.pass)throw new Error(`NAR-000039 allocated in permanent registry: ${nar000039AllocationRows.join(', ')}`);
console.log(`PASS source census: files=${files.length} evidence=${rows.length} NAR_refs=${narIds.length} allocated_NAR=${allocatedNarIds.length} CID=${cidIds.length} LI=${localIds.length}`);
console.log(`NAR RECONCILIATION: ${Object.entries(reconciliationCounts).map(([k,v])=>`${k}=${v}`).join(' ')} unresolved_original_authority=${narReconciliationManifest.unresolved_authority_ids.length}`);
console.log(`NAR AUTHORITY RECOVERY: original=${recoveredNarAuthorityLedger.counts.ORIGINAL_AUTHORITY_PROVEN} recovered=${recoveredNarAuthorityLedger.counts.RECOVERED_AUTHORITY} coverage=${ledgerPass?'38/38':'FAILED'}`);
console.log(`PROVENANCE observed_NAR=${provenance.observed_nar_universe.status} authority=${provenance.authoritative_nar_allocations.status} CID=${provenance.cid_corpus.status} mission=${out.mission_gate.complete?'COMPLETE':'BLOCKED'}`);