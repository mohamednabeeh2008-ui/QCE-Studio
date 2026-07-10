import fs from 'node:fs';
const D='data/qfm-v2/whole-quran';
const R=JSON.parse(fs.readFileSync(`${D}/17-scholarly-case-refinery-v1.0.json`));
const E=JSON.parse(fs.readFileSync(`${D}/18-scholarly-evidence-dossiers-v1.0.json`));
const P=new Map(R.packets.map(x=>[x.packet_id,x]));
const dossier=new Map(E.items.map(x=>[x.packet_id,x]));
const byParent=new Map();
for(const p of R.packets){if(!byParent.has(p.parent_case))byParent.set(p.parent_case,[]);byParent.get(p.parent_case).push(p)}
const dispositions=[];
for(const p of R.packets){
  const d=dossier.get(p.packet_id); if(!d) throw Error(`missing dossier ${p.packet_id}`);
  const singleton=p.refs.length===1;
  dispositions.push({packet_id:p.packet_id,parent_case:p.parent_case,refs:p.refs,disposition:singleton?'SAFE_WITNESS_EVIDENCE':'PARENT_CASE_EVIDENCE',legal_identity_claim:false,nar_eligible:false,reason:singleton?'Single-ref packet may be retained as evidence/witness only; packetization does not establish a legal identity.':'Multi-ref packet is evidence transport only and returns to its parent case for identity adjudication.'});
}
const seen=new Set(); for(const x of dispositions)for(const r of x.refs){if(seen.has(r))throw Error(`duplicate disposition ref ${r}`);seen.add(r)}
const source=new Set(R.packets.flatMap(x=>x.refs)); if(seen.size!==source.size||[...source].some(x=>!seen.has(x)))throw Error('packet disposition coverage mismatch');
const parentCases=[...byParent].map(([case_id,packets])=>({case_id,packet_ids:packets.map(x=>x.packet_id),refs:[...new Set(packets.flatMap(x=>x.refs))],packet_count:packets.length,status:'READY_FOR_PARENT_CASE_ADJUDICATION',legal_identity_claim:false,court:{text:'PENDING_TEXT_COURT',boundary:'PENDING_BOUNDARY_COURT',identity:'PENDING_IDENTITY_COURT',merge_attack:'REQUIRED',split_attack:'REQUIRED'}}));
const out={engine:'PACKET_DISPOSITION_PARENT_COURT_V1',status:'PASS',source_packets:R.review_packets,source_parent_cases:R.source_cases,packet_dispositions:dispositions.length,parent_cases_restored:parentCases.length,orphan_packets:0,duplicate_refs:0,packet_legal_identity_claims:0,nar_allocations:0,invariants:['REVIEW_PACKET_NE_LEGAL_IDENTITY','EVENT_NE_JOURNEY_NE_WITNESS','NO_NAR_FROM_PACKETIZATION'],dispositions,parent_cases:parentCases};
if(out.source_packets!==out.packet_dispositions)throw Error('packet count mismatch');
if(out.source_parent_cases!==out.parent_cases_restored)throw Error('parent case restoration mismatch');
fs.writeFileSync(`${D}/24-packet-disposition-parent-court-v1.0.json`,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({status:out.status,packets:out.packet_dispositions,parent_cases:out.parent_cases_restored,orphan_packets:0,duplicate_refs:0}));
