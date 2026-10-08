"""Reject retired branding in active text and generated references.

Compatibility route maps, negative tests, and historical receipts are not
product copy. Raster-image pixels are not OCR-scanned by this text check.
"""
from __future__ import annotations
import argparse
import json
import re
from pathlib import Path
from publishing import ROOT

RETIRED = re.compile(rb'siteclaw', re.I)
TEXT_TYPES = {'.md','.json','.jsonl','.html','.htm','.svg','.txt','.xml','.js','.mjs','.css','.yaml','.yml','.toml'}

def inspect_file(path: Path, root: Path) -> list[str]:
    failures=[]
    name=path.relative_to(root).as_posix()
    if RETIRED.search(name.encode()):failures.append('retired name in active path: '+name)
    if path.suffix.lower() in TEXT_TYPES and RETIRED.search(path.read_bytes()):
        failures.append('retired name in active text: '+name)
    return failures

def check(root: Path, public: Path | None = None) -> dict:
    issues=[];source_files=0;output_files=0
    for folder in ('articles','assets','layouts','static','docs'):
        for p in (root/folder).rglob('*'):
            if p.is_file() and p.suffix.lower() in TEXT_TYPES:
                source_files+=1;issues.extend(inspect_file(p,root))
    if public:
        routes=json.loads((root/'data/legacy-doc-routes.json').read_text())
        allowed={k.removeprefix('/docs/')+'index.html' for k in routes}
        for p in public.rglob('*'):
            if not p.is_file() or p.suffix.lower() not in TEXT_TYPES:continue
            output_files+=1;relative=p.relative_to(public).as_posix()
            found=inspect_file(p,public)
            if relative in allowed:
                found=[f for f in found if not f.startswith('retired name in active path:')]
                text=p.read_text()
                if 'SiteBay compatibility redirect' not in text or 'content="noindex"' not in text:
                    found.append('Legacy path is not a compatibility redirect: '+relative)
            issues.extend(found)
    return {'source_files_scanned':source_files,'output_files_scanned':output_files,'issues':issues,
            'scope':'Text sources, paths, HTML, Markdown, JSON corpora, indexes and SVG text; not binary image pixels or Git history.'}

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--public-dir',type=Path);p.add_argument('--report',type=Path)
    a=p.parse_args();r=check(ROOT,a.public_dir)
    if a.report:a.report.parent.mkdir(parents=True,exist_ok=True);a.report.write_text(json.dumps(r,indent=2)+'\n')
    print(json.dumps(r));raise SystemExit(bool(r['issues']))
