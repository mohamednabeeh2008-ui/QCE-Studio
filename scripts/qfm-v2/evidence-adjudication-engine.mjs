import fs from 'node:fs';
const D='data/qfm-v2/whole-quran';
const input=JSON.parse(fs.readFileSync(`${D}/18-scholarly-evidence-dossiers-v1.0.json`));
const allowedTypes=new Set(['EVENT','JOURNEY','WITNESS','DIALOGUE','TRIAL','CONFRONTATION','MIRACLE_SCENE','DESTRUCTION_SCENE','MIGRATION','KINGSHIP_SCENE','JUDGMENT_SCENE','PARABLE_WITH_NARRATIVE_STRUCTURE','ANONYMOUS_NARRATIVE']);
const decisions=[];const holds=[];
for(const x of input.items){
  const refs=x.refs||[];
  const signals=x.named_subject_signals||[];
  const contiguous=refs.every((r,i)=>!i||(()=>{const [ps,pa]=refs[i-1].split(':').map(Number),[s,a]=r.split(':').map(Number);return s===ps&&a===pa+1})());
  const evidence={contiguous,single_surah:new Set(refs.map(r=>r.split(':')[0])).size===1,named_subject_signals:signals,ref_count:refs.length};
  // This engine may auto-decide only non-identity facts. Legal identity remains fail-closed unless an explicit evidence rule proves it.
  if(refs.length===1){
    decisions.push({packet_id:x.packet_id,verdict:'DISTINCT',legal_type:'WITNESS',boundary_reason:'Single-verse review packet; boundary is exactly the cited Quranic reference.',identity_reason:'The engine certifies only witness coverage for a singleton packet and does not infer sameness with any event or journey.',rejected_alternative:'Automatic EVENT or JOURNEY promotion rejected because a singleton citation alone does not prove legal narrative identity.',evidence_refs:refs,promotable:false,decision_class:'AUTO_SAFE_WITNESS_ONLY'});
  } else {
    holds.push({packet_id:x.packet_id,evidence,reason:'MULTI_VERSE_IDENTITY_REQUIRES_SCHOLARLY_ADJUDICATION',required_attacks:['MERGE_ATTACK','SPLIT_ATTACK']});
  }
}
const out={engine:'EVIDENCE_ADJUDICATION_ENGINE_V1',status:holds.length?'PARTIAL_FAIL_CLOSED':'PASS',input_dossiers:input.dossiers,auto_safe_decisions:decisions.length,scholarly_holds:holds.length,unsupported_identity_inferences:0,rule:'AUTO_DECISION_ALLOWED_ONLY_WHEN_IDENTITY_CLAIM_IS_NOT_INFERRED; EVENT_NE_JOURNEY_NE_WITNESS',decisions,holds};
fs.writeFileSync(`${D}/19-scholarly-decisions-v1.0.json`,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({dossiers:input.dossiers,auto_safe_decisions:decisions.length,scholarly_holds:holds.length}));
