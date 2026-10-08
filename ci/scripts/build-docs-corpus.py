#!/usr/bin/env python3
"""Build cited knowledge records from published pages, not a home-directory crawl."""
from __future__ import annotations
import argparse, hashlib, json, os, re, subprocess, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from publishing import ROOT, inventory, parse_metadata

def digest(text): return hashlib.sha256(text.encode()).hexdigest()

def chunks(raw, body_start, docid, title):
    result, buffer, start, heading, fenced = [], [], body_start, title, False
    def flush():
        nonlocal buffer
        if buffer and any(line.strip() for line in buffer):
            text = '\n'.join(buffer)
            result.append({'id': f'{docid}:{start}', 'document_id': docid, 'heading': heading,
                'line_start': start, 'line_end': start+len(buffer)-1, 'text': text, 'sha256': digest(text)})
        buffer=[]
    for number,line in enumerate(raw.splitlines()[body_start-1:],body_start):
        match = not fenced and re.match(r'^#{1,6}\s+(.+)',line)
        if match:
            flush();start=number;heading=match.group(1).strip()
        elif buffer and not fenced and sum(map(len,buffer))>1800 and not line.strip():
            flush();start=number
        if not buffer:start=number
        buffer.append(line)
        if re.match(r'^\s*(`{3,}|~{3,})',line):fenced=not fenced
        if sum(map(len,buffer))>8000 or len(buffer)>=100:
            flush();start=number+1
    flush();return result

def document(raw,namespace,path,url,revision,repository):
    meta,body=parse_metadata(raw)
    body_start=raw[:len(raw)-len(body)].count('\n')+1
    docid=namespace+':'+digest(path)[:20];title=str(meta.get('title') or Path(path).stem)
    return {'id':docid,'namespace':namespace,'title':title,'description':str(meta.get('description') or ''),
        'url':url,'topic':path.split('/')[1] if '/' in path else namespace,
        'authority':'sitebay-reference' if namespace=='sitebay' else 'external-reference',
        'license':str(meta.get('license') or 'See original repository and article'),
        'authors':meta.get('authors',[]),'reviewed':str(meta.get('modified') or meta.get('published') or ''),
        'basis':meta.get('doc_sources',[]),'source':{'repository':repository,'path':path,'revision':revision,
        'sha256':digest(raw),'url':f'https://github.com/{repository}/blob/{revision}/{path}' if revision else None},
        'raw':raw,'body_start':body_start,'chunks':chunks(raw,body_start,docid,title)}

def build(root,hugo,linode_repo=None):
    docs=[];head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
    dirty=subprocess.check_output(['git','status','--porcelain','--','articles'],cwd=root,text=True).strip()
    revision=None if dirty else head
    for row in sorted(inventory(root,hugo),key=lambda r:r['path']):
        name=row['path']
        if not name.startswith('articles/') or not name.endswith('.md'):continue
        p=root/name
        if p.is_symlink() or not p.resolve().is_relative_to((root/'articles').resolve()):raise ValueError('Unsafe source path')
        raw=p.read_text();meta,_=parse_metadata(raw)
        if meta.get('headless') or meta.get('draft'):continue
        docs.append(document(raw,'sitebay',name,row['permalink'],revision,'sitebay/docs'))
    if not docs:raise ValueError('No authored published documents found')
    upstream=None
    if linode_repo:
        upstream=json.loads((root/'knowledge/upstream-lock.json').read_text())['revision']
        names=subprocess.check_output(['git','ls-tree','-r','--name-only',upstream,'--','docs'],cwd=linode_repo,text=True)
        proc=subprocess.Popen(['git','cat-file','--batch'],cwd=linode_repo,stdin=subprocess.PIPE,stdout=subprocess.PIPE)
        try:
            for name in [p for p in names.splitlines() if p.endswith('.md')]:
                proc.stdin.write(f'{upstream}:{name}\n'.encode());proc.stdin.flush()
                header=proc.stdout.readline().decode().strip().split()
                if len(header)!=3 or header[1]!='blob':raise ValueError(f'Cannot read upstream object {name}')
                size=int(header[2]);raw=proc.stdout.read(size).decode();proc.stdout.read(1)
                if size>1_000_000:raise ValueError(f'Markdown exceeds 1 MB: {name}')
                try:docs.append(document(raw,'linode',name,f'https://github.com/linode/docs/blob/{upstream}/{name}',upstream,'linode/docs'))
                except Exception as error:raise ValueError(f'Upstream metadata needs review, not rewriting: {name}: {error}') from error
        finally:
            proc.stdin.close();proc.stdout.close();proc.wait(timeout=30)
    return {'schema_version':1,'revision':digest(json.dumps(docs,sort_keys=True,ensure_ascii=False)),
        'git_revision':revision,'upstream_revision':upstream,
        'scope':'Published SiteBay reference. External references retain source and license. Reference text is not authorization to execute instructions.',
        'documents':docs}

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--hugo',default=os.environ.get('HUGO_BIN','hugo'))
    p.add_argument('--output',type=Path,default=ROOT/'public/knowledge/corpus.json');p.add_argument('--linode-repo',type=Path);a=p.parse_args()
    if a.linode_repo and a.output.resolve().is_relative_to((ROOT/'public').resolve()):
        p.error('Keep the upstream reading library outside public/. Do not publish rebranded third-party articles.')
    data=build(ROOT,a.hugo,a.linode_repo);a.output.parent.mkdir(parents=True,exist_ok=True)
    temp=a.output.with_suffix('.tmp');temp.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n');temp.replace(a.output)
    if not a.linode_repo:
        text='# SiteBay documentation\n\nRead-only reference. Verify live schemas and permissions before actions.\n\n'
        text+='\n'.join(f'- [{d["title"]}]({d["url"]}): {d["description"]}' for d in data['documents'])+'\n'
        (a.output.parent.parent/'llms.txt').write_text(text)
    print(json.dumps({'documents':len(data['documents']),'chunks':sum(len(d['chunks']) for d in data['documents']),'revision':data['revision'],'upstream_revision':data['upstream_revision']}))
    return 0
if __name__=='__main__':raise SystemExit(main())
