import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const out=path.join(root,'knowledge/qpfs/wave-3/authorities/qta-000001');
const sourceUrl=process.env.QTA_SOURCE_URL || 'https://tanzil.net/pub/download/index.php?quranType=uthmani&outType=txt';
const textType='uthmani';

const response=await fetch(sourceUrl,{headers:{'user-agent':'QCE-Studio-QPFS/1.0 (reproducible research acquisition)'}});
if(!response.ok) throw new Error(`QTA_ACQUISITION_FAILED:${response.status}`);
const raw=await response.text();
if(raw.length<100000) throw new Error(`QTA_PAYLOAD_TOO_SMALL:${raw.length}`);
if(/<html|<!doctype/i.test(raw.slice(0,1000))) throw new Error('QTA_HTML_RESPONSE_REJECTED');

const normalized=raw.replace(/^\uFEFF/,'').replace(/\r\n/g,'\n').trimEnd()+'\n';
const sha256=crypto.createHash('sha256').update(normalized,'utf8').digest('hex');
const lines=normalized.split('\n').filter(Boolean);

let parsed=[];
for(const line of lines){
  const m=line.match(/^(\d+)\|(\d+)\|(.+)$/);
  if(m) parsed.push({surah:Number(m[1]),ayah:Number(m[2]),text:m[3]});
}
if(parsed.length!==6236) throw new Error(`QTA_AYAH_COUNT_FAILED:${parsed.length}`);
if(new Set(parsed.map(x=>x.surah)).size!==114) throw new Error('QTA_SURAH_COUNT_FAILED');
if(parsed[0].surah!==1||parsed[0].ayah!==1) throw new Error('QTA_FIRST_AYAH_FAILED');
if(parsed.at(-1).surah!==114||parsed.at(-1).ayah!==6) throw new Error('QTA_LAST_AYAH_FAILED');
if(new Set(parsed.map(x=>`${x.surah}:${x.ayah}`)).size!==6236) throw new Error('QTA_LOCATOR_UNIQUENESS_FAILED');

fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'quran-uthmani.txt'),normalized);
fs.writeFileSync(path.join(out,'snapshot-manifest-v1.json'),JSON.stringify({
  schema:'qpfs/quran-text-authority-snapshot/v1.0',
  authority_id:'QTA-000001',
  status:'FROZEN_PASS',
  provider:'Tanzil Quran Text',
  canonical_provider_url:'https://tanzil.net/',
  acquisition_url:sourceUrl,
  text_type:textType,
  encoding:'UTF-8',
  normalization:'BOM_REMOVED_CRLF_TO_LF_FINAL_LF',
  sha256,
  byte_length:Buffer.byteLength(normalized,'utf8'),
  ayah_count:6236,
  surah_count:114,
  unique_locators:6236,
  first_locator:'1:1',
  last_locator:'114:6',
  frozen_file:'quran-uthmani.txt'
},null,2)+'\n');
console.log(`PASS: QTA-000001 frozen; sha256=${sha256}`);
