import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const allowedRoots=['data/qfm-v2','knowledge'];
const exts=new Set(['.json','.jsonl','.md','.txt','.yaml','.yml']);
const skip=new Set(['node_modules','.git','generated']);
const files=[];
function walk(p){
  if(!fs.existsSync(p)) return;
  for(const e of fs.readdirSync(p,{withFileTypes:true})){
    if(skip.has(e.name)) continue;
    const q=path.join(p,e.name);
    if(e.isDirectory()) walk(q); else if(exts.has(path.extname(e.name))) files.push(q);
  }
}
for(const r of allowedRoots) walk(path.join(root,r));
files.sort();

const marker=/\b(NAR-\d{6}|CID-\d{6}|B\d{3}-LI-\d{3}|B\d{3}-CAND-\d{3}|REC-\d{6})\b/g;
const lane=/\b(EVENT|JOURNEY|WITNESS|SUBJECT|CHARACTER|PEOPLE|NATION|GROUP|HOLD|REVIEW)\b/gi;
const rows=[];
for(const file of files){
  const rel=path.relative(root,file).replaceAll('\\','/');
  const text=fs.readFileSync(file,'utf8');
  const ids=[...new Set(text.match(marker)||[])].sort();
  const lanes=[...new Set((text.match(lane)||[]).map(x=>x.toUpperCase()))].sort();
  if(ids.length||lanes.length){
    rows.push({source:rel,sha256:crypto.createHash('sha256').update(text).digest('hex'),ids,lanes});
  }
}
const narIds=[...new Set(rows.flatMap(r=>r.ids.filter(x=>x.startsWith('NAR-'))))].sort();
const cidIds=[...new Set(rows.flatMap(r=>r.ids.filter(x=>x.startsWith('CID-'))))].sort();
const localIds=[...new Set(rows.flatMap(r=>r.ids.filter(x=>/^B\d{3}-LI-/.test(x))))].sort();

// Safety must distinguish a textual reference to the next ID from an actual permanent allocation.
// Only canonical permanent narrative registries are allocation authorities.
const allocationRows=rows.filter(r=>/permanent-narrative-registry[^/]*\.jsonl$/i.test(r.source));
const allocatedNarIds=[...new Set(allocationRows.flatMap(r=>r.ids.filter(x=>x.startsWith('NAR-'))))].sort();
const nar000039ReferenceRows=rows.filter(r=>r.ids.includes('NAR-000039')).map(r=>r.source);
const nar000039AllocationRows=allocationRows.filter(r=>r.ids.includes('NAR-000039')).map(r=>r.source);

const narNum=id=>Number(id.slice(4));
const observedPermanentNarIds=narIds.filter(id=>narNum(id)<=38);
const expectedPermanentNarIds=Array.from({length:38},(_,i)=>`NAR-${String(i+1).padStart(6,'0')}`);
const missingObservedPermanentNarIds=expectedPermanentNarIds.filter(id=>!observedPermanentNarIds.includes(id));
const referencedButNotAuthorityAllocatedNarIds=observedPermanentNarIds.filter(id=>!allocatedNarIds.includes(id));

const provenance={
  observed_nar_universe:{
    status:missingObservedPermanentNarIds.length===0?'CONTIGUOUS_REFERENCE_COVERAGE':'REFERENCE_GAPS_PRESENT',
    scope:'Repository-observed NAR references only; references do not by themselves prove permanent allocation.',
    expected_range:['NAR-000001','NAR-000038'],
    observed_ids:observedPermanentNarIds,
    missing_ids:missingObservedPermanentNarIds
  },
  authoritative_nar_allocations:{
    status:referencedButNotAuthorityAllocatedNarIds.length===0?'FULLY_RECONCILED':'RECONCILIATION_REQUIRED',
    authority_rule:'Only permanent-narrative-registry*.jsonl files prove permanent NAR allocation.',
    allocated_ids:allocatedNarIds,
    observed_but_not_authority_allocated_ids:referencedButNotAuthorityAllocatedNarIds
  },
  cid_corpus:{
    status:cidIds.length===0?'NOT_MATERIALIZED_IN_SCANNED_SOURCE_ROOTS':'OBSERVED_IN_REPOSITORY',
    scope:'No historical CID count is inferred or fabricated. Recovery requires repository evidence or an explicit canonical manifest.',
    observed_ids:cidIds,
    scanned_source_roots:allowedRoots
  }
};

const out={
  schema:'qfm-v2/narrative-universe-source-census/v0.2',
  generated_by:'scripts/qfm-v2/audit-narrative-universe-coverage.mjs',
  source_roots:allowedRoots,
  source_file_count:files.length,
  evidence_file_count:rows.length,
  recovered_counts:{nar_references:narIds.length,allocated_nar_ids:allocatedNarIds.length,cid_ids:cidIds.length,local_instance_ids:localIds.length},
  provenance,
  mission_gate:{
    mission:'MISSION 005-PRE',
    complete:false,
    blockers:[
      ...(missingObservedPermanentNarIds.length?['NAR_REFERENCE_GAPS']:[]),
      ...(referencedButNotAuthorityAllocatedNarIds.length?['NAR_ALLOCATION_RECONCILIATION_REQUIRED']:[]),
      ...(cidIds.length===0?['CID_CORPUS_NOT_MATERIALIZED']:[])
    ]
  },
  invariants:{last_nar_id_expected:'NAR-000038',next_nar_id_expected:'NAR-000039',nar_000039_must_not_be_allocated:true},
  safety:{
    nar_000039_referenced:nar000039ReferenceRows.length>0,
    nar_000039_reference_rows:nar000039ReferenceRows,
    nar_000039_allocated:nar000039AllocationRows.length>0,
    nar_000039_allocation_rows:nar000039AllocationRows,
    allocation_authority_rule:'Only permanent-narrative-registry*.jsonl files prove permanent NAR allocation.',
    pass:nar000039AllocationRows.length===0
  },
  evidence:rows
};
const outDir=path.join(root,'data/qfm-v2/audits/generated');
fs.mkdirSync(outDir,{recursive:true});
fs.writeFileSync(path.join(outDir,'narrative-universe-source-census-v0.1.json'),JSON.stringify(out,null,2)+'\n');
if(!out.safety.pass) throw new Error(`NAR-000039 allocated in permanent registry: ${nar000039AllocationRows.join(', ')}`);
console.log(`PASS source census: files=${files.length} evidence=${rows.length} NAR_refs=${narIds.length} allocated_NAR=${allocatedNarIds.length} CID=${cidIds.length} LI=${localIds.length}`);
console.log(`PROVENANCE observed_NAR=${provenance.observed_nar_universe.status} authority=${provenance.authoritative_nar_allocations.status} CID=${provenance.cid_corpus.status} mission=${out.mission_gate.complete?'COMPLETE':'BLOCKED'}`);