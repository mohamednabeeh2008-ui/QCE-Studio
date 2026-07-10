import fs from 'node:fs';
const D='data/qfm-v2/whole-quran';
const rows=fs.readFileSync('data/quran/canonical-quran.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
const src=JSON.parse(fs.readFileSync(`${D}/12-s1-hold-compression-v1.0.json`));
const byRef=new Map(rows.map(r=>[`${r.surah}:${r.ayah}`,r]));
const packets=[];let n=0;
for(const c of src.cases){
  const refs=[...c.refs].sort((a,b)=>{const [as,aa]=a.split(':').map(Number),[bs,ba]=b.split(':').map(Number);return as-bs||aa-ba});
  let run=[];
  const flush=()=>{if(!run.length)return;for(let i=0;i<run.length;i+=12){const chunk=run.slice(i,i+12),first=byRef.get(chunk[0]),last=byRef.get(chunk.at(-1));packets.push({packet_id:`PACKET-${String(++n).padStart(5,'0')}`,parent_case:c.id,surah:first.surah,start:first.ayah,end:last.ayah,refs:chunk,kind:'REVIEW_PACKET_NOT_LEGAL_IDENTITY'});}run=[]};
  for(const ref of refs){const r=byRef.get(ref);const prev=run.length?byRef.get(run.at(-1)):null;if(prev&&(r.surah!==prev.surah||r.ayah-prev.ayah>1))flush();run.push(ref);}flush();
}
const seen=new Set();for(const p of packets)for(const ref of p.refs){if(seen.has(ref))throw Error(`duplicate packet membership ${ref}`);seen.add(ref)}
const sourceRefs=new Set(src.cases.flatMap(c=>c.refs));if(seen.size!==sourceRefs.size||[...sourceRefs].some(x=>!seen.has(x)))throw Error('refinery coverage mismatch');
const out={engine:'SCHOLARLY_CASE_REFINERY_V1',status:'PASS',source_cases:src.review_cases,source_candidate_verses:src.candidate_verses,review_packets:packets.length,max_packet_verses:12,orphan_refs:0,duplicate_refs:0,legal_rule:'REVIEW_PACKET_NE_SAME_EVENT_NE_SAME_JOURNEY_NE_SAME_WITNESS',packets};
fs.writeFileSync(`${D}/17-scholarly-case-refinery-v1.0.json`,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({source_cases:src.review_cases,review_packets:packets.length,refs:seen.size}));
