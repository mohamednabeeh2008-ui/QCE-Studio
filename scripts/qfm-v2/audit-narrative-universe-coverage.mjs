import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const allowedRoots=['data/qfm-v2','knowledge'];
const exts=new Set(['.json','.jsonl','.md','.txt','.yaml','.yml']);
const skip=new Set(['node_modules','.git']);
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
const out={
  schema:'qfm-v2/narrative-universe-source-census/v0.1',
  generated_by:'scripts/qfm-v2/audit-narrative-universe-coverage.mjs',
  source_roots:allowedRoots,
  source_file_count:files.length,
  evidence_file_count:rows.length,
  recovered_counts:{nar_ids:narIds.length,cid_ids:cidIds.length,local_instance_ids:localIds.length},
  invariants:{last_nar_id_expected:'NAR-000038',next_nar_id_expected:'NAR-000039',nar_000039_must_be_absent:true},
  safety:{nar_000039_present:narIds.includes('NAR-000039'),pass:!narIds.includes('NAR-000039')},
  evidence:rows
};
const outDir=path.join(root,'data/qfm-v2/audits/generated');
fs.mkdirSync(outDir,{recursive:true});
fs.writeFileSync(path.join(outDir,'narrative-universe-source-census-v0.1.json'),JSON.stringify(out,null,2)+'\n');
if(!out.safety.pass) throw new Error('NAR-000039 already present; production guard failed');
console.log(`PASS source census: files=${files.length} evidence=${rows.length} NAR=${narIds.length} CID=${cidIds.length} LI=${localIds.length}`);
