import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const out=path.join(root,'knowledge/qpfs/wave-3/authorities/qta-000001');
const sourceUrl=process.env.QTA_SOURCE_URL || 'https://tanzil.net/pub/download/index.php?quranType=uthmani&outType=txt';
const textType='uthmani';
const surahAyahCounts=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];

if(surahAyahCounts.length!==114||surahAyahCounts.reduce((a,b)=>a+b,0)!==6236) throw new Error('QTA_INTERNAL_SURAH_MAP_FAILED');

const response=await fetch(sourceUrl,{headers:{'user-agent':'QCE-Studio-QPFS/1.0 (reproducible research acquisition)'}});
if(!response.ok) throw new Error(`QTA_ACQUISITION_FAILED:${response.status}`);
const raw=await response.text();
if(raw.length<100000) throw new Error(`QTA_PAYLOAD_TOO_SMALL:${raw.length}`);
if(/<html|<!doctype/i.test(raw.slice(0,1000))) throw new Error('QTA_HTML_RESPONSE_REJECTED');

const sourceNormalized=raw.replace(/^\uFEFF/,'').replace(/\r\n/g,'\n').trimEnd()+'\n';
const sourceSha256=crypto.createHash('sha256').update(sourceNormalized,'utf8').digest('hex');
const lines=sourceNormalized.split('\n').map(x=>x.trim()).filter(Boolean);

let parsed=[];
const located=lines.map(line=>line.match(/^(\d+)\|(\d+)\|(.+)$/)).filter(Boolean);
if(located.length===6236){
  parsed=located.map(m=>({surah:Number(m[1]),ayah:Number(m[2]),text:m[3]}));
}else{
  const textLines=lines.filter(line=>!line.startsWith('#')&&!line.startsWith('//'));
  if(textLines.length!==6236) throw new Error(`QTA_AYAH_COUNT_FAILED:${textLines.length}`);
  let index=0;
  for(let surah=1;surah<=114;surah++){
    for(let ayah=1;ayah<=surahAyahCounts[surah-1];ayah++){
      parsed.push({surah,ayah,text:textLines[index++]});
    }
  }
}

if(parsed.length!==6236) throw new Error(`QTA_AYAH_COUNT_FAILED:${parsed.length}`);
if(new Set(parsed.map(x=>x.surah)).size!==114) throw new Error('QTA_SURAH_COUNT_FAILED');
if(parsed[0].surah!==1||parsed[0].ayah!==1) throw new Error('QTA_FIRST_AYAH_FAILED');
if(parsed.at(-1).surah!==114||parsed.at(-1).ayah!==6) throw new Error('QTA_LAST_AYAH_FAILED');
if(new Set(parsed.map(x=>`${x.surah}:${x.ayah}`)).size!==6236) throw new Error('QTA_LOCATOR_UNIQUENESS_FAILED');
for(const x of parsed) if(!x.text.trim()) throw new Error(`QTA_EMPTY_AYAH:${x.surah}:${x.ayah}`);

const canonical=parsed.map(x=>`${x.surah}|${x.ayah}|${x.text}`).join('\n')+'\n';
const sha256=crypto.createHash('sha256').update(canonical,'utf8').digest('hex');

fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'quran-uthmani.txt'),canonical);
fs.writeFileSync(path.join(out,'snapshot-manifest-v1.json'),JSON.stringify({
  schema:'qpfs/quran-text-authority-snapshot/v1.0',
  authority_id:'QTA-000001',
  status:'FROZEN_PASS',
  provider:'Tanzil Quran Text',
  canonical_provider_url:'https://tanzil.net/',
  acquisition_url:sourceUrl,
  text_type:textType,
  encoding:'UTF-8',
  source_normalization:'BOM_REMOVED_CRLF_TO_LF_FINAL_LF',
  canonicalization:'SOURCE_FORMAT_DETECTED_LOCATORS_VERIFIED_OR_REBUILT_FROM_114_SURAH_MAP',
  source_sha256:sourceSha256,
  sha256,
  byte_length:Buffer.byteLength(canonical,'utf8'),
  ayah_count:6236,
  surah_count:114,
  unique_locators:6236,
  first_locator:'1:1',
  last_locator:'114:6',
  frozen_file:'quran-uthmani.txt'
},null,2)+'\n');
console.log(`PASS: QTA-000001 frozen; ayahs=6236 surahs=114 sha256=${sha256}`);