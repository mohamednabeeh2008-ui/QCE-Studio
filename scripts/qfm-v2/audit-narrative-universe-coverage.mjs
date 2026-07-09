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

const out={
  schema:'qfm-v2/narrative-universe-source-census/v0.1',
  generated_by:'scripts/qfm-v2/audit-narrative-universe-coverage.mjs',
  source_roots:allowedRoots,
  source_file_count:files.length,
  evidence_file_count:rows.length,
  recovered_counts:{nar_references:narIds.length,allocated_nar_ids:allocatedNarIds.length,cid_ids:cidIds.length,local_instance_ids:localIds.length},
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
