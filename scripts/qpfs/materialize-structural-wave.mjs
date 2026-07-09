// QPFS Wave 2 deterministic data-plane execution
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const intakePath = path.join(ROOT, 'knowledge/qpfs/structural-harvest/manifests/unified-structural-intake-manifest-v0.1.yaml');
const outDir = path.join(ROOT, 'knowledge/qpfs/structural-harvest/runtime');
const text = fs.readFileSync(intakePath, 'utf8');
const rowRe = /^\s*- \[(QLO-\d{6}), "(\d+):(\d+):(\d+)", ([a-z0-9_]+), ([A-Za-z0-9_-]+)\]$/gm;
const legacy = [...text.matchAll(rowRe)].map(m => ({legacy_id:m[1],surah:Number(m[2]),ayah:Number(m[3]),token:Number(m[4]),family:m[5],authority:m[6]}));
if (legacy.length !== 169) throw new Error(`Expected 169 intake rows, found ${legacy.length}`);

const parseLoc = s => { const [surah,ayah,token]=s.split(':').map(Number); return {surah,ayah,token}; };
const loc = r => `${r.surah}:${r.ayah}:${r.token}`;
const sourceKey = r => `${loc(r)}|${r.family}`;
const sourceOrder = (a,b) => a.surah-b.surah || a.ayah-b.ayah || a.token-b.token;
const tail = [['66:11:3','nominal_mathal'],['74:31:38','nominal_mathal'],['76:28:8','nominal_mathal'],['6:38:12','nominal_mathal_adjective']];

// QSIM-000003 repairs identity, not content. The legacy manifest contains four
// duplicated nominal source identities. Canonicalization therefore operates on
// source identity first, then restores the four terminal rows recorded by QSIM.
const nominalLegacy = legacy.filter(r => r.family === 'nominal_mathal');
const nonNominalLegacy = legacy.filter(r => r.family !== 'nominal_mathal');
const nominalBySource = new Map();
for (const r of nominalLegacy) {
  const key = sourceKey(r);
  if (!nominalBySource.has(key)) nominalBySource.set(key, {...r,authority:`QSIM-000003:DEDUPLICATE_LEGACY_SOURCE_IDENTITY:${r.authority}`});
}
const duplicateNominalRows = nominalLegacy.length - nominalBySource.size;
if (duplicateNominalRows !== 4) throw new Error(`Expected 4 duplicated legacy nominal identities, found ${duplicateNominalRows}`);

const canonicalNominal = [...nominalBySource.values()];
for (const [source_locator,family] of tail) {
  const restored = {...parseLoc(source_locator),family,authority:'QSIM-000003:RECOVER_TERMINAL_ROWS'};
  const key = sourceKey(restored);
  if (canonicalNominal.some(r => sourceKey(r) === key) || nonNominalLegacy.some(r => sourceKey(r) === key)) {
    throw new Error(`QSIM terminal recovery collides with existing source identity: ${key}`);
  }
  canonicalNominal.push(restored);
}
canonicalNominal.sort(sourceOrder);

const canonical = [...canonicalNominal, ...nonNominalLegacy.map(r => ({...r,authority:`QSIM-000003:PRESERVE_NON_NOMINAL_RANGE:${r.authority}`}))];
if (canonical.length !== 169) throw new Error(`QSIM arithmetic failed: ${canonical.length}`);
canonical.forEach((r,i)=>{r.occurrence_id=`QLO-${String(i+1).padStart(6,'0')}`;r.source_locator=loc(r);r.canonical_row_key=sourceKey(r);});
const ids = new Set(canonical.map(r=>r.occurrence_id));
const rowKeys = new Set(canonical.map(r=>r.canonical_row_key));
if (ids.size !== 169 || rowKeys.size !== 169) {
  const counts = new Map();
  for (const r of canonical) counts.set(r.canonical_row_key,(counts.get(r.canonical_row_key)||0)+1);
  const duplicates=[...counts.entries()].filter(([,count])=>count>1).map(([key,count])=>`${key} x${count}`);
  throw new Error(`Canonical uniqueness gate failed; ids=${ids.size}, rowKeys=${rowKeys.size}, duplicates=${duplicates.join(', ') || 'none'}`);
}

const dispositions = canonical.map(r => ({
  occurrence_id:r.occurrence_id,
  source_locator:r.source_locator,
  family:r.family,
  disposition:r.family === 'nominal_mathal' ? 'SIGNAL_PRESENT' : 'AMBIGUOUS_SIGNAL',
  signal_codes:r.family === 'nominal_mathal' ? ['EXPLICIT_MATHAL_FORMULA'] : [],
  exclusion_code:null,
  basis:r.family === 'nominal_mathal' ? 'ROOT_AWARE_LEXICAL_ANCHOR_REQUIRES_CONTEXT_VALIDATION' : 'CROSS_FORM_REQUIRES_CONTEXTUAL_RECONSTRUCTION'
}));
if (dispositions.length !== 169) throw new Error('Disposition completeness gate failed');

const groups = new Map();
for (const r of canonical.filter(r=>r.family==='nominal_mathal')) {
  const verse=`${r.surah}:${r.ayah}`;
  if(!groups.has(verse)) groups.set(verse,[]);
  groups.get(verse).push(r);
}
const candidates=[...groups.entries()].map(([verse,anchors],i)=>({
  candidate_id:`QPC-${String(i+1).padStart(6,'0')}`,
  discovery_channels:['ROOT_AWARE'],
  anchor_ids:anchors.map(a=>a.occurrence_id),
  source_locators:anchors.map(a=>a.source_locator),
  initial_boundary:verse,
  boundary_basis:'CONTAINING_AYAH_INITIAL_WINDOW',
  signal_codes:['EXPLICIT_MATHAL_FORMULA'],
  competing_exclusion_codes:[],
  provenance_edges:anchors.map(a=>({from:a.occurrence_id,to:'QSIM-000003',relation:'DERIVED_UNDER_IDENTITY_AUTHORITY'})),
  validation_status:'UNRESOLVED',
  validation_reason:'TEXT_CONTEXT_AND_BOUNDARY_RECONSTRUCTION_REQUIRED',
  parable_decision:null,
  qpu_id:null
}));

const familyCounts = Object.fromEntries([...new Set(canonical.map(r=>r.family))].sort().map(f=>[f,canonical.filter(r=>r.family===f).length]));
const report={
  schema:'qpfs/wave-execution-report/v2.0',
  wave:'WAVE_2_STRUCTURAL_CANDIDATE_GENERATION',
  status:'CLOSED_WITH_UNRESOLVED_ROUTED_FORWARD',
  authority:'QSIM-000003',
  lexical_rows:169,
  unique_ids:ids.size,
  unique_row_keys:rowKeys.size,
  legacy_duplicate_nominal_identities_removed:duplicateNominalRows,
  family_counts:familyCounts,
  dispositions:{total:169,signal_present:dispositions.filter(d=>d.disposition==='SIGNAL_PRESENT').length,ambiguous_signal:dispositions.filter(d=>d.disposition==='AMBIGUOUS_SIGNAL').length,no_sufficient_signal:0},
  proposal_count:candidates.length,
  validation:{pass_to_investigation:0,reject:0,unresolved:candidates.length},
  root_blind:{status:'ROUTED_TO_CORPUS_WIDE_DISCOVERY',reason:'LEXICAL_169_ROW_INTAKE_CANNOT_PROVE_ROOT_BLIND_COMPLETENESS'},
  canonical_parable_decisions_created:false,
  qpu_created:false,
  next_wave:'WAVE_3_CONTEXTUAL_RECONSTRUCTION_CLASSIFICATION_AND_ROOT_BLIND_DISCOVERY'
};

fs.mkdirSync(outDir,{recursive:true});
fs.writeFileSync(path.join(outDir,'canonical-lexical-runtime-v2.json'),JSON.stringify({schema:'qpfs/canonical-lexical-runtime/v2.0',authority:'QSIM-000003',count:169,rows:canonical},null,2)+'\n');
fs.writeFileSync(path.join(outDir,'structural-signal-dispositions-v1.json'),JSON.stringify({schema:'qpfs/structural-signal-dispositions/v1.0',count:169,records:dispositions},null,2)+'\n');
fs.writeFileSync(path.join(outDir,'structural-candidate-proposals-v2.json'),JSON.stringify({schema:'qpfs/structural-candidate-proposals/v2.0',status:'MATERIALIZED',source_count:169,candidate_count:candidates.length,candidates},null,2)+'\n');
fs.writeFileSync(path.join(outDir,'wave-2-execution-report-v2.json'),JSON.stringify(report,null,2)+'\n');
console.log(`PASS: Wave 2 reconciled 169 unique rows, removed ${duplicateNominalRows} duplicate legacy identities, routed ${candidates.length} unresolved candidate proposals, created no parable decisions and no QPUs`);
