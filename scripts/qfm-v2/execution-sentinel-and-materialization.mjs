import fs from 'node:fs';import crypto from 'node:crypto';
const D='data/qfm-v2/whole-quran';fs.mkdirSync(D,{recursive:true});
const sha=process.env.GITHUB_SHA||'LOCAL';const mode=process.env.GITHUB_EVENT_NAME==='push'?'BRANCH_HEAD_PRODUCTION':'READ_ONLY_VALIDATION';
const sentinel={schema:'qfm-v2/execution-sentinel-v1',status:'STARTED',head_sha:sha,workflow_version:'WHOLE_QURAN_COMPLETION_V3',engine_chain:['REFINERY','DOSSIER','ADJUDICATION','COMPILER','PROMOTION','ZERO_PROOF'],execution_mode:mode,ref:process.env.GITHUB_REF||'LOCAL',started_at:new Date().toISOString()};
fs.writeFileSync(`${D}/16-execution-sentinel-v1.0.json`,JSON.stringify(sentinel,null,2)+'\n');
if(process.argv.includes('--verify')){
 const names=['17-scholarly-case-refinery-v1.0.json','18-scholarly-evidence-dossiers-v1.0.json','19-scholarly-decisions-v1.0.json','20-adjudication-state-v1.0.json','21-promotion-controller-v1.0.json','22-zero-proof-closure-controller-v1.0.json'];
 const files=names.map(name=>{const p=`${D}/${name}`;if(!fs.existsSync(p))throw Error(`missing ${name}`);const raw=fs.readFileSync(p);JSON.parse(raw);return {name,bytes:raw.length,sha256:crypto.createHash('sha256').update(raw).digest('hex')}});
 const r=JSON.parse(fs.readFileSync(`${D}/17-scholarly-case-refinery-v1.0.json`));const d=JSON.parse(fs.readFileSync(`${D}/18-scholarly-evidence-dossiers-v1.0.json`));const a=JSON.parse(fs.readFileSync(`${D}/19-scholarly-decisions-v1.0.json`));const c=JSON.parse(fs.readFileSync(`${D}/20-adjudication-state-v1.0.json`));
 const checks={refinery_to_dossiers:r.review_packets===d.dossiers,dossiers_to_decisions:d.dossiers===a.input_dossiers,decisions_partition:a.auto_safe_decisions+a.scholarly_holds===a.input_dossiers,compiler_partition:c.resolved+c.explicit_holds===c.dossiers};
 if(Object.values(checks).some(v=>!v))throw Error(`count reconciliation failed ${JSON.stringify(checks)}`);
 const out={schema:'qfm-v2/materialization-contract-v1',status:'PASS',source_head_sha:sha,files,checks,verified_at:new Date().toISOString()};fs.writeFileSync(`${D}/23-materialization-contract-v1.0.json`,JSON.stringify(out,null,2)+'\n');
}
