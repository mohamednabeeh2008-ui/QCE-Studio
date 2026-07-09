import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const authorityDir=path.join(root,'knowledge/qpfs/wave-3/authorities/qta-000001');
const queuePath=path.join(root,'knowledge/qpfs/wave-3/runtime/root-aware-investigation-queue-v1.json');
const manifest=JSON.parse(fs.readFileSync(path.join(authorityDir,'snapshot-manifest-v1.json'),'utf8'));
const text=fs.readFileSync(path.join(authorityDir,'quran-uthmani.txt'),'utf8');
const actualHash=crypto.createHash('sha256').update(Buffer.from(text,'utf8')).digest('hex');
if(manifest.status!=='FROZEN_PASS'||actualHash!==manifest.sha256) throw new Error('QTA_AUTHORITY_GATE_FAILED');
const ayat=new Map();
for(const line of text.split('\n')){
  const m=line.match(/^(\d+)\|(\d+)\|(.+)$/); if(m) ayat.set(`${m[1]}:${m[2]}`,m[3]);
}
if(ayat.size!==6236) throw new Error(`QTA_INDEX_FAILED:${ayat.size}`);
const queue=JSON.parse(fs.readFileSync(queuePath,'utf8'));
if(queue.count!==69||queue.records.length!==69) throw new Error('QUEUE_GATE_FAILED');

function parseLocator(value){
  if(typeof value!=='string') return null;
  const m=value.match(/(?:^|[^0-9])(\d{1,3}):(\d{1,3})(?::\d+)?(?:$|[^0-9])/);
  return m?{surah:Number(m[1]),ayah:Number(m[2])}:null;
}
function locators(record){
  const values=[...(record.source_locators??[])];
  if(record.initial_boundary) values.push(String(record.initial_boundary));
  const found=[];
  for(const v of values){const p=parseLocator(String(v)); if(p&&ayat.has(`${p.surah}:${p.ayah}`)) found.push(p);}
  return [...new Map(found.map(x=>[`${x.surah}:${x.ayah}`,x])).values()];
}
const hydrated=queue.records.map(record=>{
  const anchors=locators(record);
  const context=anchors.map(a=>({locator:`${a.surah}:${a.ayah}`,text:ayat.get(`${a.surah}:${a.ayah}`)}));
  return {...record,context_authority_id:'QTA-000001',context_authority_sha256:manifest.sha256,context,context_status:context.length?'HYDRATED':'UNRESOLVED_LOCATOR'};
});
const hydratedCount=hydrated.filter(x=>x.context_status==='HYDRATED').length;
const unresolved=hydrated.length-hydratedCount;
const outDir=path.join(root,'knowledge/qpfs/wave-3/runtime');
fs.writeFileSync(path.join(outDir,'root-aware-investigation-queue-hydrated-v1.json'),JSON.stringify({schema:'qpfs/wave-3-hydrated-queue/v1.0',count:hydrated.length,hydrated_count:hydratedCount,unresolved_locator_count:unresolved,authority_sha256:manifest.sha256,records:hydrated},null,2)+'\n');
fs.writeFileSync(path.join(outDir,'context-hydration-report-v1.json'),JSON.stringify({schema:'qpfs/wave-3-context-hydration-report/v1.0',status:unresolved===0?'CLOSED_PASS':'OPEN_WITH_UNRESOLVED_LOCATORS',queue_count:69,hydrated_count:hydratedCount,unresolved_locator_count:unresolved,authority_id:'QTA-000001',authority_sha256:manifest.sha256,next_gate:unresolved===0?'BOUNDARY_RECONSTRUCTION':'LOCATOR_RECONCILIATION'},null,2)+'\n');
console.log(`Context hydration complete: ${hydratedCount}/69 hydrated; ${unresolved} unresolved.`);
