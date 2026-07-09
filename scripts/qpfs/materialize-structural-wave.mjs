// QPFS Wave 2 deterministic data-plane execution
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const intakePath = path.join(ROOT, 'knowledge/qpfs/structural-harvest/manifests/unified-structural-intake-manifest-v0.1.yaml');
const outDir = path.join(ROOT, 'knowledge/qpfs/structural-harvest/runtime');

const text = fs.readFileSync(intakePath, 'utf8');
const rowRe = /^\s*- \[(QLO-\d{6}), "(\d+):(\d+):(\d+)", ([a-z0-9_]+), ([A-Za-z0-9_-]+)\]$/gm;
const legacy = [];
for (const m of text.matchAll(rowRe)) legacy.push({ legacy_id:m[1], surah:Number(m[2]), ayah:Number(m[3]), token:Number(m[4]), family:m[5], authority:m[6] });
if (legacy.length !== 169) throw new Error(`Expected 169 legacy rows, found ${legacy.length}`);

const head = [['2:17:1','nominal_mathal'],['2:17:2','nominal_mathal'],['2:26:7','nominal_mathal'],['2:26:28','nominal_mathal'],['2:171:1','nominal_mathal'],['2:171:4','nominal_mathal'],['2:214:8','nominal_mathal']];
const tail = [['66:11:3','nominal_mathal'],['74:31:38','nominal_mathal'],['76:28:8','nominal_mathal'],['6:38:12','noun_amthal']];
const parseLoc = s => { const [surah,ayah,token]=s.split(':').map(Number); return {surah,ayah,token}; };
const key = r => `${r.surah}:${r.ayah}:${r.token}`;
const duplicateHead = new Set(head.slice(2).map(([loc])=>loc));
const middleSource = legacy.slice(0,88).filter(r=>!duplicateHead.has(key(r)));
const preserved = legacy.slice(88);
const canonical = [];
for (const [loc,family] of head) canonical.push({...parseLoc(loc),family,authority:'QSIM-000003:head'});
for (const r of middleSource) canonical.push({surah:r.surah,ayah:r.ayah,token:r.token,family:r.family,authority:r.authority,legacy_id:r.legacy_id});
for (const [loc,family] of tail) canonical.push({...parseLoc(loc),family,authority:'QSIM-000003:tail'});
for (const r of preserved) canonical.push({surah:r.surah,ayah:r.ayah,token:r.token,family:r.family,authority:r.authority,legacy_id:r.legacy_id});
if (canonical.length !== 169) throw new Error(`Reconciliation failed: expected 169, got ${canonical.length}`);
canonical.forEach((r,i)=>{r.occurrence_id=`QLO-${String(i+1).padStart(6,'0')}`;r.source_locator=key(r);r.canonical_row_key=`${r.source_locator}|${r.family}`;});
const ids=new Set(canonical.map(r=>r.occurrence_id));
const rowKeys=new Set(canonical.map(r=>r.canonical_row_key));
if(ids.size!==169||rowKeys.size!==169) throw new Error('Uniqueness gate failed');

const groups=new Map();
for(const r of canonical){if(r.family!=='nominal_mathal')continue;const gk=`${r.surah}:${r.ayah}`;if(!groups.has(gk))groups.set(gk,[]);groups.get(gk).push(r);}
const candidates=[...groups.entries()].map(([verse,anchors],i)=>({candidate_id:`QPC-${String(i+1).padStart(6,'0')}`,status:'PROPOSAL_PENDING_VALIDATION',discovery_channel:'LEXICAL_STRUCTURAL_ANCHOR',verse,initial_boundary:verse,anchor_occurrence_ids:anchors.map(a=>a.occurrence_id),anchor_locators:anchors.map(a=>a.source_locator),signal:'NOMINAL_MATHAL_ANCHOR',parable_decision:null,qpu_id:null}));

fs.mkdirSync(outDir,{recursive:true});
fs.writeFileSync(path.join(outDir,'canonical-lexical-runtime-v1.json'),JSON.stringify({schema:'qpfs/canonical-lexical-runtime/v1.0',authority:'QSIM-000003',count:canonical.length,rows:canonical},null,2)+'\n');
fs.writeFileSync(path.join(outDir,'structural-candidate-proposals-v1.json'),JSON.stringify({schema:'qpfs/structural-candidate-proposals/v1.0',status:'GENERATED_PENDING_INDEPENDENT_VALIDATION',source_count:canonical.length,candidate_count:candidates.length,candidates},null,2)+'\n');
fs.writeFileSync(path.join(outDir,'wave-2-execution-report.json'),JSON.stringify({schema:'qpfs/wave-execution-report/v1.0',wave:'WAVE_2_STRUCTURAL_CANDIDATE_GENERATION',lexical_rows:canonical.length,unique_ids:ids.size,unique_row_keys:rowKeys.size,proposal_count:candidates.length,canonical_parable_decisions_created:false,qpu_created:false,next_gate:'INDEPENDENT_CANDIDATE_VALIDATION'},null,2)+'\n');
console.log(`PASS: materialized ${canonical.length} canonical rows and ${candidates.length} candidate proposals`);
