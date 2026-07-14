import fs from 'node:fs';
const src='data/quran/canonical-quran.jsonl', out='data/qfm-v2/whole-quran';
const rows=fs.readFileSync(src,'utf8').trim().split(/\r?\n/).map(JSON.parse);
const names=['آدم','نوح','إبراهيم','إسماعيل','إسحاق','يعقوب','يوسف','موسى','هارون','داود','سليمان','أيوب','يونس','زكريا','يحيى','عيسى','مريم','هود','صالح','شعيب','إدريس','إلياس','اليسع','لوط','فرعون','قارون','هامان','لقمان','طالوت','جالوت','السامري','ذو القرنين','أصحاب الكهف','بني إسرائيل','عاد','ثمود','مدين','أصحاب الأيكة','أصحاب السبت','أصحاب الأخدود','أصحاب الفيل'];
const narrative=['قال','قالوا','إذ','لما','فلما','جاء','ذهب','خرج','دخل','أرسل','نجى','أنجى','أغرق','قتل','سجد','دعا','نادى','أوحى','قصص','نبأ','خبر','قصة','ملك','قرية','قوم','امرأة','رجل','فتى','عبد','أصحاب'];
const direct=new Set();
for(let i=0;i<rows.length;i++){const t=rows[i].text; if(names.some(x=>t.includes(x))||narrative.some(x=>t.includes(x)))direct.add(i);}
const expanded=new Set(direct);for(const i of direct)for(let d=-2;d<=2;d++){const j=i+d;if(j>=0&&j<rows.length&&rows[j].surah===rows[i].surah)expanded.add(j);}
const classify=rows.map((r,i)=>({ref:`${r.surah}:${r.ayah}`,surah:r.surah,ayah:r.ayah,preliminary_disposition:direct.has(i)?'NARRATIVE_SIGNAL':expanded.has(i)?'NARRATIVE_CONTEXT':'NON_NARRATIVE_CANDIDATE',review_status:expanded.has(i)?'REQUIRES_SEMANTIC_REVIEW':'REQUIRES_NEGATIVE_AUDIT',matched_names:names.filter(x=>r.text.includes(x)),candidate_id:expanded.has(i)?`V-${String(i+1).padStart(6,'0')}`:null}));
if(classify.length!==6236||new Set(classify.map(x=>x.ref)).size!==6236)throw Error('denominator drift');
const candidates=classify.filter(x=>x.candidate_id), non=classify.filter(x=>!x.candidate_id);
const lanes={PROPHETS:[],NON_PROPHETIC_CHARACTERS:[],COLLECTIVE_ENTITIES:[],EVENTS_JOURNEYS_DIALOGUES:[],WITNESSES:[],VERSE_COVERAGE:classify,CID_RECONSTRUCTION:[],INDEPENDENT_AUDIT:[]};
for(const x of candidates){const n=x.matched_names.join(' ');if(/آدم|نوح|إبراهيم|إسماعيل|إسحاق|يعقوب|يوسف|موسى|هارون|داود|سليمان|أيوب|يونس|زكريا|يحيى|عيسى|هود|صالح|شعيب|إدريس|إلياس|اليسع|لوط/.test(n))lanes.PROPHETS.push(x.candidate_id);if(/فرعون|قارون|هامان|لقمان|طالوت|جالوت|السامري|ذو القرنين|مريم/.test(n))lanes.NON_PROPHETIC_CHARACTERS.push(x.candidate_id);if(/بني إسرائيل|عاد|ثمود|مدين|أصحاب/.test(n))lanes.COLLECTIVE_ENTITIES.push(x.candidate_id);lanes.EVENTS_JOURNEYS_DIALOGUES.push(x.candidate_id);lanes.WITNESSES.push(x.candidate_id);}
fs.writeFileSync(`${out}/06-wave-2-verse-preclassification-v0.1.jsonl`,classify.map(JSON.stringify).join('\n')+'\n');
fs.writeFileSync(`${out}/07-wave-2-parallel-harvest-summary-v0.1.json`,JSON.stringify({wave:'W2',status:'CANDIDATE_HARVEST_COMPLETE_NOT_SCHOLARLY_CERTIFIED',input:6236,narrative_signal:direct.size,narrative_context:candidates.length-direct.size,non_narrative_candidate:non.length,unscanned:0,unclassified:0,semantic_review_required:candidates.length,negative_audit_required:non.length,lanes:Object.fromEntries(Object.entries(lanes).map(([k,v])=>[k,{items:v.length}])),nar_allocation_frozen:true},null,2)+'\n');
console.log(JSON.stringify({input:6236,direct:direct.size,candidates:candidates.length,non:non.length}));
