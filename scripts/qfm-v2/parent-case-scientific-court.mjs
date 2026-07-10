import fs from 'node:fs';
const D='data/qfm-v2/whole-quran';
const P=JSON.parse(fs.readFileSync(`${D}/24-packet-disposition-parent-court-v1.0.json`));
const E=JSON.parse(fs.readFileSync(`${D}/18-scholarly-evidence-dossiers-v1.0.json`));
const packetEvidence=new Map(E.items.map(x=>[x.packet_id,x]));
const allowed=new Set(['WITNESS','EXPLICIT_HOLD']);
const cases=[];
let adjudicated=0, explicitHolds=0, unsupportedVerdicts=0, silent=0;
for(const c of P.parent_cases){
  const dossiers=c.packet_ids.map(id=>packetEvidence.get(id));
  if(dossiers.some(x=>!x)) throw Error(`missing evidence dossier for ${c.case_id}`);
  const refs=[...new Set(dossiers.flatMap(x=>x.refs||[]))].sort((a,b)=>{const [as,aa]=a.split(':').map(Number),[bs,ba]=b.split(':').map(Number);return as-bs||aa-ba});
  const signals=[...new Set(dossiers.flatMap(x=>x.named_subject_signals||[]))].sort();
  const allSingleton=dossiers.every(x=>(x.refs||[]).length===1);
  const verdict=allSingleton?'WITNESS':'EXPLICIT_HOLD';
  const record={
    case_id:c.case_id,
    packet_ids:c.packet_ids,
    quranic_refs:refs,
    named_subject_signals:signals,
    text_finding:allSingleton?'All child dossiers are singleton evidence packets; the court certifies witness coverage only.':'The parent case contains multi-reference evidence whose legal narrative identity is not proven by packet boundaries alone.',
    boundary_reason:allSingleton?'Each witness boundary remains exactly its cited Quranic reference; no event or journey boundary is inferred.':'Packet boundaries are transport boundaries, not legal narrative boundaries; parent-level boundary adjudication remains required.',
    identity_reason:allSingleton?'No SAME-event or SAME-journey claim is made; evidence remains WITNESS coverage.':'The available deterministic evidence does not prove SAME, DISTINCT, RELATED, INTERFACE, or DUPLICATE at parent-case level.',
    merge_attack_result:allSingleton?'NOT_APPLICABLE_NO_IDENTITY_MERGE':'UNRESOLVED_REQUIRES_SCHOLARLY_EVIDENCE',
    split_attack_result:allSingleton?'NOT_APPLICABLE_NO_LEGAL_UNIT':'UNRESOLVED_REQUIRES_SCHOLARLY_EVIDENCE',
    rejected_alternative:allSingleton?'Automatic EVENT/JOURNEY promotion rejected.':'Automatic merge, split, or promotion rejected because it would create an unsupported scientific verdict.',
    verdict,
    confidence_class:allSingleton?'PROVEN_NON_IDENTITY_WITNESS':'FAIL_CLOSED',
    promotable:false,
    nar_eligible:false
  };
  if(!allowed.has(verdict)) unsupportedVerdicts++;
  if(verdict==='EXPLICIT_HOLD') explicitHolds++; else adjudicated++;
  cases.push(record);
}
if(cases.length!==P.source_parent_cases) throw Error('parent case denominator mismatch');
if(cases.some(x=>!x.verdict||!x.text_finding||!x.boundary_reason||!x.identity_reason||!x.rejected_alternative)) silent++;
const out={engine:'PARENT_CASE_SCIENTIFIC_COURT_V1',status:explicitHolds?'PARTIAL_FAIL_CLOSED':'PASS',input_parent_cases:P.source_parent_cases,court_records:cases.length,adjudicated,explicit_holds:explicitHolds,silent,unsupported_verdicts:unsupportedVerdicts,nar_allocations:0,rule:'EVENT_NE_JOURNEY_NE_WITNESS; NO_IDENTITY_FROM_PACKETIZATION; UNSUPPORTED_SCIENTIFIC_VERDICTS_FAIL_CLOSED',cases};
if(silent||unsupportedVerdicts) throw Error('court integrity failure');
fs.writeFileSync(`${D}/25-parent-case-court-v1.0.json`,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({status:out.status,input:out.input_parent_cases,adjudicated,explicit_holds:explicitHolds,silent,unsupported_verdicts:unsupportedVerdicts}));
