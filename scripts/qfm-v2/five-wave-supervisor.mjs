import fs from 'node:fs';
const D='data/qfm-v2/whole-quran';
const exists=f=>fs.existsSync(`${D}/${f}`);
const read=f=>exists(f)?JSON.parse(fs.readFileSync(`${D}/${f}`)):null;
const waves=[
 {id:'W1',name:'SCIENTIFIC_ADJUDICATION',proof:'25a-scientific-review-queue-v2.json'},
 {id:'W2',name:'GLOBAL_IDENTITY',proof:'27-canonical-legal-units-v1.0.json'},
 {id:'W3',name:'GLOBAL_NAR_COLLISION',proof:'28-global-collision-audit-v1.0.json'},
 {id:'W4',name:'SERIAL_PROMOTION',proof:'30-global-registry-ledger-v1.0.json'},
 {id:'W5',name:'ZERO_PROOF_AND_CERTIFICATION',proof:'33-whole-quran-final-certificate-v1.0.json'}
];
const tenSteps=(wave,problem)=>[
 `1. Freeze the exact failing state for ${wave.id}.`,
 `2. Name one root problem only: ${problem}.`,
 '3. Preserve all Quranic provenance and current legal records.',
 '4. Reproduce the failure from the branch head.',
 '5. Isolate the smallest owning engine or gate.',
 '6. Apply the smallest non-destructive correction.',
 '7. Re-run the owning wave only.',
 '8. Verify counts, hashes, orphans, duplicates, holds, and unsupported claims.',
 '9. Persist material evidence before claiming success.',
 `10. If PASS, advance immediately beyond ${wave.id}; otherwise repeat with the new exact problem.`
];
let active=waves.find(w=>!exists(w.proof))||waves[4];
let problem='NO_PROBLEM';
if(active.id==='W1') problem=exists('25a-scientific-review-queue-v2.json')?'SCIENTIFIC_VERDICTS_NOT_YET_MATERIALIZED':'SCIENTIFIC_REVIEW_QUEUE_NOT_MATERIALIZED';
if(active.id==='W2') problem='GLOBAL_IDENTITY_NOT_CLOSED';
if(active.id==='W3') problem='NAR_COLLISION_AUDIT_MISSING';
if(active.id==='W4') problem='SERIAL_PROMOTION_NOT_CLOSED';
if(active.id==='W5'&&!exists(active.proof)) problem='ZERO_PROOF_CERTIFICATE_MISSING';
const state={engine:'FIVE_WAVE_SUPERVISOR_V1',role:'USER_PROXY_EXECUTION_GOVERNOR',mode:problem==='NO_PROBLEM'?'ADVANCE':'PROBLEM_SOLVING',active_wave:active.id,active_wave_name:active.name,problem,protocol:problem==='NO_PROBLEM'?['ADVANCE_IMMEDIATELY_TO_NEXT_WAVE']:tenSteps(active,problem),rules:['NO_SILENT_STOP','NO_FALSE_PASS','NO_PREMATURE_NAR','NO_MAIN_WRITE_BEFORE_CERTIFICATION','PROBLEM_REQUIRES_TEN_STEP_RECOVERY','PASS_REQUIRES_IMMEDIATE_ADVANCE'],wave_state:waves.map(w=>({wave:w.id,name:w.name,proof:w.proof,materialized:exists(w.proof)})),generated_at:new Date().toISOString()};
fs.writeFileSync(`${D}/00-five-wave-supervisor-state-v1.0.json`,JSON.stringify(state,null,2)+'\n');
console.log(JSON.stringify(state));
if(process.argv.includes('--require-complete')&&state.wave_state.some(x=>!x.materialized))process.exit(2);
