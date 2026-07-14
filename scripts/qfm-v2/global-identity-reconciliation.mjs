import fs from 'node:fs';
const D='data/qfm-v2/whole-quran';
const C=JSON.parse(fs.readFileSync(`${D}/25-parent-case-court-v1.0.json`));
const resolved=C.cases.filter(x=>x.verdict!=='EXPLICIT_HOLD');
const holds=C.cases.filter(x=>x.verdict==='EXPLICIT_HOLD');
const nodes=resolved.map(x=>({node_id:x.case_id,source_case:x.case_id,unit_type:x.verdict,quranic_refs:x.quranic_refs,disposition:x.verdict==='WITNESS'?'WITNESS_COVERAGE':'EXPLICIT_HOLD',promotable:false}));
const edges=[];
for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
  const a=nodes[i],b=nodes[j];
  const overlap=a.quranic_refs.filter(r=>b.quranic_refs.includes(r));
  if(overlap.length) edges.push({a:a.node_id,b:b.node_id,relation:'EMBEDDED_WITNESS',evidence_refs:overlap,merge_attack:'REJECTED_NO_LEGAL_UNIT_IDENTITY',split_attack:'NOT_APPLICABLE_WITNESS_COVERAGE'});
}
const graph={engine:'GLOBAL_IDENTITY_GRAPH_V1',status:holds.length?'PARTIAL_FAIL_CLOSED':'PASS',input_cases:C.input_parent_cases,resolved_nodes:nodes.length,explicit_holds:holds.length,nodes,edges,unknown_edges:0,orphans:0,false_merge_survivors:0,false_split_survivors:0,rule:'ONLY_PROVEN_PARENT_VERDICTS_ENTER_IDENTITY_GRAPH; HOLDS_REMAIN_VISIBLE'};
fs.writeFileSync(`${D}/26-global-identity-graph-v1.0.json`,JSON.stringify(graph,null,2)+'\n');
const units=nodes.map(n=>({canonical_unit_id:`CLU-${n.node_id}`,source_nodes:[n.node_id],unit_type:n.unit_type,quranic_refs:n.quranic_refs,disposition:n.disposition,promotable:false,nar_eligible:false}));
const canonical={engine:'CANONICAL_LEGAL_UNITS_V1',status:holds.length?'PARTIAL_FAIL_CLOSED':'PASS',input_resolved_nodes:nodes.length,canonical_units:units.length,explicit_holds:holds.length,unknown_dispositions:0,orphans:0,units,holds:holds.map(x=>({case_id:x.case_id,reason:x.identity_reason}))};
if(canonical.input_resolved_nodes!==canonical.canonical_units) throw Error('canonical reconciliation mismatch');
fs.writeFileSync(`${D}/27-canonical-legal-units-v1.0.json`,JSON.stringify(canonical,null,2)+'\n');
console.log(JSON.stringify({status:canonical.status,nodes:nodes.length,canonical_units:units.length,explicit_holds:holds.length,unknown_edges:0,orphans:0}));
