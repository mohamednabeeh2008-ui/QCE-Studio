import fs from 'node:fs';
import path from 'node:path';
const input='data/qfm-v2/batches/batch-005/04-e01-candidate-families-v0.1.jsonl';
const output='data/qfm-v2/batches/batch-005/05-pnie-local-instances-v0.1.jsonl';
const lines=fs.readFileSync(input,'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const families=lines.filter(x=>x.candidate_id);
let n=0; const rows=[];
for(const f of families){
  for(const witness of f.witnesses){
    const m=witness.match(/^(\d+):(\d+)(?:-(\d+))?$/); if(!m) throw new Error(`Invalid witness ${witness}`);
    n++;
    rows.push({
      local_instance_id:`B005-LI-${String(n).padStart(3,'0')}`,
      family:f.candidate_id,
      subject:f.subject,
      lane:f.lane,
      surah:Number(m[1]),
      witness,
      action_core:f.action_core,
      boundary_status:f.lane==='WITNESS'?'COVERAGE_WITNESS':(f.distribution==='LOCAL'?'LOCAL_PRIMARY_INSTANCE':'SURAH_LOCAL_INSTANCE'),
      identity_status:'UNRECONCILED',
      promotion_status:'NOT_EVALUATED',
      nar_id:null
    });
  }
}
const summary={summary:{subject:'MOSES',families:families.length,local_instances:rows.length,event_instances:rows.filter(x=>x.lane==='EVENT').length,journey_instances:rows.filter(x=>x.lane==='JOURNEY').length,witness_instances:rows.filter(x=>x.lane==='WITNESS').length,nar_ids_allocated:0,next_step:'PNIE_FIVE_DIMENSION_IDENTITY_COMPARISON'}};
fs.writeFileSync(output,[...rows.map(x=>JSON.stringify(x)),JSON.stringify(summary)].join('\n')+'\n');
if(rows.some(x=>x.nar_id!==null))throw new Error('Premature NAR allocation');
if(new Set(rows.map(x=>x.local_instance_id)).size!==rows.length)throw new Error('Duplicate local instance ID');
console.log(`PASS Moses PNIE decomposition: families=${families.length} local_instances=${rows.length} EVENT=${summary.summary.event_instances} JOURNEY=${summary.summary.journey_instances} WITNESS=${summary.summary.witness_instances}`);
