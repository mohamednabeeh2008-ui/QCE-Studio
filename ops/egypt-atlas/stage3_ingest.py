import hashlib,json,mimetypes,sys,time
from pathlib import Path
from urllib.parse import urlparse
import requests
from PIL import Image
IDS=[544863,549994,555809,587760]
ALLOWED={'collectionapi.metmuseum.org','www.metmuseum.org','images.metmuseum.org'}
def ok(u): return urlparse(u).hostname in ALLOWED
def get(s,u):
 if not ok(u): raise RuntimeError('blocked host '+u)
 e=None
 for n in range(4):
  try:
   r=s.get(u,timeout=45,allow_redirects=True)
   if not ok(r.url): raise RuntimeError('blocked redirect '+r.url)
   r.raise_for_status(); return r
  except Exception as x: e=x; time.sleep(2**n)
 raise e
def sha(p):
 h=hashlib.sha256()
 with open(p,'rb') as f:
  for b in iter(lambda:f.read(1048576),b''): h.update(b)
 return h.hexdigest()
def one(oid,out):
 s=requests.Session(); s.headers['User-Agent']='EgyptAtlas-OpenVisualAcquisition/0.1'
 api=f'https://collectionapi.metmuseum.org/public/collection/v1/objects/{oid}'
 try:
  j=get(s,api).json()
  if j.get('objectID')!=oid: raise RuntimeError('id mismatch')
  if j.get('isPublicDomain') is not True: raise RuntimeError('not public domain')
  u=j.get('primaryImage')
  if not u or not ok(u): raise RuntimeError('no official primary image')
  r=get(s,u); ct=r.headers.get('content-type','').split(';')[0]
  if not ct.startswith('image/') or len(r.content)<50000: raise RuntimeError('invalid image payload')
  ext=mimetypes.guess_extension(ct) or '.img'; p=out/f'MET-{oid}-O-E{ext}'; p.write_bytes(r.content)
  with Image.open(p) as im: im.verify()
  with Image.open(p) as im: dims=list(im.size); fmt=im.format
  rec={'object_id':oid,'status':'CERTIFIED_O-E','object_url':j.get('objectURL'),'official_image_url':u,'final_url':r.url,'bytes':p.stat().st_size,'dimensions_px':dims,'format':fmt,'sha256':sha(p),'file':p.name,'metadata':j}
  (out/f'MET-{oid}-Provenance.json').write_text(json.dumps(rec,ensure_ascii=False,indent=2),encoding='utf-8'); return rec
 except Exception as e: return {'object_id':oid,'status':'BLOCKED','error':type(e).__name__+': '+str(e)}
def main():
 out=Path('stage3-output'); out.mkdir(exist_ok=True)
 rs=[one(i,out) for i in IDS]
 m={'results':rs,'certified':sum(x['status']=='CERTIFIED_O-E' for x in rs)}
 (out/'Stage-3-Ingest-Manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
 print(json.dumps(m,ensure_ascii=False,indent=2))
 if m['certified']==0: sys.exit(2)
main()
