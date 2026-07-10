import fs from 'node:fs';
const D='data/qfm-v2/whole-quran';
const court=JSON.parse(fs.readFileSync(`${D}/25-parent-case-court-v1.0.json`));
const cases=court.cases.map(c=>({case_id:c.case_id,packet_ids:c.packet_ids,quranic_refs:c.quranic_refs,named_subject_signals:c.named_subject_signals||[],queue:c.quranic_refs.length<=12?'Q1_DETERMINISTIC_BOUNDARY':c.named_subject_signals?.length?'Q2_LOCAL_IDENTITY':'Q4_SCHOLARLY_AMBIGUITY',required_fields:['QURANIC_REFS','TEXT_FINDING','BOUNDARY_REASON','IDENTITY_REASON','MERGE_ATTACK_RESULT','SPLIT_ATTACK_RESULT','REJECTED_ALTERNATIVE','VERDICT','CONFIDENCE_CLASS'],allowed_verdicts:['UNIT','MULTIPLE_UNITS','WITNESS','INTERFACE','DUPLICATE','EXPLICIT_HOLD']}));
const counts=Object.fromEntries([...new Set(cases.map(x=>x.queue))].map(q=>[q,cases.filter(x=>x.queue===q).length]));
const out={engine:'SCIENTIFIC_REVIEW_QUEUE_V2',status:'PASS',input_parent_cases:court.input_parent_cases,queue_items:cases.length,queue_counts:counts,items:cases};
if(out.input_parent_cases!==out.queue_items)throw Error('queue mismatch');
fs.writeFileSync(`${D}/25a-scientific-review-queue-v2.json`,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({status:out.status,input:out.input_parent_cases,queues:out.queue_counts}));
